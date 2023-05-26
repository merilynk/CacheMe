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
backgroundColor: '#F2F2F2',
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
});

export default PostComment;