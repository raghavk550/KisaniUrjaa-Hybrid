/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import StepIndicator from './Views/StepIndicator';
import {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Step1View from './Views/Step1View';
import Step2View from './Views/Step2View';
import {logout, logoutUser} from '../../Helper/Redux/Auth/AuthSlice';
import {storage} from '../Navigation/Storage';
import {AppContext} from '../Navigation/AppContext';
import {AppDispatch} from '../../Helper/Redux/User/UserStore';
import {useDispatch} from 'react-redux';
import {User} from '../../Helper/ApiService/LoginApi';
import {RootStackParamList} from '../Navigation/RootNavigator';
import Step3View from './Views/Step3View';

export const enum Gender {
  Male,
  Female,
  None,
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeView = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp>();
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  const {setAppState, setUser} = context;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1View />;
      case 2:
        return <Step2View />;
      case 3:
        return <Step3View />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/Home/homeTop.png')}
        style={styles.topImage}
      />
      <View style={styles.headerContent}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#161413',
          }}>
          Profile Details
        </Text>
        <TouchableOpacity
          style={{position: 'absolute', right: 16, top: 2}}
          onPress={async () => {
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

            try {
              if (parsedUser?.token) {
                await dispatch(logoutUser({token: parsedUser.token})).unwrap();
              }
            } catch (error) {
              console.log('Logout API failed:', error);
            } finally {
              dispatch(logout());
              setUser(null);
              storage.remove('user');
              setAppState(prev => ({
                ...prev,
                isLogin: false,
              }));
              storage.set('isLogin', false);
              navigation.reset({
                index: 0,
                routes: [{name: 'SignUp'}],
              });
            }
          }}>
          <Text style={{color: '#FC8019', fontSize: 14, fontWeight: '600'}}>
            Logout
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderRadius: 16,
            marginTop: 16,
            backgroundColor: 'white',
            alignSelf: 'stretch',
            marginHorizontal: 16,
          }}>
          <View
            style={{
              marginLeft: 18,
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'baseline',
            }}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: '#171D25'}}>
              20%
            </Text>
            <Text style={{marginLeft: 6, color: '#857E7B'}}>
              Profile Complete
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 18,
              marginTop: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: '#353231'}}>
              Personal Details
            </Text>
            <Text
              style={{
                marginLeft: 6,
                color: '#00000050',
                fontSize: 12,
                fontWeight: 'regular',
              }}>
              ({currentStep >= totalSteps ? totalSteps : currentStep}/
              {totalSteps} Steps)
            </Text>
          </View>
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </View>
      </View>
      <ScrollView style={{marginBottom: 30}}>
        {renderStep()}
        <TouchableOpacity
          onPress={() => {
            currentStep < 4 && setCurrentStep(currentStep + 1);
          }}
          style={[styles.continueButton]}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topImage: {
    width: '100%',
  },
  headerContent: {
    position: 'absolute',
    top: 60,
    alignItems: 'center',
    width: '100%',
  },
  continueButton: {
    height: 56,
    backgroundColor: '#FC8019',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'stretch',
    marginTop: 60,
    marginHorizontal: 16,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeView;
