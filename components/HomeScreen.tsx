import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation()
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{
          fontSize: 35,
          textAlign: 'center',
          color: 'black',
          paddingHorizontal: 10,
        }}>
        Welcome to Currency Converter
      </Text>

      {/* Pressable for the making clickable icon  */}
      
      <Pressable
        style={{
          backgroundColor: 'blue',
          width: 50,
          height: 50,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }} onPress={() => navigation.navigate("Dashboard")}>
        <Icon name="arrow-forward-circle" size={30} color="#ffffff" />
      </Pressable>
      <Text>Tap here to go dashborad</Text>
      <Pressable
        style={{
          backgroundColor: 'blue',
          width: 50,
          height: 50,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }} onPress={() => navigation.navigate("INR to Other Currency")}>
        <Icon name="arrow-forward-circle" size={30} color="#ffffff" />
      </Pressable>
      <Text>Tap here to convert INR to other currency</Text>
      <Pressable
        style={{
          backgroundColor: 'blue',
          width: 50,
          height: 50,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }} onPress={() => navigation.navigate("Currency converter")}>
        <Icon name="arrow-forward-circle" size={30} color="#ffffff" />
      </Pressable>
      <Text>Tap here to convert currency</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
