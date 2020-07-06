import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Colors } from 'react-native-paper';
import { NewExerciseModal } from '../modals/NewExerciseModal';
import { SessionContext } from '../context/SessionContext';
import Store from '../stores/Store';

// For adding or editting exercises of a workout
export function Exercises({ navigation }) {

    const store = Store.getInstance()
    const isNewWorkout = navigation.state.params.newWorkout
    const workoutName = navigation.state.params.name
    const workoutUUID = navigation.state.params.uuid
    const [modalVisible, setModalVisible] = useState(isNewWorkout)
    const [exercises, setExercises] = useState([])

    // Context
    const [session, setSession] = useContext(SessionContext)

    useEffect(() => {
        store.getExercises(workoutUUID, setExercises)
    }, [navigation])

    const addExercise = (exerciseName, exerciseWeight, exerciseReps, exerciseSets, exerciseRest) => {
        store.createExercise(workoutUUID, exerciseName, exerciseWeight, exerciseReps, exerciseSets, exerciseRest, setExercises)
        setModalVisible(false)
    }

    const startNewSession = async () => {
        store.createSession(workoutUUID, exercises, setSession, navigateToWorkout)
    }

    const navigateToWorkout = () => {
        navigation.navigate('Workout', {'workout_uuid': workoutUUID, 'exercises': exercises})
    }



    return (
        <View style={{ flex: 1, paddingTop: 30, backgroundColor: '#847692' }}>

            <NewExerciseModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                addExercise={addExercise}
            />
            <Text>Exercises of {workoutName}</Text>

            <ScrollView>
                {exercises && exercises.length > 0
                    ? exercises.map((exercise) =>
                        <Text key={exercise.name}>{exercise.name}</Text>
                    )
                    : <Text>empty</Text>
                }
                <Button onPress={() => setModalVisible(true)}>
                    Add Exercise
                </Button>
            </ScrollView>
            <Button onPress={startNewSession}>
                Start Werkout
            </Button>
            <Button></Button>
        </View>
    );
}

export function leftMenu() {
    return (
        <View></View>
    )
}
var width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    menuModal: {
        flex: 1,
        justifyContent: 'center',
    },
    leftMenu: {
        flex: 1,
        width: width * 0.75
    },
    rightMenu: {
        flex: 1,
        opacity: 0.3,
        backgroundColor: 'black',
        width: width
    },
    button: {
        flex: 1
    }
});


