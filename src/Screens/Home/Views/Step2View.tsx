/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Step2ViewsModel = {
  header: string;
  placeholder: string;
  isShowDropdown: boolean;
  isShowRequiredIcon: boolean;
};

const Step2View = () => {
  const step2ViewDetails: Step2ViewsModel[] = [
    {
      header: 'Pincode',
      placeholder: 'Enter Pincode',
      isShowDropdown: false,
      isShowRequiredIcon: true,
    },
    {
      header: 'State',
      placeholder: 'State',
      isShowDropdown: false,
      isShowRequiredIcon: true,
    },
    {
      header: 'District',
      placeholder: 'District',
      isShowDropdown: false,
      isShowRequiredIcon: true,
    },
    {
      header: 'Mandal',
      placeholder: 'Select Mandal',
      isShowDropdown: true,
      isShowRequiredIcon: true,
    },
    {
      header: 'Village',
      placeholder: 'Select Village',
      isShowDropdown: true,
      isShowRequiredIcon: true,
    },
  ];

  const [contentHeight, setContentHeight] = useState(0);

  const lineHeight = 18;
  const numberOfLines = Math.round(contentHeight / lineHeight);

  return (
    <View style={{marginHorizontal: 16, marginTop: 24}}>
      <Text style={{fontWeight: '600', fontSize: 18, color: '#161413'}}>
        Home Address Details
      </Text>
      <View style={[styles.mobileNumView, {marginTop: 24}]}>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 16,
          }}>
          Complete Address
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
          borderRadius: 12,
          borderColor: '#E3E2E1',
          borderWidth: 1,
          height: 70,
          alignItems: numberOfLines >= 2 ? 'center' : 'flex-start',
          justifyContent: 'flex-start',
          paddingHorizontal: 18,
          paddingVertical: 8,
        }}>
        <Image
          source={require('../../../Assets/Images/ic-user.png')}
          style={{
            marginTop: numberOfLines >= 2 ? 0 : 4.5,
          }}
        />
        <TextInput
          multiline
          numberOfLines={2}
          placeholder="Enter Complete Address..."
          onContentSizeChange={e => {
            setContentHeight(e.nativeEvent.contentSize.height);
          }}
          style={{
            flex: 1,
            marginLeft: 8,
            fontSize: 14,
            fontWeight: 'semibold',
            color: '#353231',
            textAlignVertical: 'top',
            lineHeight: lineHeight,
            alignSelf: numberOfLines >= 2 ? 'center' : 'flex-start',
            paddingTop: Platform.OS === 'android' ? 5 : undefined,
            paddingBottom: Platform.OS === 'android' ? 0 : undefined,
            includeFontPadding: Platform.OS === 'android' ? false : undefined,
            marginTop:
              Platform.OS === 'android' ? 0 : numberOfLines >= 2 ? 0 : 4.5,
          }}
        />
      </View>
      {step2ViewDetails.map((item, index) =>
        item.isShowDropdown ? (
          <React.Fragment key={index}>
            <View style={styles.mobileNumView}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                {item.header}
              </Text>
              {item.isShowRequiredIcon && (
                <Image
                  source={require('../../../Assets/Images/required.png')}
                  style={{marginLeft: 2, marginTop: 2}}
                  resizeMode="cover"
                />
              )}
            </View>
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
                }}>
                <Image
                  source={require('../../../Assets/Images/ic_document.png')}
                />
                <TextInput
                  placeholder={item.placeholder}
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
          </React.Fragment>
        ) : (
          <React.Fragment key={index}>
            <View style={styles.mobileNumView}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                {item.header}
              </Text>
              {item.isShowRequiredIcon && (
                <Image
                  source={require('../../../Assets/Images/required.png')}
                  style={{marginLeft: 2, marginTop: 2}}
                  resizeMode="cover"
                />
              )}
            </View>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignSelf: 'stretch',
                borderRadius: 12,
                borderColor: '#E3E2E1',
                borderWidth: 1,
                height: 56,
                alignItems: 'center',
                paddingHorizontal: 14,
              }}>
              <Image source={require('../../../Assets/Images/ic-user.png')} />
              <TextInput
                placeholder={item.placeholder}
                style={{
                  flex: 1,
                  marginHorizontal: 8,
                  fontSize: 14,
                  fontWeight: 'semibold',
                  color: '#353231',
                }}
              />
            </View>
          </React.Fragment>
        ),
      )}
    </View>
  );
};

export default Step2View;

const styles = StyleSheet.create({
  mobileNumView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
});
