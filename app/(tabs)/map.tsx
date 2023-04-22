import MapView from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import getLocation from '../../helpers/location';
import React from 'react';
import Location from 'expo-location';



export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null | undefined>();
  const [loading, setLoading] = useState(true);


  const mapRef = React.createRef();
  useEffect(() => {
    (async () => {

        const loc = await getLocation()
        setLocation(loc);
        setLoading(false);
    })();
}, []);

  if(loading){
    return(
      <View style={[styles.container, styles.map]}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
      style={styles.map}
      showsUserLocation={true}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: location?.coords.latitude as number,
        longitude: location?.coords.longitude as number,
        latitudeDelta: .28,
        longitudeDelta: .28
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});