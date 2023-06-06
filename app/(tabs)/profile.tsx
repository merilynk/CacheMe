import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ActivityIndicator } from 'react-native'
import { auth, db, storage } from '../../firebase'
import { useRouter } from 'expo-router';
import UserFeed  from "../../components/UserFeed"
import ProfilePicture from "../../components/profile/ProfilePicture"
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import ChangeProfilePicture from '../../components/profile/ChangeProfilePicture';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

type UserData = {
  __id: string;
  email: string;
  name: string;
  profilePicture: string;
  username: string;
  friends: [];
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
            username: "",
            friends: []
        }
        const userDoc = await getDoc(doc(db, "user", id));
        if (userDoc.exists()) {
          user.__id = userDoc.data().__id;
          user.email = userDoc.data().email;
          user.name = userDoc.data().name;
          user.profilePicture = userDoc.data().profilePicture;
          user.username = userDoc.data().username;
          user.friends = userDoc.data().friends;
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

    if (user) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.signoutButton} onPress={handleSignOut}>
              <FontAwesome name="sign-out" size={30} style={{paddingRight: 10}}color="black" /> 
            </TouchableOpacity>
          </View>
          <View style={styles.profileContainer}>
            {profilePictureID && <ProfilePicture profilePictureID={profilePictureID}/>}
            <Text style={styles.nameText}>{user?.name}</Text>
            <Text>@{user?.username}</Text>
            <View style={styles.profileData}>
              <View style={styles.data}>
                <Text style={styles.number}>{user?.friends.length}</Text>
                <Text>Friends</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.number}>6</Text>
                <Text>Posts</Text>
              </View>
            </View>
            {user?.__id && <ChangeProfilePicture userID={user?.__id} changeProfilePictureID={changeProfilePictureID} />}
        </View>
        {/* Feed starts here */}
        <UserFeed />
      </View>
    );
    }else{
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection: 'column',
      alignItems: 'center',
      flexWrap: 'wrap',
      backgroundColor: '#EEF2FF',
    },
    header: {
      // flex: 1,
      width: "100%",
      height: 50,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 30,
      backgroundColor: '#EEF2FF',
    },
    profileContainer: {
      // flex: 5,
      width: '100%',
      height: 263,
      alignItems: 'center',
      flexWrap: 'wrap',
      backgroundColor: '#EEF2FF',
    },
    nameText: {
      fontSize: 20,
      fontWeight: "500",
    },
    profileData: {
      flex: 1,
      width: 164,
      height: 41,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    number: {
      fontSize: 18,
      fontWeight: "500",
    },
    data: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    friendButton: {
      width: 90,
      height: 30,
      flexDirection: "row",
      alignItems: 'center',
      textSize: 12,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 10,
    },
    signoutButton: {
      width: 30,
      height: 30,
      marginTop: 10,
      marginRight: 15,
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
  })
  