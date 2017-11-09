import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class App extends React.Component {
  state = {
    location: { coords: { latitude: 0, longitude: 0 } },
    errorMessage: null,
    persons: [],
    name: 'abc',
    dist: '22',
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
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.8, //0.1
      longitudeDelta: 0.05, //0.05
    },
      this.setState({ location, region })
  }

  getPersonsFromApiAsync = () => {
    return fetch('https://9a97b1f7.ngrok.io/api/friends/register/'+this.state.dist,{
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

  render() {
    return (
      <View style={{ flex: 1 }} >

        <MapView
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
          //onChangeText={(dist) => this.setState({dist})}
          keyboardType = 'numeric'
          onChangeText = {(text)=> this.distanceChanged(text)}
          value = {this.state.dist}
          maxLength = {2} 
        />
        <Button
          onPress={
            () => {
              if(this.state.dist){
                this.getPersonsFromApiAsync()
              }
            }
            }
          title="Show / List Friends"
          color="#841584"
          accessibilityLabel="Oh wow, this is just like magic!"
        />
        {this.state.persons.map(person => {
          return (
            <Text key={person.userName}>
            <Text style={{fontWeight: 'bold'}}>{person.userName + ": "}</Text>
            <Text>{"Lat: " +person.loc.coordinates[0] + " Long: "+ person.loc.coordinates[1]  + "\n"}</Text>
            </Text>
          );
        })}
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