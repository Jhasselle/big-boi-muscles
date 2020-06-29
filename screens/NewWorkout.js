import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Colors } from 'react-native-paper';
import Modal from 'react-native-modal';
import Store from '../stores/Store';

export function NewWorkout({navigation}) {

    const store = Store.getInstance();
    const [workoutName, setWorkoutName] = useState('')
    const [workoutID, setWorkoutID] = useState(null)

    // Activates upon receiving new workout uuid
    useEffect(()=>{
        if (workoutID) {
            navigateToNewExercise()
        }
    }, [workoutID])

    const submissionWrapper = () => {
        if (workoutName.trim().length > 0) {
            store.createWorkout(workoutName, setWorkoutID)
        }
        else {
            console.log('REEEEEEEEEEEEEEEEEEEEEEE')
        }
    }

    const navigateToNewExercise = () => {
        navigation.navigate('NewExercise', {'name': workoutName, 'uuid': workoutID})
    }

    return (
        <View style={{flex: 1, paddingTop:30, backgroundColor:'#847692'}}>

            <TextInput 
                label='Workout Name'
                value={workoutName}
                onChangeText={workoutName => setWorkoutName(workoutName)}
            />

            <Text>Select Repeating Days</Text>

            <Button 
                onPress={submissionWrapper}
            >
                OK Boomer
            </Button>
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


