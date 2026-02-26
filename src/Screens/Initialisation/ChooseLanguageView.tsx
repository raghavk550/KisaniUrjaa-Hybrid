/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useContext, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modal} from 'react-native';
import {AppContext} from '../Navigation/AppContext';

const ITEM_SIZE = Dimensions.get('window').width;
const ChooseLanguageView = () => {
  const [showModal, setShowModal] = useState(false);
  const DATA = [
    {
      id: '1',
      title: 'English',
      image: require('../../Assets/Images/Language/En.png'),
    },
    {
      id: '2',
      title: 'हिंदी',
      image: require('../../Assets/Images/Language/Hi.png'),
    },
    {
      id: '3',
      title: 'ਪੰਜਾਬੀ',
      image: require('../../Assets/Images/Language/Pun.png'),
    },
    {
      id: '4',
      title: 'ગુજરાતી',
      image: require('../../Assets/Images/Language/Guj.png'),
    },
    {
      id: '5',
      title: 'मराठी',
      image: require('../../Assets/Images/Language/Mar.png'),
    },
    {
      id: '6',
      title: 'తెలుగు',
      image: require('../../Assets/Images/Language/Ban.png'),
    },
    {
      id: '7',
      title: 'ఒరియా',
      image: require('../../Assets/Images/Language/Tam.png'),
    },
  ];
  const [cardWidth, setCardWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedIcon = require('../../Assets/Images/Language/langSelected.png');
  const unselectedIcon = require('../../Assets/Images/Language/langUnselected.png');

  const context = useContext(AppContext);
  if (!context) {
    return null;
  }

  const {setAppState} = context;

  const handleLanguageSelection = () => {
    setAppState(prev => ({
      ...prev,
      isLanguageSelected: true,
    }));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/SplashTransparentBg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View
        style={styles.centerView}
        onLayout={event => {
          const {width} = event.nativeEvent.layout;
          setCardWidth(width);
        }}>
        <Text style={styles.languageText}>Choose your language</Text>
        <FlatList
          data={DATA}
          numColumns={2}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingTop: 24}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          style={[styles.flatList, {width: cardWidth - 36}]}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                setCurrentIndex(index);
              }}
              style={[
                styles.item,
                {
                  width: (cardWidth - 24) / 2 - 12,
                  borderColor: currentIndex === index ? '#FC8019' : '#D1D5DB',
                },
              ]}>
              {index === 0 && (
                <View style={styles.deviceLanguageView}>
                  <Text style={styles.deviceLanguageText}>Device Language</Text>
                </View>
              )}
              <View style={styles.selectionIndicatorView}>
                <Image
                  source={
                    currentIndex === index ? selectedIcon : unselectedIcon
                  }
                  resizeMode="contain"
                />
                <Text style={styles.text}>{item.title}</Text>
              </View>
              <Image
                source={item.image}
                style={{position: 'absolute', bottom: 0, right: 0}}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          onPress={() => {
            setShowModal(true);
          }}
          style={[styles.continueButton, {width: cardWidth - 36}]}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => {
            setShowModal(false);
          }}>
          <View style={styles.modalContainer}>
            <Image
              source={require('../../Assets/Images/location.png')}
              style={{marginTop: 24}}
              resizeMode="cover"
            />
            <Text style={{fontWeight: '600', marginTop: 16}}>
              Location Permissions
            </Text>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 8,
                color: '#606268',
                paddingHorizontal: 24,
              }}>
              Allow Gruner Social to access your device location?
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleLanguageSelection}>
              <Text style={styles.modalButtonText}>While using the app</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleLanguageSelection}>
              <Text style={styles.modalButtonText}>Only this time</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginVertical: 24}}
              onPress={() => {
                setShowModal(false);
              }}>
              <Text style={styles.modalButtonText}>Don't allow</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  centerView: {
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  languageText: {
    marginTop: 24,
    marginLeft: 20,
    fontSize: 18,
  },
  flatList: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 12,
  },
  item: {
    width: ITEM_SIZE,
    height: 95,
    borderRadius: 12,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    marginBottom: 12,
  },
  deviceLanguageView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 19,
    backgroundColor: '#FEE3CD',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  deviceLanguageText: {
    fontSize: 12,
    color: '#FC8019',
  },
  selectionIndicatorView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 24,
    left: 12,
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  continueButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#FC8019',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#16141388',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: ITEM_SIZE - 40,
    backgroundColor: '#fff',
    borderRadius: 28,
    alignItems: 'center',
  },
  modalButton: {
    width: ITEM_SIZE - 40 - 48,
    borderColor: '#FC8019',
    borderWidth: 1,
    paddingHorizontal: 24,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  modalButtonText: {
    color: '#FC8019',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ChooseLanguageView;
