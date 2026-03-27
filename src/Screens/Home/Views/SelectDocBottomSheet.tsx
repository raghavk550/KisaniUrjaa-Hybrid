/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {forwardRef, useMemo} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dimensions} from 'react-native';

const MAX_HEIGHT = Dimensions.get('window').height * 0.75;

type DocModel = {
  name: string;
};

type DocProps = {
  onSelect: () => void;
};

const DATA: DocModel[] = [
  {
    name: 'Voter ID',
  },
  {
    name: 'Voter ID',
  },
  {
    name: 'Voter ID',
  },
  {
    name: 'Voter ID',
  },
];

const DocBottomSheet = forwardRef<BottomSheetModal, DocProps>(
  ({onSelect}, ref) => {
    const snapPoints = useMemo(() => ['75%'], []);
    const shouldScroll = DATA.length > 6;

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
            Select Document
          </Text>

          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: '#625D5B',
              marginTop: 16,
              textAlign: 'center',
              marginHorizontal: 16,
            }}>
            Choose a KYC document to upload. It will fill many details
            automatically.
          </Text>

          <FlatList
            data={DATA}
            scrollEnabled={shouldScroll}
            style={{
              alignSelf: 'stretch',
              marginHorizontal: 16,
              marginTop: 16,
              borderWidth: 1,
              borderRadius: 16,
              borderColor: '#00000010',
              marginBottom: 30,
              maxHeight: shouldScroll ? MAX_HEIGHT - 150 : undefined,
            }}
            contentContainerStyle={{paddingBottom: 10}}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{height: 5}} />}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View
                style={{
                  padding: 16,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#353231',
                    }}>
                    {item.name}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      onSelect();
                      (ref as any)?.current?.close();
                    }}>
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
  },
);

export default DocBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
  },
});
