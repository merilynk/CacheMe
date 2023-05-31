import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageResult } from 'expo-image-manipulator';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import RegularText from '../Texts/regularText';
import { auth, db, storage } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import uuid from 'react-native-uuid';

type ChangeProfilePictureProps = {
  userID: string;
  changeProfilePictureID: (id: string) => void;

}

export default function ChangeProfilePicture(props: ChangeProfilePictureProps) {
const uploadImage = async (image: { uri: any; width?: number; height?: number; base64?: string | undefined; }) => { 
  if(image){
    
    const imageID = uuid.v1().toString();
    const response = await fetch(image.uri);
    const blobFile = await response.blob();
    const imageRef = ref(storage, `profile/${imageID}`);
    await updateDoc(doc(db, "user", props.userID), {profilePicture: imageID,});
    await uploadBytes(imageRef, blobFile).then(() =>{
      props.changeProfilePictureID(imageID);
      // Delete old profile picture from storage
  });
  }
}
const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true, // Remove?
      });
      
      if (!result.canceled) {
        await ImageManipulator.manipulateAsync(
          result.assets[0].uri, [{resize: {width: 500}}], {compress: 1}).then((image) => {
          uploadImage(image);
        })
      }
    };

    return (
        <TouchableOpacity
        onPress={pickImage}
        style={styles.button}>
            <RegularText style={styles.buttonText}>Change Profile Picture</RegularText>
        </TouchableOpacity>
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