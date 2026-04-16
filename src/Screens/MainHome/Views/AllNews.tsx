/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../Helper/Redux/User/UserStore';
import {AppContext} from '../../Navigation/AppContext';
import {getAllNews} from '../../../Helper/Redux/Home/HomeSlice';
import {storage} from '../../Navigation/Storage';
import {User} from '../../../Helper/ApiService/LoginApi';
import {MainTabParamList} from '../../Navigation/RootNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const getStoredUser = (): {user: User; token: string} | null => {
  const storedUser = storage.getString('user');

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as {user: User; token: string};
  } catch {
    return null;
  }
};

type NavigationProp = NativeStackNavigationProp<MainTabParamList, 'AllNews'>;

const AllNewsView = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const context = useContext(AppContext);
  const {news, loading} = useSelector((state: RootState) => state.home);
  const user = context?.user;

  useEffect(() => {
    const fetchAllNews = async () => {
      const token = user?.token || getStoredUser()?.token;

      if (!token) {
        return;
      }

      try {
        await dispatch(getAllNews(token)).unwrap();
      } catch (fetchError) {
        console.log('Get all news failed:', fetchError);
      }
    };

    fetchAllNews();
  }, [dispatch, user?.token]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.canGoBack() && navigation.goBack();
          }}
          style={{position: 'absolute', left: 0}}>
          <Image
            source={require('../../../Assets/Images/backArrow.png')}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>All News</Text>
      </View>

      <LinearGradient
        colors={['#ACD2D6', '#AEE5BE']}
        locations={[0, 1]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={{
          alignSelf: 'stretch',
          height: 130,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      />

      <View style={{marginHorizontal: 16}}>
        <View
          style={{
            width: '100%',
            height: 56,
            flexDirection: 'row',
            borderRadius: 14,
            borderWidth: 1,
            borderColor: '#00000020',
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 7,
            marginTop: 24,
          }}>
          <Image
            source={require('../../../Assets/Images/MainHome/AllNews/search.png')}
          />
          <TextInput
            style={{flex: 1, paddingHorizontal: 10}}
            placeholder="Search here"
          />
          <TouchableOpacity>
            <Image
              source={require('../../../Assets/Images/MainHome/AllNews/filter.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {news?.news?.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No news available</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: 16,
            alignSelf: 'stretch',
            flex: 1,
            marginHorizontal: 16,
          }}>
          {news?.news?.map((item, index) => (
            <TouchableOpacity
              key={
                item._id || `${item.newsTitle}-${item.newsPublishedAt}-${index}`
              }
              onPress={() => {
                navigation.navigate('NewsDetails', {newsId: item._id});
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.newsImageWrap}>
                    {item.isShowPlaceholder ? (
                      <View style={styles.newsLogoPlaceholder}>
                        <Image
                          source={require('../../../Assets/Images/Logo.png')}
                          style={styles.newsLogoImage}
                          resizeMode="contain"
                        />
                      </View>
                    ) : (
                      <Image
                        source={require('../../../Assets/Images/MainHome/RegisteredLand/dummyImg1.png')}
                        style={styles.newsImage}
                        resizeMode="cover"
                      />
                    )}
                  </View>

                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: '#353231',
                        marginTop: 4,
                      }}>
                      {item.newsTitle}
                    </Text>
                    <Text
                      numberOfLines={4}
                      style={{
                        fontSize: 10,
                        fontWeight: '400',
                        color: '#625D5B',
                        marginTop: 4,
                        lineHeight: 16,
                        paddingRight: 5,
                      }}>
                      {item.newsDescription}
                    </Text>

                    <View style={styles.newsMetaRow}>
                      <Image
                        source={require('../../../Assets/Images/ic_calendar.png')}
                        style={styles.newsCalendarIcon}
                      />
                      <Text style={styles.newsMetaText}>
                        {item.newsPublishedAt}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    height: 1,
                    backgroundColor: '#00000017',
                    marginVertical: 18,
                    width: Dimensions.get('window').width * 0.65,
                    alignSelf: 'flex-end',
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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

export default AllNewsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerRow: {
    position: 'absolute',
    top: 60,
    left: 18,
    right: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#161413',
  },
  newsImageWrap: {
    width: 110,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#E6E6E6',
    marginRight: 12,
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
  newsMetaRow: {
    position: 'absolute',
    bottom: 4,
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
  scrollContent: {
    paddingBottom: 20,
  },
});
