import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import { auth, db, storage } from '../../firebase'
import { useRouter } from 'expo-router';
import ProfilePicture from "../../components/profile/ProfilePicture"
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import ChangeProfilePicture from '../../components/profile/ChangeProfilePicture';

type UserData = {
  __id: string;
  email: string;
  name: string;
  profilePicture: string;
  username: string;
}

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height



export default function Home() {
  const [user, setUser] =  useState<UserData>();
  
  useEffect (() => {
    const fetchUser = async (id: string) => {
        const user: UserData = {
            __id:  "",
            email: "",
            name: "",
            profilePicture: "",
            username: ""
        }
        const userDoc = await getDoc(doc(db, "user", id));
        if (userDoc.exists()) {
          user.__id = userDoc.data().__id;
          user.email = userDoc.data().email;
          user.name = userDoc.data().name;
          user.profilePicture = userDoc.data().profilePicture;
          user.username = userDoc.data().username;
          
        }
        setUser(user);
    }
    fetchUser(auth.currentUser?.uid ? auth.currentUser?.uid : "");
}, [auth.currentUser?.uid]) 

    const router = useRouter();
    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            router.push("/");
          })
          .catch(error => alert(error.message))
    }

    

    return (
        <View style={styles.container}>
            {user?.profilePicture && <ProfilePicture profilePictureID={user?.profilePicture}/>}
            <Text>Email: {user?.email}</Text>
            <Text>Name: {user?.name}</Text>
            <Text>Username: {user?.username}</Text>
            {user?.__id && <ChangeProfilePicture userID={user?.__id} />}
            <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
          
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
     button: {
      backgroundColor: '#0782F9',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
  })
  