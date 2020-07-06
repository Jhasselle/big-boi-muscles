import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SessionContext } from '../context/SessionContext';

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
