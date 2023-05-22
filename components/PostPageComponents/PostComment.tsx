import { VoiceID } from 'aws-sdk';
import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import RegularText from "../Texts/regularText"
import MiniText from '../Texts/miniText';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const PostComment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Image source={require('../../assets/images/takumi.jpeg')} style={{width: 30, height: 30, borderRadius: 15}}></Image>
        </View>
        <View style={styles.userName}>
          <RegularText>Username</RegularText>
        </View>
        <View>
          <RegularText style={styles.time}>5 hours ago</RegularText>
        </View>
      </View>
      <View style={styles.midderBar}>
        <RegularText style={{fontSize: 15}}>This is a really long comment just to see if it overflows over the right or goes down to the bottom</RegularText>
      </View>
      
      <TouchableOpacity style={styles.bottomBar}>
        <RegularText style={{fontSize: 13, marginTop: 10,}}>Reply</RegularText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    marginVertical: 10,
    flexDirection: "column",
  },
  topBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
  },
  userName:{
    flex: 1,
    position: "absolute",
    marginLeft: 45,
  },
  time:{
    flex: 1,
    fontSize: 13,
    color: "#545350",
    paddingRight: 10,
  },
  midderBar: {
    flex: 1,
    paddingLeft: 45,
  },
  bottomBar: {
    paddingLeft: 45,
  }
});

export default PostComment;