import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Button, Image } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class App extends React.Component {
  state = {
    location: { coords: { latitude: 0, longitude: 0 } },
    errorMessage: null,
    persons: [],
    name: '',
    dist: '',
    pinColors: ['red', 'orange', 'yellow', 'green', 'blue', 'turquoise', 'violet', 'indigo'],
  };

  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  distanceChanged(text){ 
    let newText = ''; 
    let numbers = '0123456789'; 
    if(text.length < 1){ 
      this.setState({ dist: '' });
    } 
    
    for (var i=0; i < text.length; i++) { 
      if(numbers.indexOf(text[i]) > -1 ) { 
        newText = newText + text[i]; 
      } 
      this.setState({ dist: newText }); 
    } 
  }

  locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude, //56.29740455181511 = Centred in Denmark. If desired centred on user location: location.coords.latitude,
      longitude: location.coords.longitude, //11.728640201207554 = Centred in Denmark. If desired centred on user location: location.coords.longitude,
      latitudeDelta: 0.8, //3.5 = zoom level nationwide. 0.1 = zoom level 10km radius
      longitudeDelta: 0.05, //0.05
    },
      this.setState({ location, region })
  }

  getPersonsFromApiAsync = () => {
    return fetch('https://jungle-pressure.glitch.me/api/friends/register/'+this.state.dist,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.state.name,
        loc: {type: 'Point',
              coordinates: [this.state.location.coords.latitude, this.state.location.coords.longitude]}
      })
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Adding: " +res);
        this.setState({persons: res})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onMapLayout = () => this.map.fitToElements(true);//boolean specifies whether animation is desired

  render() {
    return (
      <View style={{ flex: 1 }} >
        <MapView
          ref={ref => this.map = ref}
          onLayout={this.onMapLayout}
          style={{ flex: 0.7 }}
          showsUserLocation={true}
          region={this.state.region}
        >
          {this.state.persons.map(person => {
            return (
              <MapView.Marker 
                key={person.userName}
                coordinate={{
                  latitude: person.loc.coordinates[0],
                  longitude: person.loc.coordinates[1]
                }}
                title={person.userName}
                description={"Wow, you pushed me!"}
                pinColor={this.state.pinColors[Math.floor(Math.random() * this.state.pinColors.length)]}
              />
            );
          })}
        </MapView>
        <Text style={{height: 40, fontWeight: 'bold'}}>
          {'\n'}Sign-in
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Username'
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Radius (km) to find friends within'
          keyboardType = 'numeric'
          onChangeText = {(text)=> this.distanceChanged(text)}
          value = {this.state.dist}
          maxLength = {3}  
        />
        <Button
          onPress={
            () => {
              if(this.state.dist){//check to ensure dist has a value entered before running fetch function
                this.getPersonsFromApiAsync()
              }
            }
            }
          title="Show / List Friends"
          color="purple"
          accessibilityLabel="Oh wow, this is just like magic!"
        />

        <View style={{backgroundColor: '#000000'}}>
        
        {this.state.persons.map(person => {
          return (
            <Text key={person.userName}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>{person.userName + ": "}</Text>
            <Text style={{color: 'blue'}}>{"Lat: " +person.loc.coordinates[0] + " Long: "+ person.loc.coordinates[1]  + "\n"}</Text>
            </Text>
          );
        })}
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});