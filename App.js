import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={[styles.textStyle,styles.largeText]}>Dhaka</Text>
      <Text style={[styles.textStyle, styles.smallText]}>Light Cloud</Text>
      <Text style={[styles.textStyle, styles.largeText]}>25°</Text>
      <TextInput
      autoCorrect={false}
      placeholder="Search any city"
      placeholderTextColor="white"
      style={styles.textInput}
      clearButtonMode="always"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle:{
    textAlign:"center",
    fontFamily: Platform.OS ==="ios"? 'AvenirNext-Regular' : 'Roboto'
  },
  largeText:{
    fontSize:44,
  },
  smallText:{
    fontSize:18
  },
  textInput: {
    backgroundColor: '#666',
    color: 'white',
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    },
});
