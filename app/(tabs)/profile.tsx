import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ActivityIndicator } from 'react-native'
import { auth, db, storage } from '../../firebase'
import { useRouter } from 'expo-router';
import ProfilePicture from "../../components/profile/ProfilePicture"
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
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
  const [profilePictureID, setProfilePictureID] = useState<string>();
  
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
          setProfilePictureID(user.profilePicture);
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
    const changeProfilePictureID = (newID: string) => {
      setProfilePictureID(newID);
    }

    
    if(user){
      return (
        <View style={styles.container}>
            {profilePictureID && <ProfilePicture profilePictureID={profilePictureID}/>}
            <Text>Email: {user?.email}</Text>
            <Text>Name: {user?.name}</Text>
            <Text>Username: {user?.username}</Text>
            {user?.__id && <ChangeProfilePicture userID={user?.__id} changeProfilePictureID={changeProfilePictureID} />}
            <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      )
    }else{
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    }
    
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
  