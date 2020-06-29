import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';

export function Workout({navigation}) {
  const workout = navigation.state.params.workout;
  // const [exercises, getExercises] = useState([])
  const exercises = [
    {'uuid':'1', 'name':'dumbbell bench', 'weight':30000, 'num_of_sets':3, 'num_of_reps':7},
    {'uuid':'2', 'name':'shoulder machine', 'weight':40, 'num_of_sets':3, 'num_of_reps':7},
    {'uuid':'3', 'name':'dips', 'weight':0, 'num_of_sets':3, 'num_of_reps':6},
    {'uuid':'4', 'name':'tricep pulldowns', 'weight':75, 'num_of_sets':3, 'num_of_reps':8},
  ];

  return (
    <View style={styles.container}>
      <Text>{exercises[0].name}</Text>
      <Image source={require('../assets/kevin.png')} />
      <Button>Start Rest Timer</Button>
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
