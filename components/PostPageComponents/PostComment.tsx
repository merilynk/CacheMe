import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity, TextInput, ScrollView, FlatList, SafeAreaView } from 'react-native';
import RegularText from "../Texts/regularText"
import MiniText from '../Texts/miniText';
import { Timestamp, collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { getCacheData, getDistanceBetween, getImage, getPoster, getTimeDifference } from '../PostData';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

type CacheData = {
__id: string;
__userId: string;
username: string;
comments: never[];
numComments: number;
}

type CommentData = {
__id: string;
__userId: string;
username: string;
replies: never[];
text: string;
timePosted: string;
}

const comment = {
__id: "",
__userId: "",
username: "",
replies: [],
text: "",
timePosted: "",
}

const PostComment = (props: CommentData) => {

return (
<SafeAreaView>
<View style={styles.container}>
<View style={styles.topBar}>
<View>
<Image source={require('../../assets/images/takumi.jpeg')} style={{ width: 30, height: 30, borderRadius: 15 }}></Image>
</View>
<View style={styles.userName}>
<RegularText>{ props.username }</RegularText>
</View>
<View>
<RegularText style={styles.time}>{ props.timePosted }</RegularText>
</View>
</View>
<View style={styles.midderBar}>
<RegularText style={{ fontSize: 15 }}>{ props.text }</RegularText>
</View>
</View>
</SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    flexDirection: "column",
  },
  topBar: {
    outline: '#FF5733',
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
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 45,
    paddingTop: 10,
  },
  replyInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  replyButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  replyButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  postedReplyContainer: {
    paddingHorizontal: 45,
    marginTop: 10,
  },
  postedReplyText: {
    fontSize: 15,
  },
});

export default PostComment;