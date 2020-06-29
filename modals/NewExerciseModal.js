import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Colors } from 'react-native-paper';
import Modal from 'react-native-modal';
import Store from '../stores/Store';

export function NewExerciseModal({modalVisible, setModalVisible, addExercise}) {

    const store = Store.getInstance();
    const [exerciseName, setExerciseName] = useState('');
    const [exerciseWeight, setExerciseWeight] = useState('');
    const [exerciseReps, setExerciseReps] = useState('');
    const [exerciseSets, setExerciseSets] = useState('');
    const [exerciseRest, setExerciseRest] = useState('')

    const textInputRef = useRef(null);

    const addExerciseWrapper = () => {
        clearInputFields()
        addExercise()
    }

    const closeMenu = () => {
        clearInputFields()
        setModalVisible(false)
    }

    const clearInputFields = () => {
        setExerciseName('')
        setExerciseWeight('')
        setExerciseReps('')
        setExerciseSets('')
        setExerciseRest('')
    }
 
    return (
        <Modal
            style={{ margin: 0 }}
            isVisible={modalVisible}
            onBackButtonPress={closeMenu}
            onBackdropPress={closeMenu}
            contentContainerStyle={styles.modal}
            backdropOpacity={0.7}
            onShow={()=>textInputRef.current.focus()}
        >
            <View style={{flexGrow: 1, margin: 50, paddingTop:30, backgroundColor:'white', borderRadius:30}}>
                <TextInput 
                    ref={textInputRef}
                    label='Exercise Name'
                    value={exerciseName}
                    onChangeText={exerciseName => setExerciseName(exerciseName)}
                />
                <TextInput 
                    label='Weight'
                    value={exerciseWeight}
                    onChangeText={exerciseWeight => setExerciseWeight(exerciseWeight)}
                />
                <TextInput 
                    label='Number of Reps'
                    value={exerciseReps}
                    onChangeText={exerciseReps => setExerciseReps(exerciseReps)}
                />
                <TextInput 
                    label='Number of Sets'
                    value={exerciseSets}
                    onChangeText={exerciseSets => setExerciseSets(exerciseSets)}
                />
                <TextInput 
                    label='Rest Time Between Sets'
                    value={exerciseRest}
                    onChangeText={exerciseRest => setExerciseRest(exerciseRest)}
                />
                <Button onPress={addExerciseWrapper}> OK boomer </Button>
                <Button onPress={closeMenu}>Cancel</Button>
            </View>
            
        </Modal>

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
        width: 50,
        flex: 1
    }
});


