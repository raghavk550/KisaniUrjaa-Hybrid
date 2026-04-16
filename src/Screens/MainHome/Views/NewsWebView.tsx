/* eslint-disable react/react-in-jsx-scope */
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '../../Navigation/RootNavigator';

type NewsWebViewRouteProp = RouteProp<MainTabParamList, 'NewsWebView'>;
type NewsWebViewNavigationProp = BottomTabNavigationProp<MainTabParamList, 'NewsWebView'>;

const NewsWebView = () => {
  const route = useRoute<NewsWebViewRouteProp>();
  const navigation = useNavigation<NewsWebViewNavigationProp>();
  const {url, title} = route.params;

  const normalizeUrl = (rawUrl?: string) => {
    const trimmed = rawUrl?.trim();
    if (!trimmed) {
      return 'https://www.google.com';
    }
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const webUrl = normalizeUrl(url);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../../../Assets/Images/backArrow.png')}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title ?? 'Source'}
        </Text>
      </View>
      <WebView
        source={{uri: webUrl}}
        javaScriptEnabled
        domStorageEnabled
        mixedContentMode="always"
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#FC8019" />
          </View>
        )}
        renderError={errorDomain => (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Unable to load page</Text>
            <Text style={styles.errorMessage}>
              {typeof errorDomain === 'string'
                ? errorDomain
                : JSON.stringify(errorDomain)}
            </Text>
          </View>
        )}
        onError={syntheticEvent => {
          console.warn('WebView error:', syntheticEvent.nativeEvent);
        }}
        style={styles.webview}
      />
    </View>
  );
};

export default NewsWebView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 72,
    marginTop: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#353231',
  },
  webview: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#353231',
    marginBottom: 8,
  },
  errorMessage: {
    textAlign: 'center',
    color: '#7A7A7A',
    fontSize: 14,
  },
});
