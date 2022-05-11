import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import styles from './style';


function HomeScreen() {
    return (
      <View style={styles.viewContent}>
        <Text style={styles.textContent}>Home!</Text>
      </View>
    );
  }
  
  function SettingsScreen() {
    return (
      <View style={styles.viewContent}>
        <Text style={styles.textContent}>Settings!</Text>
      </View>
    );
  }
  
  const Tab = createBottomTabNavigator();
  
  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Read QR" component={HomeScreen} />
        <Tab.Screen name="QR List" component={SettingsScreen} />
      </Tab.Navigator>
    );
  }
  
  export default function MyTabsContent() {
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    );
  }
  