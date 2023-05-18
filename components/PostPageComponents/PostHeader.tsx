import React from 'react'
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import RegularText from "../Texts/regularText"
import SmallText from "../Texts/smallText"

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

const PostHeader = () => {
   return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <View style={styles.backArrow}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </View>
            <View style={styles.profilePic}>
                <Image source={require('../../assets/images/takumi.jpeg')} style={{width: 50, height: 50, borderRadius: 10}}></Image>
            </View>
            <View style={styles.userName}>
                <RegularText>@username</RegularText>
            </View>
            <View style={styles.time}>
                <RegularText>time</RegularText>
            </View>
        </View>
        <View style={styles.image}>
            <Image source={require('../../assets/images/takumi.jpeg')} style={{width: 361, height: 361, borderRadius: 10}}></Image>
        </View>
        <View style={styles.caption}>
            <SmallText>Caption</SmallText>
        </View>
        <LinearGradient
            colors={['rgba(44, 218, 157, .45)', 'rgba(4, 67, 137, .45)']}
            start={{ x: 0.2, y: 0.2 }}
            end={{ x: 0.8, y: 0.8 }}
            style={styles.interactBar}>
            <TouchableOpacity>
                <AntDesign name="heart" size={35} color={'#8E4162'} style={styles.icons}/>
            </TouchableOpacity>
            <RegularText style={{ marginLeft: 5}}>500</RegularText>
            <TouchableOpacity>
                <FontAwesome name="comment" size={35} color="white" style={styles.icons}/>
            </TouchableOpacity>
            <RegularText style={{ marginLeft: 5}}>500</RegularText>
        </LinearGradient>
        
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        border: "flex",
        width: windowWidth,
        height: windowHeight,
        marginVertical: windowHeight/25,
        justifyContent: "flex-start",
        alignContent: "flex-start",
        flexDirection: "column",
        // alignItems: 'center',
        // borderColor: "red",
        borderWidth: 3,
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "gray",
        borderWidth: 2,
        height: windowHeight/15,
    },
    backArrow: {
        //flex: 1,
        width: 50,
        height: 30,
        marginLeft: 8,
        borderLeftWidth: 0,
        borderColor: "blue",
        borderWidth: 3,
    },
    profilePic: {
        flex: 1,
        width: 50,
        height: 50,
        marginLeft: 65,
        borderLeftWidth: 0,
        position: 'absolute',
    },
    userName: {
        marginLeft: 115,
        position: 'absolute',
        justifyContent: "center",
        borderColor: "red",
        borderWidth: 3,
    },
    time: {
        height: 30,
        borderColor: "red",
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    image: {
        width: windowWidth,
        height: windowWidth,
        borderColor: "red",
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        
    },
    caption: {
        //flex: 1,
        width: windowWidth,
        height: windowHeight/10,
        borderColor: "red",
        borderWidth: 3,
    },
    interactBar: {
        flexDirection: "row",
        width: windowWidth,
        height: 50,
        // justifyContent: 'space-between',
        alignItems: 'center',
    },
    icons: {
        flexDirection: "row",
        paddingLeft: 25,
    }

})

export default PostHeader
