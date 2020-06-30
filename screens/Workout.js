import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';

export function Workout({ navigation }) {

    const workoutUUID = navigation.state.params.workout_uuid
    const exercises = navigation.state.params.exercises
    const [numOfSetsRemaining, setNumOfSetsRemaining] = useState(exercises[0].num_of_sets)
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const [currentExercise, setCurrentExercise] = useState(exercises[0])

    const decrementRemainingSets = () => {
        if (numOfSetsRemaining === 1) {
            if (currentExerciseIndex !== exercises.length - 1) {
                // setCurrentExercise(exercises[currentExerciseIndex + 1])
                setNumOfSetsRemaining(exercises[currentExerciseIndex + 1].num_of_sets)
                setCurrentExerciseIndex(currentExerciseIndex + 1)
            }
            else {
                // workout is done
                navigation.navigate('PostWorkout')
            }
        }
        else {
            setNumOfSetsRemaining(numOfSetsRemaining - 1)
        }
    }


    return (
        <View style={styles.container}>
            <Text>{exercises[currentExerciseIndex].name}</Text>
            <Text>{numOfSetsRemaining}</Text>
            <Button onPress={decrementRemainingSets}>Start Rest Timer</Button>
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
