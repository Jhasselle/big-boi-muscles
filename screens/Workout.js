import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { SessionContext } from '../context/SessionContext';


export function Workout({ navigation }) {

    const workoutUUID = navigation.state.params.workout_uuid
    const exercises = navigation.state.params.exercises
    const [numOfSetsRemaining, setNumOfSetsRemaining] = useState(exercises[0].num_of_sets)
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)

    // Context
    const [session, setSession] = useContext(SessionContext)

    // Timer
    const [timerEnabled, setTimerEnabled] = useState(false)
    const [timerPaused, setTimerPaused] = useState(false)
    const [timerMS, setTimerMS] = useState(exercises[0].ms_of_rest)

    useEffect(()=>{
        // session ?  console.log('Workout useEffect', session.uuid) : null
    },[session])

    const restStart = () => {
        setTimerEnabled(true)
    }

    const restDone = () => {
        decrementRemainingSets();
        setTimerEnabled(false)
    }

    const decrementRemainingSets = () => {
        if (numOfSetsRemaining === 1) {
            if (currentExerciseIndex !== exercises.length - 1) {
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
            <Text>{numOfSetsRemaining} / {exercises[currentExerciseIndex].num_of_sets}</Text>
            {
                timerEnabled 
                    ?   <View>
                            <Text>{timerMS}</Text>
                            <Button onPress={restDone}>Skip Rest Period</Button>
                        </View>
                    :   <View>
                            <Button onPress={restStart}>Start Rest Timer</Button>
                        </View>
            }            
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
