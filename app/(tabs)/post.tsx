import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import {storage } from "../../firebase"
import uuid from 'react-native-uuid';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageResult } from 'expo-image-manipulator';
import BigText from '../../components/Texts/bigText';
import RegularText from '../../components/Texts/regularText';


export default function Post() {
    const [imageURI, setImageURI] = useState("");
    const [image, setImage] = useState<ImageResult>();
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true, // Remove?
        });
    
        if (!result.canceled) {
          setImageURI(result.assets[0].uri);
          setImage(await ImageManipulator.manipulateAsync(result.assets[0].uri, [{resize: {width: 500}}], {compress: 1})) 
        }
      };

    const uploadImage = async () => {
      const imageID = uuid.v1()
      
      if(image){
        const response = await fetch(image.uri);
        const blobFile = await response.blob();
        const imageRef = ref(storage, `images/${imageID}`);
        const result = await uploadBytes(imageRef, blobFile);
        //TODO: add "uploading" icon while it's uploading, then go to diff page or change page when done.
      }     
    }

    return(
        <View style={styles.container}>
          <View style={styles.topRow}>
            <BigText>Create Cache</BigText>
            <TouchableOpacity style={styles.buttons}>
              <RegularText>Post</RegularText>
            </TouchableOpacity>
          </View>
          <View style={styles.postSettings}>
            <TouchableOpacity>
              <RegularText>PFP</RegularText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropDownMenu}>
              <RegularText>Who can see</RegularText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropDownMenu}>
              <RegularText>radius</RegularText>
            </TouchableOpacity>
          </View>

          {imageURI && <Image source={{ uri: imageURI }} style={{ width: 200, height: 200 }} />}
          {image && <Button title="Upload image" onPress={uploadImage} />}
          <Button title="Pick an image from camera roll" onPress={pickImage} />
        </View>
    )
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: windowHeight - windowHeight/10,
    paddingTop: 30,
    borderWidth: 4,
    borderColor: "blue",
  },
  topRow: {
    flexDirection: 'row',
    position: "relative",
    justifyContent: "center",
    borderStyle: 'dotted',
    borderWidth: 4,
    borderColor: "red",
  },
  buttons: {
    right: 1,
    position: "absolute",
    display: 'flex',
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
  },
  postSettings: {
    flexDirection: 'row',
    position: "relative",
    display: 'flex',
    justifyContent: "space-around",
  },
  dropDownMenu: {
    display: "flex",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,

  }

})