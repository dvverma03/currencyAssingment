import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CurrencyConverter from './components/CurrencyConverter';
import { enableScreens } from 'react-native-screens';
import HomeScreen from './components/HomeScreen';
import Dashboard from './components/Dashboard';
import InrToOther from './components/InrToOther';
enableScreens();


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* options for hide the name of screen and hide the header of screen  */}
        
        <Stack.Screen options={{
            headerTitle: "",
            headerShown:false
          }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{
            headerTitle: ""
          }} name="Currency converter" component={CurrencyConverter} />
        <Stack.Screen options={{
            headerTitle: ""
          }} name="INR to Other Currency" component={InrToOther} />

        <Stack.Screen  name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
