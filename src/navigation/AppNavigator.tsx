import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '../screens/DashboardScreen';
import { MDBScreen } from '../screens/MDBScreen';
import { UPSScreen } from '../screens/UPSScreen';
import { LightingScreen } from '../screens/LightingScreen';

export type RootStackParamList = {
  Dashboard: undefined;
  MDB: undefined;
  UPS: undefined;
  Lighting: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="MDB" component={MDBScreen} />
        <Stack.Screen name="UPS" component={UPSScreen} />
        <Stack.Screen name="Lighting" component={LightingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
