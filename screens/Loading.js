import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import Store from '../stores/Store';
import { StackActions, NavigationActions } from 'react-navigation';
import { ActivityIndicator, Colors } from 'react-native-paper';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

export function Loading(props) {
    StatusBar.setHidden(false);
    let store = Store.getInstance();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isLoaded == false) {
            var timerID = setInterval(() => checkIfReady(), 100);

            return function cleanup() {
                clearInterval(timerID);
            };
        }
    });

    function checkIfReady() {
        if (Store.isReady === true){
            setIsLoaded(true);
            props.navigation.dispatch(resetAction);
        }
    }

    // This is where we place the loading splash screen.
    return (
        <View style={styles.background}>
            <ActivityIndicator animating={true} color={Colors.blue800} size='large'/>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E2126'
    },
});
