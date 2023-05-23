import MapView, { Heatmap, Marker } from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator, Text, Alert } from 'react-native';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import getLocation from '../../helpers/location';
import React from 'react';
import Location from 'expo-location';
import { useRouter } from 'expo-router';

// Firebase
import { db } from '../../firebase';
import { GeoPoint, Timestamp, collection, getDocs, orderBy, query } from 'firebase/firestore';


const cache = {
  __id: "",
  __imageId: "",
  __userId: "",
  _createdAt: new Timestamp(0, 0),
  caption: "",
  location: new GeoPoint(0, 0),
  numComments: 0,
  numLikes: 0,
  reported: false
}

type CacheData = {
  __id: string; 
  __imageId: string; 
  __userId: string; 
  _createdAt: Timestamp; 
  caption: string; 
  location: GeoPoint; 
  numComments: number; 
  numLikes: number; 
  reported: boolean;
}


export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null | undefined>();
  const [loading, setLoading] = useState(true);
  const [postsToRender, setPostsToRender] = useState([cache]);
  const router = useRouter();


  const mapRef = React.createRef();
  const fetchPosts = async () => {
    const postsList:CacheData[] = [];
    const cacheRef = collection(db, "cache");
    const q = query(cacheRef, orderBy('_createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((cache) => {
        const {
            __id,
            __imageId,
            __userId,
            _createdAt,
            caption,
            location,
            numComments,
            numLikes,
            reported
        } = cache.data();
        postsList.push({
            __id,
            __imageId,
            __userId,
            _createdAt,
            caption,
            location,
            numComments,
            numLikes,
            reported
        });
    });
    setPostsToRender(postsList);
}

useEffect(() => {
  fetchPosts();
})

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
      }}>
        {postsToRender.map((post) => { // Going through every post and returning a marker object for it

          return (
            <Marker 
            key={post.__id}
            // image={require("../../assets/images/CacheMeLogo.png")} add an image as a marker?
            coordinate={{
              latitude: post.location.latitude as number,
              longitude: post.location.longitude as number
            }}
             onPress={() => {router.push("/post/" + post.__id)}} // Sends you to the page for the specific route
             >
              
            </Marker>
          )
        })}
      </MapView>
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