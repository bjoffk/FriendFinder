import React from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class App extends React.Component {
  state = {
    location: { coords: { latitude: 0, longitude: 0 } },
    errorMessage: null,
    persons: [],
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
    return fetch('https://b499ad36.ngrok.io/api/friends/register/100',{
      method: 'post',
      body: JSON.stringify({
        userName: "Benny",
        loc: {type: "Point",
              coordinates: "[1337, 1337]"}
      })
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        //this.setState({persons: res})
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
                  latitude: 55.7705449,
                  longitude: 12.5118374
                }}
                title={"Cphbusiness Lyngby"}
                description={"Educational Academy"}
                pinColor='turquoise'

              />
            );
          })}
        </MapView>
        <Button
          onPress={() => this.getPersonsFromApiAsync()}
          title="Update list yo!"
          color="#841584"
          accessibilityLabel="Oh wow, this is just like magic!"
        />
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
