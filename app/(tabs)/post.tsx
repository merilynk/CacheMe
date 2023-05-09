import React, { useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from "firebase/storage"
import {storage, db } from "../../firebase"
import uuid from 'react-native-uuid';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageResult } from 'expo-image-manipulator';
import BigText from '../../components/Texts/bigText';
import RegularText from '../../components/Texts/regularText';
import SmallText from '../../components/Texts/smallText';
import { collection, addDoc } from "firebase/firestore";
import SelectPrivacyScreen from '../../components/dropDownPrivacy';
import SelectRadiusScreen from '../../components/dropDownRadius';
import { FontAwesome } from '@expo/vector-icons'; 


const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height


export default function Post() {
    const [imageURI, setImageURI] = useState("");
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<ImageResult>();
    // TODO: below works, need to figure out how to get cache ID on return, and fix other fields to be correct.
    // TODO: implement posting entire cache instead of "Upload photo" button
    
    // const [caption, setCaption] = useState("");
    // const addCache = async () => {
    //   try {
    //     const docRef = await addDoc(collection(db, "cache"), {
    //       imageId: "Test Image ID",
    //       userId: "Test User ID",
    //       caption: "Test Caption",
    //       location: [0.001, 0.001],
    //       numComments: "69",
    //       numLikes: 420,
    //       reported: false
    //     });
      
    //     console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    // }

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
      const imageID = uuid.v1() // TODO: replace this with the post ID
      
      if(image){
        const response = await fetch(image.uri);
        const blobFile = await response.blob();
        const imageRef = ref(storage, `images/${imageID}`);
        const result = await uploadBytes(imageRef, blobFile);
        if(result){
          Alert.alert("Upload successful")
        }
        //TODO: add "uploading" icon while it's uploading, then go to diff page or change page when done.
      }     
    }

    const [text, setText] = useState('');


    return(
        <View style={styles.container}>
          <View style={styles.topRow}>
            <BigText>Create Cache</BigText>
            <TouchableOpacity style={styles.postButton} onPress={uploadImage}>
              <RegularText>Post</RegularText>
            </TouchableOpacity>
          </View>

          <View style={styles.postSettings}>
            <TouchableOpacity>
              <RegularText>PFP</RegularText>
            </TouchableOpacity>
            
            <View style={styles.dropDownMenu}>
              <SmallText>Who can see it?</SmallText>
              <SelectPrivacyScreen></SelectPrivacyScreen>
            </View>

            <View style={styles.dropDownMenu}>
              <SmallText>Post Discovery Radius:</SmallText>
              <SelectRadiusScreen></SelectRadiusScreen>
            </View>
          </View>
          <View>
            <TextInput 
              style={styles.textInput} 
              placeholder="What's your story?" 
              onChangeText={newText => setText(newText)}
              defaultValue={text}
              placeholderTextColor="#B3B3B3"
              />
            
            {imageURI && <Image source={{ uri: imageURI }} style={styles.image} />}
          </View>
        
          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={pickImage}>
              <FontAwesome name="picture-o" size={24} color="black"  />
            </TouchableOpacity>
          </View>
        </View>
    )
}



const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: windowHeight - windowHeight/13,
    paddingTop: windowHeight/20,
    backgroundColor: "#EEF2FF",
  },
  topRow: {
    flexDirection: 'row',
    position: "relative",
    justifyContent: "center",
  },
  bottomRow: { 
    position: "relative",
    paddingHorizontal: windowWidth/15 ,
    paddingBottom: 25,
    marginTop: "auto",
    
  },
  postButton: {
    right: 1,
    position: "absolute",
    display: 'flex',
    backgroundColor: "white",
    padding: 5,
    marginRight: windowWidth/25, 
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
    padding: 5,
    borderRadius: 10,
  },
  image: {
    flexDirection: 'row',
    position: "relative",
    width: windowWidth-75,
    height: windowWidth-75,
    alignSelf: "center",
    borderRadius: 10,
  },
  textInput:{
    height: 40,
    paddingLeft: windowWidth/12,
  }

})