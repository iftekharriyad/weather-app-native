import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform, ImageBackground, KeyboardAvoidingView, ActivityIndicator } from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';
import GetImageForWeather from './utils/getImageForWeather'

import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      location:'',
      loading:false,
      error:false,
      weather:'',
      temerature:0
    }
  }
  componentDidMount(){
    this.handleUpdateLocation('Dhaka');
  }
  handleUpdateLocation = (city)=>{
    if(!city) return;

    this.setState({ loading : true}, async ()=>{
      try{
        let locationId = await fetchLocationId(city);
        let { location, weather, temperature } = await fetchWeather(locationId);
        this.setState({
          loading : false,
          error: false,
          location, weather, temperature
        })
      }catch(e){
        this.setState({
          loading: false,
          error:true
        })
      }
    })
  }
  render(){
    const { loading, error, location, weather, temperature } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ImageBackground
          source={GetImageForWeather(weather)}
          imageStyle={styles.imageStyle}
          style={styles.imageContainer}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color='white' size="large"/>
            {
              !loading && (
                <View>
                {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                Could not load weather, please try a different city.
                </Text>
                )}
                {!error && (
                <View>
                <Text style={[styles.largeText, styles.textStyle]}>
                {location}
                </Text>
                <Text style={[styles.smallText, styles.textStyle]}>
                {weather}
                </Text>
                <Text style={[styles.largeText, styles.textStyle]}>
                {`${Math.round(temperature)}°`}
                </Text>
                </View>
                )}
                <SearchInput
                placeholder="Search any city"
                onSubmit={this.handleUpdateLocation}
                />
                </View>
                )
            }
          </View>
          <StatusBar style="auto" />
        </ImageBackground>
  
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
    image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
    },
  textStyle: {
      textAlign: 'center',
      fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
      color: 'white',
  },
  largeText:{
    fontSize:44,
  },
  smallText:{
    fontSize:18
  },
});
