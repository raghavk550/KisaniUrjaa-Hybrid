/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppDispatch, RootState} from '../../Helper/Redux/User/UserStore';
import {useDispatch, useSelector} from 'react-redux';
import {getWeather} from '../../Helper/Redux/Home/HomeSlice';
import {storage} from '../Navigation/Storage';
import {User} from '../../Helper/ApiService/LoginApi';
import {AppContext} from '../Navigation/AppContext';
import Geolocation from 'react-native-geolocation-service';
import {requestLocationPermission} from '../../Helper/Permissions/LocationPermission';
import Svg, {Circle} from 'react-native-svg';
import {useInternet} from '../../Helper/Utilities/InternetConnectionHook';
import { useNavigation } from '@react-navigation/native';

export type MyRegisteredLands = {
  img: any;
  cropName: string;
  cropCount: number;
  isOwned: boolean;
  areaUnit: string;
};

type NewsItem = {
  title: string;
  description: string;
  publishedAt: string;
  image?: ImageSourcePropType;
  showLogoPlaceholder?: boolean;
};

const MainHomeView = () => {
  const today = new Date();
  const dispatch = useDispatch<AppDispatch>();
  const context = useContext(AppContext);
  const {data, loading} = useSelector((state: RootState) => state.home);
  const user = context?.user;
  const [isProfileCompleted, _] = useState(true);
  const navigation = useNavigation();
  const hometop = require('../../Assets/Images/MainHome/mainHomeTop.png');
  const homeTopProfile = require('../../Assets/Images/MainHome/mainHomeTopProfile.png');

  const formattedDate = today.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const weatherData = data?.weatherData;
  const userName = user?.user?.name?.trim() || 'Ram Prasad';
  const locationName = weatherData?.location || 'Lucknow, Uttar Pradesh';
  const temperatureValue = weatherData?.temperature || '32';
  const temperatureUnit = '°';
  const weatherDescription = weatherData?.description || 'Partly Cloudy';
  const r = 17;
  const strokeWidth = 3;
  const cx = 20;
  const cy = 20;

  const circumference = 2 * Math.PI * r;
  const progress = 0.4;
  const isOnline = useInternet();

  const dashOffset = circumference * (1 - progress);

  const myRegisteredLands: MyRegisteredLands[] = [
    {
      img: require('../../Assets/Images/MainHome/RegisteredLand/dummyImg1.png'),
      cropName: 'Paddy Field',
      cropCount: 3,
      isOwned: true,
      areaUnit: '12 Acres',
    },
    {
      img: require('../../Assets/Images/MainHome/RegisteredLand/dummyImg2.png'),
      cropName: 'Wheat Field',
      cropCount: 0,
      isOwned: true,
      areaUnit: '12 Acres',
    },
  ];

  const latestNews: NewsItem[] = [
    {
      title:
        'Crop-residue burning turning India into global methane hotspot, UN...',
      description:
        'India has emerged as a global hotspot for methane emissions from crop-residue burning.',
      publishedAt: '15 Nov, 2025 at 2:00 PM',
      showLogoPlaceholder: true,
    },
    {
      title:
        'Crop-residue burning turning India into global methane hotspot, UN...',
      description:
        'India has emerged as a global hotspot for methane emissions from crop-residue burning.',
      publishedAt: '15 Nov, 2025 at 2:00 PM',
      image: require('../../Assets/Images/MainHome/RegisteredLand/dummyImg2.png'),
    },
  ];

  const latestVideos: NewsItem[] = [
    {
      title:
        'Crop-residue burning turning India into global methane hotspot, UN...',
      description:
        'India has emerged as a global hotspot for methane emissions from crop-residue burning.',
      publishedAt: '15 Nov, 2025 at 2:00 PM',
      image: require('../../Assets/Images/MainHome/RegisteredLand/dummyImg1.png'),
    },
    {
      title:
        'Crop-residue burning turning India into global methane hotspot, UN...',
      description:
        'India has emerged as a global hotspot for methane emissions from crop-residue burning.',
      publishedAt: '15 Nov, 2025 at 2:00 PM',
      image: require('../../Assets/Images/MainHome/RegisteredLand/dummyImg2.png'),
    },
  ];

  const getLocation = async (): Promise<{
    latitude: number;
    longitude: number;
  } | null> => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      console.log('Permission denied');
      return null;
    }

    return new Promise(resolve => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;

          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
          resolve({latitude, longitude});
        },
        error => {
          console.log('Error:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const location = await getLocation();
      const lat = location?.latitude.toString() || '26.8467';
      const lon = location?.longitude.toString() || '80.9462';
      const contextToken = user?.token;
      if (contextToken) {
        try {
          await dispatch(
            getWeather({
              lat: lat,
              lon: lon,
              token: contextToken,
            }),
          ).unwrap();
        } catch (fetchError) {
          console.log('Weather API failed:', fetchError);
        }
        return;
      }

      const storedUser = storage.getString('user');
      let parsedUser: {user: User; token: string} | null = null;

      if (storedUser) {
        try {
          parsedUser = JSON.parse(storedUser) as {
            user: User;
            token: string;
          };
        } catch {
          parsedUser = null;
        }
      }

      if (!parsedUser?.token) {
        return;
      }

      try {
        await dispatch(
          getWeather({
            lat: lat,
            lon: lon,
            token: parsedUser.token,
          }),
        ).unwrap();
      } catch (fetchError) {
        console.log('Weather API failed:', fetchError);
      }
    };

    if (isOnline) {
      fetchWeather();
    }
  }, [dispatch, user?.token, isOnline]);
  return isOnline === false ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 30,
          backgroundColor: '#fff',
          borderRadius: 24,
          alignSelf: 'stretch',
          marginHorizontal: 16,
        }}>
        <Image
          source={require('../../Assets/Images/noInternet.png')}
          style={{alignSelf: 'center'}}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#161413',
            textAlign: 'center',
            marginTop: 16,
          }}>
          No Internet Connection
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: '#857E7B',
            textAlign: 'center',
            marginTop: 8,
          }}>
          It seems you are not connected to the internet. Please check your
          connection and try again.
        </Text>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Image
        source={isProfileCompleted ? hometop : homeTopProfile}
        style={styles.topImage}
      />
      <View style={styles.headerContent}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
          }}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#353231',
                }}>
                Good Morning,
              </Text>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: '#353231',
                }}>
                {userName}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: '#625D5B',
                marginTop: 4,
              }}>
              {formattedDate}
            </Text>
          </View>
          <Image
            source={require('../../Assets/Images/MainHome/notifFrame.png')}
          />
        </View>
        {!isProfileCompleted && (
          <>
            <View
              style={{
                height: 72,
                alignSelf: 'stretch',
                marginTop: 20,
                borderRadius: 16,
                borderWidth: 1.5,
                backgroundColor: '#FFFFFF30',
                borderColor: '#FFFFFF65',
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row', marginLeft: 18, gap: 8}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Svg width={40} height={40}>
                    {/* Background Circle (Gray Border) */}
                    <Circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      stroke="gray"
                      strokeWidth={strokeWidth}
                      fill="transparent"
                      opacity={0.4}
                    />

                    {/* Progress Arc (Black 40%) */}
                    <Circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      stroke="#353231"
                      strokeWidth={strokeWidth}
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                      transform={`rotate(-90 ${cx} ${cy})`}
                    />
                  </Svg>
                  <Text
                    style={{
                      position: 'absolute',
                      fontSize: 10,
                      color: '#000000',
                      fontWeight: 'bold',
                    }}>
                    {progress * 100}%
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#353231',
                    }}>
                    Please complete your profile details
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '500',
                      color: '#565656',
                      marginTop: 2,
                    }}>
                    Click here to complete
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#353231',
            marginTop: 21,
          }}>
          Today’s Weather
        </Text>
        <View
          style={{
            marginTop: 12,
            borderRadius: 12,
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            alignSelf: 'stretch',
          }}>
          <Image
            source={require('../../Assets/Images/MainHome/accuWeatherLogo.png')}
            style={{position: 'absolute', top: 12, right: 16}}
          />
          <Image
            source={require('../../Assets/Images/MainHome/partlySunny.png')}
            style={{position: 'absolute', top: 40, right: 18}}
          />
          <View
            style={{
              marginTop: 24,
              marginLeft: 18,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <Image
              source={require('../../Assets/Images/MainHome/Location.png')}
            />
            <Text style={{fontSize: 14, fontWeight: '600', color: '#000000'}}>
              {locationName}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 48,
              fontWeight: '700',
              color: '#7B3C0C',
              marginLeft: 18,
              marginTop: 24,
            }}>
            {`${temperatureValue}${temperatureUnit}`}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#353231',
              marginLeft: 18,
              marginTop: 6,
            }}>
            {weatherDescription}
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: '#00000017',
              marginTop: 16,
              marginHorizontal: 18,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#857E7B',
              marginTop: 12,
              marginLeft: 18,
              marginBottom: 23,
            }}>
            {'Today is a good day to apply pesticides.'}
          </Text>
        </View>
        <ScrollView
          style={styles.mainScrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.kisaniCard}>
            <Image
              source={require('../../Assets/Images/MainHome/ellipse.png')}
              style={styles.kisaniCardEllipse}
            />
            <View style={styles.kisaniCardContent}>
              <View style={styles.kisaniInfoSection}>
                <Image
                  source={require('../../Assets/Images/MainHome/kisaniDidi.png')}
                  style={styles.kisaniImage}
                />

                <View style={styles.kisaniTextBlock}>
                  <Text style={styles.kisaniLabel}>Kisani Didi</Text>
                  <Text style={styles.kisaniName} numberOfLines={1}>
                    Sumita Kumari
                  </Text>
                </View>
              </View>
              <View style={styles.kisaniActions}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.actionButton}>
                  <Image
                    source={require('../../Assets/Images/MainHome/whatsapp.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.actionButton}>
                  <Image
                    source={require('../../Assets/Images/MainHome/phone.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 28,
              alignSelf: 'stretch',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#353231'}}>
              My Registered Lands
            </Text>
            <TouchableOpacity>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                <Text
                  style={{fontSize: 14, fontWeight: '500', color: '#686868'}}>
                  See all
                </Text>
                <Image
                  source={require('../../Assets/Images/MainHome/rightArrow.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
          {myRegisteredLands.map((item, index) => (
            <View
              key={`${item.cropName}-${item.areaUnit}-${index}`}
              style={styles.landCardWrapper}>
              <Image source={item.img} style={styles.landImage} />

              <View style={styles.landCard}>
                <Text style={styles.landTitle}>{item.cropName}</Text>

                <View style={styles.cropChip}>
                  <View style={styles.cropIconWrap}>
                    <Image
                      source={
                        item.cropCount > 0
                          ? require('../../Assets/Images/MainHome/RegisteredLand/greenLeaf.png')
                          : require('../../Assets/Images/MainHome/RegisteredLand/orangeLeaf.png')
                      }
                    />
                  </View>
                  <Text
                    style={[
                      styles.cropChipText,
                      {color: item.cropCount > 0 ? '#7ABA3D' : '#DF8700'},
                    ]}>
                    {item.cropCount > 0
                      ? `${item.cropCount} Crops added`
                      : 'No Crops added'}
                  </Text>
                </View>

                <View style={styles.landStatsRow}>
                  <Text style={styles.landStatsLabel}>Owned</Text>
                  <Text style={styles.landStatsValue}>12 Acres</Text>
                </View>
              </View>
            </View>
          ))}

          <View
            style={{
              marginTop: 28,
              alignSelf: 'stretch',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#353231'}}>
              Latest News
            </Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate('AllNews' as never);
            }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                <Text
                  style={{fontSize: 14, fontWeight: '500', color: '#686868'}}>
                  See all
                </Text>
                <Image
                  source={require('../../Assets/Images/MainHome/rightArrow.png')}
                />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newsListContent}
            style={styles.newsList}>
            {latestNews.map((newsItem, index) => (
              <TouchableOpacity
                key={`${newsItem.title}-${index}`}
                activeOpacity={0.85}
                style={styles.newsCard}>
                <View style={styles.newsImageWrap}>
                  {newsItem.showLogoPlaceholder ? (
                    <View style={styles.newsLogoPlaceholder}>
                      <Image
                        source={require('../../Assets/Images/Logo.png')}
                        style={styles.newsLogoImage}
                        resizeMode="contain"
                      />
                    </View>
                  ) : (
                    <Image
                      source={newsItem.image}
                      style={styles.newsImage}
                      resizeMode="cover"
                    />
                  )}
                </View>

                <Text style={styles.newsTitle} numberOfLines={2}>
                  {newsItem.title}
                </Text>

                <Text style={styles.newsDescription} numberOfLines={2}>
                  {newsItem.description}
                </Text>

                <View style={styles.newsMetaRow}>
                  <Image
                    source={require('../../Assets/Images/ic_calendar.png')}
                    style={styles.newsCalendarIcon}
                  />
                  <Text style={styles.newsMetaText}>
                    {newsItem.publishedAt}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View
            style={{
              marginTop: 28,
              alignSelf: 'stretch',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#353231'}}>
              Latest Videos
            </Text>
            <TouchableOpacity>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                <Text
                  style={{fontSize: 14, fontWeight: '500', color: '#686868'}}>
                  See all
                </Text>
                <Image
                  source={require('../../Assets/Images/MainHome/rightArrow.png')}
                />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newsListContent}
            style={styles.newsList}>
            {latestVideos.map((newsItem, index) => (
              <TouchableOpacity
                key={`${newsItem.title}-${index}`}
                activeOpacity={0.85}
                style={[
                  styles.newsCard,
                  {width: Dimensions.get('window').width * 0.8},
                ]}>
                <View style={[styles.newsImageWrap, {height: 188}]}>
                  {newsItem.showLogoPlaceholder ? (
                    <View style={styles.newsLogoPlaceholder}>
                      <Image
                        source={require('../../Assets/Images/Logo.png')}
                        style={styles.newsLogoImage}
                        resizeMode="contain"
                      />
                    </View>
                  ) : (
                    <Image
                      source={newsItem.image}
                      style={styles.newsImage}
                      resizeMode="cover"
                    />
                  )}
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../Assets/Images/MainHome/videoPause.png')}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.newsTitle} numberOfLines={2}>
                  {newsItem.title}
                </Text>

                <Text style={styles.newsDescription} numberOfLines={2}>
                  {newsItem.description}
                </Text>

                <View style={styles.newsMetaRow}>
                  <Image
                    source={require('../../Assets/Images/ic_calendar.png')}
                    style={styles.newsCalendarIcon}
                  />
                  <Text style={styles.newsMetaText}>
                    {newsItem.publishedAt}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View
            style={{
              marginTop: 28,
              alignSelf: 'stretch',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#353231'}}>
              Latest Articles
            </Text>
            <TouchableOpacity>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                <Text
                  style={{fontSize: 14, fontWeight: '500', color: '#686868'}}>
                  See all
                </Text>
                <Image
                  source={require('../../Assets/Images/MainHome/rightArrow.png')}
                />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newsListContent}
            style={styles.newsList}>
            {latestNews.map((newsItem, index) => (
              <TouchableOpacity
                key={`${newsItem.title}-${index}`}
                activeOpacity={0.85}
                style={styles.newsCard}>
                <View style={styles.newsImageWrap}>
                  {newsItem.showLogoPlaceholder ? (
                    <View style={styles.newsLogoPlaceholder}>
                      <Image
                        source={require('../../Assets/Images/Logo.png')}
                        style={styles.newsLogoImage}
                        resizeMode="contain"
                      />
                    </View>
                  ) : (
                    <Image
                      source={newsItem.image}
                      style={styles.newsImage}
                      resizeMode="cover"
                    />
                  )}
                </View>

                <Text style={styles.newsTitle} numberOfLines={2}>
                  {newsItem.title}
                </Text>

                <Text style={styles.newsDescription} numberOfLines={2}>
                  {newsItem.description}
                </Text>

                <View style={styles.newsMetaRow}>
                  <Image
                    source={require('../../Assets/Images/ic_calendar.png')}
                    style={styles.newsCalendarIcon}
                  />
                  <Text style={styles.newsMetaText}>
                    {newsItem.publishedAt}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ScrollView>
      </View>
      {loading && (
        <View
          style={{
            backgroundColor: '#00000030',
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            zIndex: 999,
          }}>
          <ActivityIndicator size="large" color="#FC8019" />
        </View>
      )}
    </View>
  );
};

export default MainHomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topImage: {
    width: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  headerContent: {
    position: 'absolute',
    top: 65,
    bottom: 0,
    left: 16,
    right: 16,
    alignItems: 'flex-start',
  },
  mainScrollView: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 28,
  },
  kisaniCard: {
    alignSelf: 'stretch',
    minHeight: 100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#B95F0420',
    backgroundColor: '#B95F0410',
    overflow: 'hidden',
  },
  kisaniCardEllipse: {
    position: 'absolute',
    left: 6,
    bottom: 0,
  },
  kisaniCardContent: {
    minHeight: 100,
    paddingLeft: 6,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kisaniInfoSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  kisaniImage: {
    alignSelf: 'flex-end',
  },
  kisaniTextBlock: {
    flex: 1,
    marginLeft: 8,
    marginBottom: 12,
    minWidth: 0,
  },
  kisaniLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#353231',
  },
  kisaniName: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '600',
    color: '#353231',
  },
  kisaniActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginBottom: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginLeft: 12,
  },
  landCardWrapper: {
    marginTop: 16,
    alignSelf: 'stretch',
    minHeight: 158,
    position: 'relative',
    justifyContent: 'center',
  },
  landImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  landCard: {
    marginLeft: 14,
    marginTop: 14,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#00000006',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 3,
  },
  landTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginLeft: 90,
  },
  cropChip: {
    marginTop: 10,
    marginLeft: 90,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cropIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5F7F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  cropChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7ABA3D',
  },
  landStatsRow: {
    marginTop: 26,
    borderRadius: 8,
    backgroundColor: '#F1F1F150',
    paddingLeft: 16,
    paddingRight: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  landStatsLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#4E4E4E90',
  },
  landStatsValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#353231',
  },
  newsList: {
    alignSelf: 'stretch',
    marginTop: 12,
    backgroundColor: 'transparent',
  },
  newsListContent: {
    gap: 14,
  },
  newsCard: {
    width: Dimensions.get('window').width * 0.62,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 10,
    shadowColor: '#00000006',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 3,
  },
  newsImageWrap: {
    height: 128,
    borderRadius: 10,
    backgroundColor: '#E6E6E6',
  },
  newsLogoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7E7E7',
    alignSelf: 'center',
    flex: 1,
  },
  newsLogoImage: {
    opacity: 0.75,
  },
  newsImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  newsTitle: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
    color: '#353231',
  },
  newsDescription: {
    marginTop: 4,
    fontSize: 10,
    lineHeight: 16,
    fontWeight: '400',
    color: '#625D5B',
  },
  newsMetaRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsCalendarIcon: {
    width: 12,
    height: 14,
    marginRight: 8,
  },
  newsMetaText: {
    fontSize: 10,
    fontWeight: '400',
    color: '#353231',
  },
});
