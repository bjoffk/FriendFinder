import React from 'react';
import { MapView } from 'expo';

export default class App extends React.Component {
    static navigationOptions = { title: "Map" }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 55.7705449,//lat 55.7705449 Lyngby
          longitude: 12.5118374, //lon 12.5118374 Lyngby
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
            coordinate={{latitude: 55.7705449,
            longitude: 12.5118374}}
            title={"Cphbusiness Lyngby"}
            description={"Educational Academy"}
            pinColor= 'turquoise'




/*
pinColor options 
red (default), tomato, orange, yellow, gold, wheat, tan, linen, green,
blue / navy, aqua / teal / turquoise, violet / purple / plum, indigo
*/


        />
      </MapView>

    );
  }
}
