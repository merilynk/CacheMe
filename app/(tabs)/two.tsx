import { StyleSheet } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import AWSImageSrc from '../../components/AWSImage';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import getLocation from '../../helpers/location';


export default function TabTwoScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await getLocation();
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <Text>Lat: {JSON.stringify(location?.coords.latitude)} Lon: {JSON.stringify(location?.coords.longitude)}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
      <AWSImageSrc id='fb6ccb8a-23c3-4376-8efb-3cf850f79c1f.png'/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});