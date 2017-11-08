import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };
const URL = 'https://l.facebook.com/l.php?u=https%3A%2F%2F74e889f3.ngrok.io%2F&h=ATP_HgsLPI3IySkzoT7DziQwdnAEYqSggQ8IeUjhyYjNQ_hjGozBT3wdfMDuwZ-aIs_mKUmqA7Zfq7-fcb_KCuptZklgevlp7rm2WIPk3hJNlWbk0vaBt9M1WmGL-iqqgD4JE-aHNDXHN5SXDxo';

export default class App extends React.Component {
  state = {
    location: { coords: { latitude: 0, longitude: 0 } },
    errorMessage: null,
    markers: [],
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

  getInitialState() {
    return {
      markers: []
    };
  }




  render() {


    return (
      <View style={{ flex: 0.7 }} >

        <MapView
          style={{ flex: 0.7 }}

          showsUserLocation={true}
          region={this.state.region}
        >
          {this.state.markers.map(marker => {
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
        <Text>'hej'</Text>
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
