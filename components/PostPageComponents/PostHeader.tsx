import React from 'react'
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import RegularText from "../Texts/regularText"
import SmallText from "../Texts/smallText"
import { GeoPoint } from 'firebase/firestore';

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

type CacheData = {
    id: string, 
    userId: string, 
    username: string,
    imageRef: string, 
    caption: string, 
    distBtwn: number, 
    timePosted: string, 
    location: GeoPoint | null, 
    nLikes: number,
    nComments: number,
  }

const PostHeader = (props: CacheData) => {
    const router = useRouter();

   return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TouchableOpacity style={styles.backArrow} onPress={router.back}>
                <Ionicons name="arrow-back-outline" size={35} color="black" />
            </TouchableOpacity>
            <View style={styles.profilePic}>
                <Image source={require('../../assets/images/takumi.jpeg')} style={{width: 50, height: 50, borderRadius: 25,}}></Image>
            </View>
            <View style={styles.userName}>
                <RegularText>{ props.username }</RegularText>
            </View>
            <View style={styles.time}>
                <RegularText style={{color: "#545350"}}>{ props.timePosted }</RegularText>
            </View>
        </View>
        <View style={styles.postBody}>
            {props.imageRef == null || props.imageRef == "" ? (
                <></>
            ) : (
                <View style={styles.image}> 
                    <Image source={{uri: props.imageRef}}
                    style={{
                            width: windowWidth*.86, 
                            height: windowWidth*.86, 
                            borderRadius: 15
                        }}
                    />
                </View> 
            )}
            <View style={styles.caption}>
                <SmallText style={{marginTop: 10}}>{ props.caption }</SmallText>
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
            <RegularText style={{ marginLeft: 5}}>{ props.nLikes }</RegularText>
            <TouchableOpacity>
                <FontAwesome name="comment" size={35} color="white" style={{marginLeft: 10}}/>
            </TouchableOpacity>
            <RegularText style={{ marginLeft: 5}}>{ props.nComments }</RegularText>
            <RegularText style={{ marginLeft: 165, color: "#545350" }}>{ props.distBtwn } km away</RegularText>
            <TouchableOpacity>
                <Ionicons name="location-sharp" size={35} color="white" />
            </TouchableOpacity>
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
    postBody: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
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
        // height: windowWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    caption: {
        width: windowWidth*.85,
        justifyContent: 'flex-start'
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

