import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function PostWorkout({navigation}) {
  return (
    <View style={styles.container}>
      <Text>PostWorkout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
