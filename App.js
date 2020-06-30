import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Loading } from './screens/Loading';
import { Home } from './screens/Home';
import { NewWorkout } from './screens/NewWorkout';
import { PreWorkout } from './screens/PreWorkout';
import { Workout } from './screens/Workout';
import { PostWorkout } from './screens/PostWorkout';
import { Exercises } from './screens/Exercises';
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper';

const AppNavigator = createStackNavigator({
  Loading: {
    screen: Loading,
    navigationOptions: {
      headerShown: false,
      headerTitle: ""
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: true,
      headerTitle: "Big Muscle Boi App"
    }
  },
  NewWorkout: {
    screen: NewWorkout,
    navigationOptions: {
      headerShown: true,
      headerTitle: "New Workout"
    }
  },
  PreWorkout: {
    screen: PreWorkout,
    navigationOptions: {
      headerShown: true,
      headerTitle: ""
    }
  },
  Workout: {
    screen: Workout,
    navigationOptions: {
      headerShown: true,
      headerTitle: ""
    }
  },
  PostWorkout: {
    screen: PostWorkout,
    navigationOptions: {
      headerShown: false,
      headerTitle: ""
    }
  },
  Exercises: {
    screen: Exercises,
    navigationOptions: {
      headerShown: true,
      headerTitle: "Pre-Workout"
    }
  },
},
  {
    initialRouteName: 'Loading'
  },
);

const AppNavigationContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
    <PaperProvider>
        <AppNavigationContainer/>
    </PaperProvider>
  );
}

export default App;