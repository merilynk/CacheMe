import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { auth, db } from '../../firebase'
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
  friends: [];
}



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

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <Image source={require('../../assets/images/takumi.jpeg')} style={{width: 100, height: 100, borderRadius: 50,}}></Image>
          <Text>FirstName Lastname</Text>
          <Text>@username</Text>
          <View style={styles.profileData}>
            <View style={styles.data}>
              <Text>500</Text>
              <Text>Friends</Text>
            </View>
            <View style={styles.data}>
              <Text>6</Text>
              <Text>Posts</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.friendButton}><Text>Friend</Text></TouchableOpacity>
        </View>
      </View>
        // <View style={styles.container}>
        //     <Text>Email: {auth.currentUser?.email}</Text>
        //   <TouchableOpacity
        //     onPress={handleSignOut}
        //     style={styles.button}
        //   >
        //     <Text style={styles.buttonText}>Sign out</Text>
        //   </TouchableOpacity>
        // </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection: 'column',
      alignItems: 'center',
      flexWrap: 'wrap',
      borderColor: 'green',
      borderWidth: 1,
    },
    header: {
      // flex: 1,
      width: "100%",
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
      borderColor: 'blue',
      borderWidth: 1,
    },
    profileContainer: {
      // flex: 5,
      width: '100%',
      height: 263,
      alignContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      borderColor: 'red',
      borderWidth: 1,
    },
    profileData: {
      flex: 1,
      width: 164,
      height: 41,
      marginTop: 11,
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderColor: 'pink',
      borderWidth: 1,
    },
    data: {
      flexDirection: 'column',
      justifyContent: 'center',
      borderColor: 'purple',
      borderWidth: 1,
    },
    friendButton: {
      width: 82,
      height: 25,
      marginTop: 10,
      borderColor: 'cyan',
      borderWidth: 1,
    }
    //  button: {
    //   backgroundColor: '#0782F9',
    //   width: '60%',
    //   padding: 15,
    //   borderRadius: 10,
    //   alignItems: 'center',
    //   marginTop: 40,
    // },
    // buttonText: {
    //   color: 'white',
    //   fontWeight: '700',
    //   fontSize: 16,
    // },
  })
  