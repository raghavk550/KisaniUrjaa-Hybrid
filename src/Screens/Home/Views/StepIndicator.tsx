import React from 'react';
import {View, StyleSheet} from 'react-native';

const StepIndicator = ({currentStep = 1, totalSteps = 4}) => {
  return (
    <View style={styles.container}>
      {Array.from({length: totalSteps}).map((_, index) => (
        <View key={index} style={styles.segmentContainer}>
          <View
            style={[
              styles.segment,
              index < currentStep && styles.activeSegment,
              index < currentStep - 1 && styles.fullSegment,
            ]}
          />
        </View>
      ))}
    </View>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 14,
    marginBottom: 16,
  },

  segmentContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#00000010',
    borderRadius: 3,
    marginHorizontal: 4,
    overflow: 'hidden',
  },

  segment: {
    height: '100%',
    width: '50%',
    borderRadius: 3,
  },

  fullSegment: {
    height: '100%',
    width: '100%',
    borderRadius: 3,
  },

  activeSegment: {
    backgroundColor: '#FCB104', // orange
  },
});
