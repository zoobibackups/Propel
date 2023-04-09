import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Easing} from 'react-native';
import fonts from '../constants/fonts';
import {moderateScale} from '../constants/scaling';
import colors from '../constants/theme';
import AddNewPropertyScreen from '../screens/AddNewPropertyScreen';
import EditPropertyDetailsScreen from '../screens/EditPropertyDetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import PropertyDetailsScreen from '../screens/PropertyDetailsScreen';
import CustomDrawer from './DrawerContent';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function MainStack() {
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
        headerShown: true,
        headerBackTitleVisible: false,
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
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: 'Dashboard',
        }}
      />
      <Stack.Screen
        name="AddNewPropertyScreen"
        component={AddNewPropertyScreen}
        options={{
          headerShown: true,
          title: 'Add New Property',
        }}
      />
      <Stack.Screen
        name="PropertyDetailsScreen"
        component={PropertyDetailsScreen}
        options={{
          headerShown: true,
          title: 'Property Details',
        }}
      />

      <Stack.Screen
        name="EditPropertyDetailsScreen"
        component={EditPropertyDetailsScreen}
        options={{
          headerShown: true,
          title: 'Edit Property Details',
        }}
      />
    </Stack.Navigator>
  );
}

const StackNavigator = () => (
  <Drawer.Navigator
    gestureEnabled={false}
    screenOptions={{
      swipeEnabled: true,
      headerShown: false,
    }}
    drawerContent={props => <CustomDrawer {...props} />}>
    <Drawer.Screen name="MainStack" headerShown={false}>
      {props => <MainStack {...props} />}
    </Drawer.Screen>
  </Drawer.Navigator>
);

export default StackNavigator;
