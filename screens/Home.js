import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import Store from '../stores/Store';

export function Home({ navigation }) {

    const store = Store.getInstance('Home')
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        navigation.addListener(
            'willFocus',
            () => {
                store.getAllWorkouts(setWorkouts)
            }
        );
        store.getAllWorkouts(setWorkouts)
    }, [navigation])

    const navigateToNewWorkout = () => {
        navigation.navigate('NewWorkout')
    }

    return (
        <View style={styles.container}>
            <View style={styles.workoutView}>
                <ScrollView>
                    {workouts && workouts.length > 0 ?
                        workouts.map((workout) =>
                            <WorkoutButton
                                workout={workout}
                                navigation={navigation}
                                key={workout.uuid}
                            />
                        )
                        : <Text>no werkouts</Text>
                    }
                    <Button onPress={navigateToNewWorkout}>
                        Add Workout
            </Button>
                </ScrollView>
            </View>

        </View>
    );
}

export function WorkoutButton({ workout, navigation }) {

    const navigateToPreWorkout = () => {
        // console.log('go to workout', workout.name, workout.uuid)
        navigation.navigate('PreWorkout', { workout })
    }

    return (
        <View style={{ flex: 1 }}>
            <Button onPress={navigateToPreWorkout}>
                {workout.name}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaafff',
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
