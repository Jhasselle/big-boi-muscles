import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Colors } from 'react-native-paper';
import { NewExerciseModal } from '../modals/NewExerciseModal';
import Store from '../stores/Store';

// For adding or editting exercises of a workout
export function NewExercise({navigation}) {

    const store = Store.getInstance()
    const workoutName = navigation.state.params.name
    const workoutUUID = navigation.state.params.uuid

    useEffect(()=>{
        // console.log(navigation.state.params)
    })

    const [modalVisible, setModalVisible] = useState(true)
    const [exercises, setExercises] = useState([])

    const addExercise = () => {

        setModalVisible(false);
    }

    return (
        <View style={{flex: 1, paddingTop:30, backgroundColor:'#847692'}}>

            <NewExerciseModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                addExercise={addExercise}
            />
            <Text>Exercises of {workoutName} {workoutUUID}</Text>
            <ScrollView>
                <Button onPress={()=>setModalVisible(true)}>
                    Add Exercise
                </Button>
            </ScrollView>
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


