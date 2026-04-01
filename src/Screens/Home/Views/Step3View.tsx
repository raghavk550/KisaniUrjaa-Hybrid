/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export enum RelativeType {
  Father,
  Spouse,
}

const selectedIcon = require('../../../Assets/Images/radio_button.png');
const unselectedIcon = require('../../../Assets/Images/radio_unselected.png');

const Step3View = () => {
  const [relativeName, setRelativeName] = useState<RelativeType>(
    RelativeType.Father,
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          marginTop: 24,
          borderRadius: 24,
          borderColor: '#00000018',
          borderWidth: 1,
          alignSelf: 'stretch',
          marginHorizontal: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: 24,
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#E5E5E5',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.05,
            shadowRadius: 24,
            elevation: 24,
          }}>
          <Image
            source={require('../../../Assets/Images/Home/profile_pic_home.png')}
          />
          <View
            style={{
              position: 'absolute',
              bottom: -4,
              right: -4,
              backgroundColor: '#FC8019',
              height: 32,
              width: 32,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#fff',
              borderWidth: 2,
            }}>
            <Image
              source={require('../../../Assets/Images/Home/camera_home.png')}
            />
          </View>
        </View>
        <Text
          style={{
            marginTop: 16,
            fontSize: 14,
            fontWeight: '500',
            color: '#625D5B',
            marginBottom: 24,
          }}>
          Upload Profile Photo
        </Text>
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
          Additional Details
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 24,
            marginTop: 20,
            marginHorizontal: 16,
          }}>
          <TouchableOpacity
            onPress={() => {
              setRelativeName(RelativeType.Father);
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={
                  relativeName === RelativeType.Father
                    ? selectedIcon
                    : unselectedIcon
                }
              />
              <Text>Father Name</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setRelativeName(RelativeType.Spouse);
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={
                  relativeName === RelativeType.Spouse
                    ? selectedIcon
                    : unselectedIcon
                }
              />
              <Text>Spouse Name</Text>
            </View>
          </TouchableOpacity>
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
            placeholder={`Enter ${
              relativeName === RelativeType.Father ? 'Father' : 'Spouse'
            } Name`}
            style={{
              flex: 1,
              marginHorizontal: 8,
              fontSize: 14,
              fontWeight: 'semibold',
              color: '#353231',
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            marginTop: 24,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 14,
              color: '#353231',
            }}>
            Alternate Mobile Number
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowTooltip(prev => !prev);
            }}>
            <Image
              source={require('../../../Assets/Images/info.png')}
              resizeMode="cover"
            />
          </TouchableOpacity>
          {showTooltip && (
            <View style={styles.wrapper}>
              <View style={styles.bubble}>
                <Text style={styles.text}>
                  You can also add a family member's Mobile Number
                </Text>
              </View>

              {/* Triangle Pointer */}
              <View style={styles.arrow} />
            </View>
          )}
        </View>
        <View
          style={{
            height: 56,
            borderColor: '#E3E2E1',
            borderWidth: 1,
            borderRadius: 12,
            width: '90%',
            alignSelf: 'center',
            marginTop: 6,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../../Assets/Images/phone.png')}
            style={{marginHorizontal: 12}}
            resizeMode="cover"
          />
          <TextInput
            placeholder="Enter Mobile Number"
            style={{
              flex: 1,
              color: '#161413',
              fontSize: 16,
              marginRight: 16,
            }}
            value={text}
            onChangeText={setText}
            keyboardType="number-pad"
            maxLength={10}
            cursorColor={'#161413'}
          />
        </View>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 14,
            color: '#353231',
            marginTop: 24,
            paddingHorizontal: 20,
          }}>
          Email ID
        </Text>
        <View
          style={{
            height: 56,
            borderColor: '#E3E2E1',
            borderWidth: 1,
            borderRadius: 12,
            width: '90%',
            alignSelf: 'center',
            marginTop: 6,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../../Assets/Images/email.png')}
            style={{marginHorizontal: 12}}
            resizeMode="cover"
          />
          <TextInput
            placeholder="Enter Mobile Number"
            style={{
              flex: 1,
              color: '#161413',
              fontSize: 16,
              marginRight: 16,
            }}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            cursorColor={'#161413'}
          />
        </View>
        <View
          style={{
            alignSelf: 'stretch',
            marginTop: 28,
          }}>
          <Text
            style={{
              paddingVertical: 20,
              paddingHorizontal: 16,
              color: '#DF8700',
              backgroundColor: '#DF870005',
              fontSize: 14,
              fontWeight: 'semibold',
            }}>
            Educational Details
          </Text>
        </View>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 14,
            color: '#353231',
            marginTop: 20,
            paddingHorizontal: 20,
          }}>
          Highest Education
        </Text>
        <TouchableOpacity>
          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignSelf: 'stretch',
              borderRadius: 12,
              borderColor: '#E3E2E1',
              borderWidth: 1,
              height: 56,
              alignItems: 'center',
              paddingHorizontal: 14,
              marginHorizontal: 16,
              marginBottom: 24,
            }}>
            <Image source={require('../../../Assets/Images/ic_document.png')} />
            <TextInput
              placeholder="Select Education Level"
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
      </View>
    </View>
  );
};

export default Step3View;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: -34,
    right: 7,
  },
  bubble: {
    backgroundColor: '#212121',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#212121',
    marginRight: 14, // move arrow horizontally
  },
});
