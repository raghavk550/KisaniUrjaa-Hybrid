/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import StepIndicator from './Views/StepIndicator';

const HomeView = () => {
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
              (1/3 Steps)
            </Text>
          </View>
          <StepIndicator currentStep={1} totalSteps={3} />
        </View>
      </View>
      <ScrollView style={{marginBottom: 30}}>
        <Text style={{marginTop: 20, marginLeft: 16}}>My Kisani Didi</Text>
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
            alignSelf: 'stretch',
            marginHorizontal: 16,
            borderRadius: 12,
            borderColor: '#E3E2E1',
            borderWidth: 1,
            height: 56,
            alignItems: 'center',
            paddingHorizontal: 14,
          }}>
          <Image source={require('../../Assets/Images/Home/home_didi.png')} />
          <TextInput
            placeholder="Select Kisani Didi"
            style={{
              flex: 1,
              marginHorizontal: 8,
              fontSize: 14,
              fontWeight: 'semibold',
              color: '#353231',
            }}
          />
          <Image source={require('../../Assets/Images/ic-chevron-down.png')} />
        </View>
        <View style={styles.mobileNumView}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
            }}>
            Profile Verification
          </Text>
          <Image
            source={require('../../Assets/Images/required.png')}
            style={{marginLeft: 2, marginTop: 2}}
            resizeMode="cover"
          />
        </View>
        <Text
          style={{
            marginTop: 8,
            marginHorizontal: 16,
            fontSize: 14,
            fontWeight: 'regular',
            color: '#625D5B',
          }}>
          Choose a Personal Identification document to upload. It will fill many
          details automatically.
        </Text>
        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            alignSelf: 'stretch',
            marginHorizontal: 16,
            borderRadius: 12,
            borderColor: '#E3E2E1',
            borderWidth: 1,
            height: 56,
            alignItems: 'center',
            paddingHorizontal: 14,
          }}>
          <Image source={require('../../Assets/Images/ic_document.png')} />
          <TextInput
            placeholder="Select Document"
            style={{
              flex: 1,
              marginHorizontal: 8,
              fontSize: 14,
              fontWeight: 'semibold',
              color: '#353231',
            }}
          />
          <Image source={require('../../Assets/Images/ic-chevron-down.png')} />
        </View>

        <View
          style={{
            borderRadius: 14,
            alignSelf: 'stretch',
            marginHorizontal: 16,
            marginTop: 28,
            borderColor: '#B0B0B030',
            borderWidth: 1,
          }}>
          <Text
            style={{
              paddingVertical: 20,
              paddingHorizontal: 16,
              color: '#DF8700',
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14,
              backgroundColor: '#DF870005',
              fontSize: 14,
              fontWeight: 'semibold',
            }}>
            Farmer Details
          </Text>
          <View style={styles.mobileNumView}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 16,
              }}>
              Full Name
            </Text>
            <Image
              source={require('../../Assets/Images/required.png')}
              style={{marginLeft: 2, marginTop: 2}}
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignSelf: 'stretch',
              marginHorizontal: 16,
              borderRadius: 12,
              borderColor: '#E3E2E1',
              borderWidth: 1,
              height: 56,
              alignItems: 'center',
              paddingHorizontal: 14,
            }}>
            <Image source={require('../../Assets/Images/ic-user.png')} />
            <TextInput
              placeholder="Enter Full Name"
              style={{
                flex: 1,
                marginHorizontal: 8,
                fontSize: 14,
                fontWeight: 'semibold',
                color: '#353231',
              }}
            />
          </View>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
              marginTop: 24,
              marginHorizontal: 16,
            }}>
            Gender
          </Text>
          <View
            style={{
              marginTop: 8,
              marginHorizontal: 10,
              height: 52,
              flexDirection: 'row',
              alignSelf: 'stretch',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}>
            <View
              style={{
                flex: 1,
                height: 52,
                alignSelf: 'stretch',
                marginHorizontal: 6,
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 12,
                borderColor: '#E3E2E1',
                overflow: 'hidden',
              }}>
              <TouchableOpacity style={{height: '100%'}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginLeft: 16,
                    alignItems: 'center',
                  }}>
                  <Text>Male</Text>
                  <Image
                    source={require('../../Assets/Images/Home/male_home.png')}
                    style={{position: 'absolute', bottom: 0, right: 0}}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                height: 52,
                alignSelf: 'stretch',
                marginHorizontal: 6,
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 12,
                borderColor: '#E3E2E1',
                overflow: 'hidden',
              }}>
              <TouchableOpacity style={{height: '100%'}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginLeft: 16,
                    alignItems: 'center',
                  }}>
                  <Text>Female</Text>
                  <Image
                    source={require('../../Assets/Images/Home/female_home.png')}
                    style={{position: 'absolute', bottom: 0, right: 0}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mobileNumView}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 16,
              }}>
              Date of Birth
            </Text>
          </View>
          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignSelf: 'stretch',
              marginHorizontal: 16,
              borderRadius: 12,
              borderColor: '#E3E2E1',
              borderWidth: 1,
              height: 56,
              alignItems: 'center',
              paddingHorizontal: 14,
              marginBottom: 24,
            }}>
            <Image source={require('../../Assets/Images/ic_calendar.png')} />
            <TextInput
              placeholder="DD/MM/YY"
              style={{
                flex: 1,
                marginHorizontal: 8,
                fontSize: 14,
                fontWeight: 'semibold',
                color: '#353231',
              }}
            />
          </View>
        </View>
        <TouchableOpacity
            onPress={() => {
              // setShowModal(true);
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
  mobileNumView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 24,
    marginHorizontal: 16,
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
