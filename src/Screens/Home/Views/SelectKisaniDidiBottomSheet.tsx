/* eslint-disable react-native/no-inline-styles */
import React, {forwardRef, useMemo} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dimensions} from 'react-native';

const MAX_HEIGHT = Dimensions.get('window').height * 0.75;

type KisaniDidiModel = {
  name: string;
  phone: string;
  address: string;
  userID: string;
};

const DATA: KisaniDidiModel[] = [
  {
    name: 'Namita Devi',
    phone: '+91 09876543210',
    address: 'Ratnapur, Maharashtra',
    userID: '#KD00001',
  },
  {
    name: 'Namita Devi',
    phone: '+91 09876543210',
    address: 'Ratnapur, Maharashtra',
    userID: '#KD00001',
  },
  {
    name: 'Namita Devi',
    phone: '+91 09876543210',
    address: 'Ratnapur, Maharashtra',
    userID: '#KD00001',
  },
  {
    name: 'Namita Devi',
    phone: '+91 09876543210',
    address: 'Ratnapur, Maharashtra',
    userID: '#KD00001',
  },
];

const KisaniDidiBottomSheet = forwardRef<BottomSheetModal>((props, ref) => {
  const snapPoints = useMemo(() => ['75%'], []);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enableDynamicSizing
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      enablePanDownToClose>
      <BottomSheetView style={styles.contentContainer}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 18,
            marginTop: 20,
            color: '#161413',
          }}>
          Select Kisani Didi
        </Text>

        <TextInput
          placeholder="Search by ID"
          style={{
            marginTop: 16,
            borderWidth: 1,
            borderColor: '#A7A2A0',
            borderRadius: 10,
            height: 56,
            alignSelf: 'stretch',
            marginHorizontal: 16,
            paddingHorizontal: 15,
          }}
        />

        <FlatList
          data={DATA}
          style={{
            alignSelf: 'stretch',
            marginHorizontal: 16,
            marginTop: 16,
            maxHeight: MAX_HEIGHT - 150,
          }}
          contentContainerStyle={{paddingBottom: 30}}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{height: 5}} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View
              style={{
                padding: 16,
                backgroundColor: '#f3f3f3',
                borderRadius: 16,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: '#161413',
                      }}>
                      {item.name}
                    </Text>

                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: '600',
                        color: '#353231',
                        paddingVertical: 2,
                        paddingHorizontal: 6,
                        borderRadius: 16,
                        backgroundColor: '#FFD21E',
                        marginLeft: 8,
                      }}>
                      {item.userID}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: '#353231',
                      marginTop: 4,
                    }}>
                    {item.phone}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      color: '#353231',
                      marginTop: 4,
                    }}>
                    {item.address}
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 14,
                      color: '#FC8019',
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderWidth: 1,
                      borderColor: '#FC8019',
                      borderRadius: 12,
                    }}>
                    Select
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default KisaniDidiBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
