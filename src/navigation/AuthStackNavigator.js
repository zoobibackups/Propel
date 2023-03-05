import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Easing} from 'react-native';
import fonts from '../constants/fonts';
import {moderateScale} from '../constants/scaling';
import colors from '../constants/theme';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import GettingStartedScreen from '../screens/GettingStartedScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTitleAlign: 'center',
        headerTintColor: colors.white,
        headerTitleStyle: {
          color: colors.white,
          fontFamily: fonts.Bold,
          fontSize: moderateScale(14),
        },
        headerStyle: {
          backgroundColor: colors.primaryColor,
        },
        headerBackTitle: '',
        headerShown: true,
        headerMode: 'float',
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {duration: 500, easing: Easing.inOut(Easing.ease)},
          },
          close: {
            animation: 'timing',
            config: {duration: 500, easing: Easing.inOut(Easing.ease)},
          },
        },
        cardStyleInterpolator: ({current: {progress}}) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
      })}
      independent={true}>
      <Stack.Screen
        name="GettingStartedScreen"
        component={GettingStartedScreen}
        options={{
          headerShown: false,
          title: 'Getting Started',
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: true,

          title: 'Login',
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,

          title: 'Forgot Password',
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: true,
          title: 'Register',
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
