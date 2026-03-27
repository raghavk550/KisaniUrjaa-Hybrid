/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gender} from '../Home';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import KisaniDidiBottomSheet from './SelectKisaniDidiBottomSheet';
import DocBottomSheet from './SelectDocBottomSheet';

const Step1View = () => {
  const kisaniBottomSheetRef = useRef<BottomSheetModal | null>(null);
  const docBottomSheetRef = useRef<BottomSheetModal | null>(null);
  const openSheet = () => {
    kisaniBottomSheetRef.current?.present();
  };

  const openDocSheet = () => {
    setDocId('');
    setIsDocSelected(false);
    docBottomSheetRef.current?.present();
  };

  const [isDocSelected, setIsDocSelected] = useState(false);
  const [docId, setDocId] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.None);
  return (
    <>
      <Text style={{marginTop: 20, marginLeft: 16}}>My Kisani Didi</Text>
      <TouchableOpacity onPress={openSheet}>
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
          <Image
            source={require('../../../Assets/Images/Home/home_didi.png')}
          />
          <TextInput
            placeholder="Select Kisani Didi"
            pointerEvents="none"
            style={{
              flex: 1,
              marginHorizontal: 8,
              fontSize: 14,
              fontWeight: 'semibold',
              color: '#353231',
            }}
          />
          <Image
            source={require('../../../Assets/Images/ic-chevron-down.png')}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.mobileNumView}>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 16,
          }}>
          Profile Verification
        </Text>
        <Image
          source={require('../../../Assets/Images/required.png')}
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
      <TouchableOpacity onPress={openDocSheet}>
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
          <Image source={require('../../../Assets/Images/ic_document.png')} />
          <TextInput
            placeholder="Select Document"
            pointerEvents="none"
            style={{
              flex: 1,
              marginHorizontal: 8,
              fontSize: 14,
              fontWeight: 'semibold',
              color: '#353231',
            }}
          />
          <Image
            source={require('../../../Assets/Images/ic-chevron-down.png')}
          />
        </View>
      </TouchableOpacity>

      {isDocSelected && (
        <>
          <View
            style={{
              alignSelf: 'stretch',
              flexDirection: 'row',
              marginHorizontal: 16,
              marginTop: 16,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#0A9B0C04',
                borderWidth: 1,
                borderColor: '#0A9B0C19',
                borderRadius: 14,
                paddingVertical: 18,
                alignItems: 'center',
                marginRight: 4,
              }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '600',
                  color: '#0A9B0C',
                  paddingVertical: 4.5,
                  paddingHorizontal: 7,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 13,
                  borderBottomRightRadius: 13,
                  position: 'absolute',
                  top: 2,
                  left: 2,
                }}>
                FRONT SIDE
              </Text>
              <Image
                source={require('../../../Assets/Images/Home/home_didi.png')}
              />
              <Text
                style={{
                  marginTop: 6,
                  fontWeight: '600',
                  fontSize: 12,
                  color: '#353231',
                }}>
                Click here to Scan
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  fontWeight: '500',
                  fontSize: 10,
                  color: '#857E7B',
                }}>
                Front Side of DL
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: '#0A9B0C04',
                borderWidth: 1,
                borderColor: '#0A9B0C19',
                borderRadius: 14,
                paddingVertical: 18,
                alignItems: 'center',
                marginLeft: 4,
              }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '600',
                  color: '#0A9B0C',
                  paddingVertical: 4.5,
                  paddingHorizontal: 7,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 13,
                  borderBottomRightRadius: 13,
                  position: 'absolute',
                  top: 2,
                  left: 2,
                }}>
                BACK SIDE
              </Text>
              <Image
                source={require('../../../Assets/Images/Home/home_didi.png')}
              />
              <Text
                style={{
                  marginTop: 6,
                  fontWeight: '600',
                  fontSize: 12,
                  color: '#353231',
                }}>
                Click here to Scan
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  fontWeight: '500',
                  fontSize: 10,
                  color: '#857E7B',
                }}>
                Back Side of DL
              </Text>
            </View>
          </View>
          <View style={styles.mobileNumView}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 16,
              }}>
              ID Number
            </Text>
            <Image
              source={require('../../../Assets/Images/required.png')}
              style={{marginLeft: 2, marginTop: 2}}
              resizeMode="cover"
            />
          </View>

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
            <Image
              source={require('../../../Assets/Images/Home/home_didi.png')}
            />
            <TextInput
              placeholder="Enter ID Number"
              value={docId}
              onChangeText={text => {
                setDocId(text);
              }}
              style={{
                flex: 1,
                marginHorizontal: 8,
                fontSize: 14,
                fontWeight: 'semibold',
                color: '#353231',
              }}
            />
          </View>
        </>
      )}

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
            source={require('../../../Assets/Images/required.png')}
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
          <Image source={require('../../../Assets/Images/ic-user.png')} />
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
              borderColor: gender === Gender.Male ? '#5EA21F' : '#E3E2E1',
              overflow: 'hidden',
            }}>
            <TouchableOpacity
              onPress={() => {
                setGender(Gender.Male);
              }}
              style={{
                height: '100%',
                backgroundColor:
                  gender === Gender.Male ? '#7ABA3D08' : 'transparent',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginLeft: 16,
                  alignItems: 'center',
                }}>
                <Text>Male</Text>
                <Image
                  source={require('../../../Assets/Images/Home/male_home.png')}
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
              borderColor: gender === Gender.Female ? '#5EA21F' : '#E3E2E1',
              overflow: 'hidden',
            }}>
            <TouchableOpacity
              onPress={() => {
                setGender(Gender.Female);
              }}
              style={{
                height: '100%',
                backgroundColor:
                  gender === Gender.Female ? '#7ABA3D08' : 'transparent',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginLeft: 16,
                  alignItems: 'center',
                }}>
                <Text>Female</Text>
                <Image
                  source={require('../../../Assets/Images/Home/female_home.png')}
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
          <Image source={require('../../../Assets/Images/ic_calendar.png')} />
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
        <KisaniDidiBottomSheet ref={kisaniBottomSheetRef} />
        <DocBottomSheet
          ref={docBottomSheetRef}
          onSelect={() => {
            setIsDocSelected(true);
          }}
        />
      </View>
    </>
  );
};

export default Step1View;

const styles = StyleSheet.create({
  mobileNumView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 24,
    marginHorizontal: 16,
  },
});
