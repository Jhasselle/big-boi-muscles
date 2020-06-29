import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

export function PreWorkout({navigation}) {
  const workout = navigation.state.params.workout;
  // const [exercises, getExercises] = useState([])
  const exercises = [
    {'uuid':'1', 'name':'dumbbell bench', 'weight':30000, 'num_of_sets':3, 'num_of_reps':7},
    {'uuid':'2', 'name':'shoulder machine', 'weight':40, 'num_of_sets':3, 'num_of_reps':7},
    {'uuid':'3', 'name':'dips', 'weight':0, 'num_of_sets':3, 'num_of_reps':6},
    {'uuid':'4', 'name':'tricep pulldowns', 'weight':75, 'num_of_sets':3, 'num_of_reps':8},
  ];

  const navigateToWorkout = () => {
    // console.log('go to workout', workout.name, workout.uuid)
    navigation.navigate('Workout', {workout})
  }

  return (
    <View style={styles.container}>
      <Text>{workout.name}</Text>
      <ScrollView>
        { exercises ?
            exercises.map((exercise)=>
              <View style={{alignItems:'flex-start', flexDirection:'row'}}>
                <Button>{exercise.name}</Button>
                <Text>{exercise.weight}lbs {exercise.num_of_reps}x{exercise.num_of_sets}</Text>
              </View>
              
            )
          : null
        }
        <Button>Add Exercise</Button>
      </ScrollView>
    <Button onPress={navigateToWorkout}>
        Start Workout
    </Button>
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
