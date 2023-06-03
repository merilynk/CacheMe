import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ActivityIndicator } from 'react-native'
import { auth, db, storage } from '../firebase'
import { useRouter, useSearchParams } from 'expo-router';
import ProfilePicture from "../components/profile/ProfilePicture"
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import ChangeProfilePicture from '../components/profile/ChangeProfilePicture';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// THIS CODE IS JUST COPIED FROM ./(tabs)/profile.tsx BUT STILL NEEDS CHANGING SO IT WORKS AS "VIEWING THE PROFILE OF OTHERS"

type UserData = {
    __id: string;
    email: string;
    name: string;
    profilePicture: string;
    username: string;
    friends: [];
}

const ViewProfile = () => {

    const { userId } = useSearchParams();
    const uid = userId as string;
    
    const [user, setUser] =  useState<UserData>();
    const [profilePictureID, setProfilePictureID] = useState<string>();
    const router = useRouter();


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
        fetchUser(uid);  // grab uid of the user whose profile is being viewed and use it here
    }) 

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backArrow} onPress={router.back}>
              <Ionicons name="arrow-back-outline" size={35} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileContainer}>
            {profilePictureID && <ProfilePicture profilePictureID={profilePictureID}/>}
            <Text style={styles.nameText}>{user?.name}</Text>
            <Text>@{user?.username}</Text>
            <View style={styles.profileData}>
              <View style={styles.data}>
                <Text style={styles.number}>500</Text>
                <Text>Friends</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.number}>{user?.friends.length}</Text>
                <Text>Posts</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.friendButton}>
              <FontAwesome name="user-plus" size={15} style={{paddingRight: 5}}color="black" />
              <Text style={{fontWeight: "500"}}>Friend</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.friendButton}>
              <FontAwesome name="check" size={15} style={{paddingRight: 5}}color="black" /> 
              <Text style={{fontWeight: "500"}}>Added</Text>
            </TouchableOpacity> */}
          </View>
        </View>
    )

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
      justifyContent: 'space-between',
      marginTop: 30,
    },
    backArrow: {
      //flex: 1,
      width: 50,
      height: 30,
      marginLeft: 10,
      marginTop: 5,
    },
    profileContainer: {
      // flex: 5,
      width: '100%',
      height: 263,
      alignItems: 'center',
      flexWrap: 'wrap',
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
      width: 90,
      height: 30,
      marginTop: 10,
      flexDirection: "row",
      alignItems: 'center',
      textSize: 12,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 10,
      marginRight: 10,
    },
  })

export default ViewProfile