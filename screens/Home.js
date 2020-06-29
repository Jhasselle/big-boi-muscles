import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import Store from '../stores/Store';

export function Home({navigation}) {
  const [store] = useState(Store.getInstance('Home'));
  // const [workouts, setWorkouts] = useState([])
  // const [exercises, setExercises] = useState([])

  // Dummy data
  const workouts = [
    {'uuid':'1', 'name':'push', 'last_workout': 100, 'exercise_reference_array':[1,2,3], 'workout_days_array':['sunday']},
    {'uuid':'2', 'name':'pull', 'last_workout': 99, 'exercise_reference_array':[4,5,6], 'workout_days_array':['tuesday']},
    {'uuid':'3', 'name':'legs', 'last_workout': 98, 'exercise_reference_array':[7,8,9], 'workout_days_array':['thursday']}
  ];

  useEffect(()=>{
  })

  const addWorkoutButtonOnPress = () => {
    console.log('addWorkoutButtonOnPress')
  }

  return (
    <View style={styles.container}>
      <Text>UwU UwU Home UwU UwU </Text>
        <View style={styles.workoutView}>
          <ScrollView>
            { workouts ? 
                workouts.map((workout) =>
                  <WorkoutButton 
                    workout={workout} 
                    navigation={navigation}
                    key={workout.uuid} 
                  />
                )
                : null
            }
            <Button onPress={addWorkoutButtonOnPress}>
              Add Workout
            </Button>
          </ScrollView>
        </View>
      
    </View>
  );
}

export function WorkoutButton({workout, navigation}) {

  const navigateToPreWorkout = () => {
    // console.log('go to workout', workout.name, workout.uuid)
    navigation.navigate('PreWorkout', {workout})
  }

  return (
    <View style={{flex:1}}>
      <Button onPress={navigateToPreWorkout}>
        {workout.name}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutView: {
    flex: 1,
    backgroundColor: '#65a7e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
