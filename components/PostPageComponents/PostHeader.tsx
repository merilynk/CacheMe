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
            <TouchableOpacity style={styles.backArrow}>
                <Ionicons name="arrow-back-outline" size={35} color="black" />
            </TouchableOpacity>
            <View style={styles.profilePic}>
                <Image source={require('../../assets/images/takumi.jpeg')} style={{width: 50, height: 50, borderRadius: 25,}}></Image>
            </View>
            <View style={styles.userName}>
                <RegularText>@username</RegularText>
            </View>
            <View style={styles.time}>
                <RegularText style={{color: "#545350"}}>8 hours ago</RegularText>
            </View>
        </View>
        <View style={styles.image}>
            <Image source={require('../../assets/images/takumi.jpeg')} style={{width: windowWidth*.86, height: windowWidth*.86, borderRadius: 15}}></Image>
            <View style={styles.caption}>
                <SmallText style={{marginTop: 10}}>Caption</SmallText>
            </View>
        </View>
        
        <LinearGradient
            colors={['rgba(44, 218, 157, .45)', 'rgba(4, 67, 137, .45)']}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.9 }}
            style={styles.interactBar}>
            <TouchableOpacity>
                <AntDesign name="heart" size={35} color={'#8E4162'} style={styles.icons}/>
            </TouchableOpacity>
            <RegularText style={{ marginLeft: 5}}>500</RegularText>
            <TouchableOpacity>
                <FontAwesome name="comment" size={35} color="white" style={{marginLeft: 10}}/>
            </TouchableOpacity>
            <RegularText style={{ marginLeft: 5}}>500</RegularText>
            <RegularText style={{ marginLeft: 135, color: "#545350" }}>25 km away</RegularText>
        </LinearGradient>
        
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        border: "flex",
        width: windowWidth,
        marginTop: windowHeight/25,
        justifyContent: "flex-start",
        alignContent: "flex-start",
        flexDirection: "column",
        // backgroundColor: "#EEF2FF"
        
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: windowHeight/15,
    },
    backArrow: {
        //flex: 1,
        width: 50,
        height: 30,
        marginLeft: 8,
    },
    profilePic: {
        flex: 1,
        width: 50,
        height: 50,
        marginLeft: 60,
        position: 'absolute',
    },
    userName: {
        marginLeft: 115,
        position: 'absolute',
        justifyContent: "center",
    },
    time: {
        height: 30,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 25,
    },
    image: {
        width: windowWidth,
        height: windowWidth,
        justifyContent: "center",
        alignItems: "center",
        
    },
    caption: {
        width: windowWidth*.85,
    },
    interactBar: {
        flexDirection: "row",
        width: windowWidth,
        height: 50,
        alignItems: 'center',
    },
    icons: {
        flexDirection: "row",
        paddingLeft: 15,
    }

})

export default PostHeader

