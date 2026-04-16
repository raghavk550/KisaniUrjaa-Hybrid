/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MainTabParamList} from '../../Navigation/RootNavigator';
import {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../Helper/Redux/User/UserStore';
import {AppContext} from '../../Navigation/AppContext';
import {getStoredUser} from './AllNews';
import {getNewsDetails} from '../../../Helper/Redux/Home/HomeSlice';

type OTPRouteProp = RouteProp<MainTabParamList, 'NewsDetails'>;

type NewsDetailsNavigationProp = BottomTabNavigationProp<
  MainTabParamList,
  'NewsDetails'
>;

const NewsDetailsView = () => {
  const route = useRoute<OTPRouteProp>();
  const newsId = route.params?.newsId ?? '';
  const dispatch = useDispatch<AppDispatch>();
  const context = useContext(AppContext);
  const {newsDetails, loading} = useSelector((state: RootState) => state.home);
  const user = context?.user;
  const navigation = useNavigation<NewsDetailsNavigationProp>();

  useEffect(() => {
    const fetchNewsDetails = async () => {
      const token = user?.token || getStoredUser()?.token;

      if (!token || !newsId) {
        return;
      }

      try {
        await dispatch(getNewsDetails({token, newsId})).unwrap();
      } catch (fetchError) {
        console.log('Get news details failed:', fetchError);
      }
    };
    fetchNewsDetails();
  }, [dispatch, user?.token, newsId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.canGoBack() && navigation.goBack();
        }}
        style={{position: 'absolute', left: 16, top: 60, zIndex: 999}}>
        <Image
          source={require('../../../Assets/Images/backArrow.png')}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Image
        source={require('../../../Assets/Images/MainHome/RegisteredLand/dummyImg1.png')}
        style={{width: '100%', height: 340, marginBottom: 20}}
        resizeMode="stretch"
      />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 120,
        }}>
        <View style={styles.newsMetaRow}>
          <Image
            source={require('../../../Assets/Images/ic_calendar.png')}
            style={styles.newsCalendarIcon}
          />
          <Text style={styles.newsMetaText}>
            {newsDetails?.newsDetails?.publishedAt ?? ''}
          </Text>
        </View>
        <Text
          style={{
            color: '#353231',
            marginTop: 8,
            fontSize: 16,
            fontWeight: '600',
            lineHeight: 24,
          }}>
          {newsDetails?.newsDetails?.newsTitle ?? ''}
        </Text>
        <View
          style={{
            marginTop: 8,
            borderRadius: 12,
            paddingVertical: 12,
            paddingHorizontal: 14,
            backgroundColor: '#EAE9E9',
          }}>
          <Text style={{color: '#625D5B', fontSize: 12, fontWeight: '400'}}>
            {newsDetails?.newsDetails?.newsSubDesc ?? ''}
          </Text>
        </View>
        <Text
          style={{
            color: '#625D5B',
            marginTop: 8,
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 22,
          }}>
          {newsDetails?.newsDetails?.newsDesc ?? ''}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 8, gap: 4}}>
          <Text
            style={{
              color: '#A7A2A0',
              fontSize: 12,
              fontWeight: '500',
            }}>
            Source:
          </Text>
          <TouchableOpacity
            onPress={() => {
            //   navigation.navigate('NewsWebView', {
            //     url:
            //       newsDetails?.newsDetails?.newsSource ??
            //       'https://www.google.com',
            //     title: newsDetails?.newsDetails?.newsSourceName ?? 'Source',
            //   });
              Linking.openURL(
                newsDetails?.newsDetails?.newsSource ??
                  'https://www.google.com',
              );
            }}>
            <Text
              style={{
                color: '#3C6FCE',
                fontSize: 12,
                fontWeight: '600',
                textDecorationLine: 'underline',
              }}>
              {newsDetails?.newsDetails?.newsSourceName ?? ''}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            marginTop: 32,
            backgroundColor: '#00000017',
            flex: 1,
          }}
        />
      </ScrollView>
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

export default NewsDetailsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  newsMetaRow: {
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
