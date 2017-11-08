import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class App extends React.Component {
  state = {
    location: { coords: { latitude: 0, longitude: 0 } },
    errorMessage: null,
    persons: [],
    name: 'Write username here',
  };

  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    },
      this.setState({ location, region })
  }

 

  getPersonsFromApiAsync = () => {
    return fetch('https://9585535f.ngrok.io/api/friends/register/100',{
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
                coordinate={{
                  latitude: person.loc.coordinates[0],
                  longitude: person.loc.coordinates[1]
                }}
                title={person.userName}
                description={"Wow, you pushed me!"}
                pinColor='turquoise'
              />
            );
          })}
        </MapView>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(name) => this.setState({name})}
        value={this.state.name}
      />
        <Button
          onPress={() => this.getPersonsFromApiAsync()}
          title="Update list yo!"
          color="#841584"
          accessibilityLabel="Oh wow, this is just like magic!"
        />
        {this.state.persons.map(person => {
          return (
            <Text>
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
