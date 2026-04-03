/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useContext, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
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

const MainHomeView = () => {
  const today = new Date();
  const dispatch = useDispatch<AppDispatch>();
  const context = useContext(AppContext);
  const {data, loading} = useSelector((state: RootState) => state.home);
  const user = context?.user;

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

    // fetchWeather();
  }, [dispatch, user?.token]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/MainHome/mainHomeTop.png')}
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
              <TouchableOpacity activeOpacity={0.8} style={styles.actionButton}>
                <Image
                  source={require('../../Assets/Images/MainHome/whatsapp.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.actionButton}>
                <Image
                  source={require('../../Assets/Images/MainHome/phone.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  },
  headerContent: {
    position: 'absolute',
    top: 65,
    left: 16,
    right: 16,
    alignItems: 'flex-start',
  },
  kisaniCard: {
    marginTop: 28,
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
});
