import React from 'react'
import ProfileInfo from './ProfileInfor'
import { useWindowDimensions, View, Image, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import RegularText from './Texts/regularText';
import { LinearGradient } from 'expo-linear-gradient';

const PostPreview = () => {
    const {width} = useWindowDimensions()
    return (
        <View style={styles.outerContainer}>
            <ProfileInfo/>
            <View style={styles.postContainer}>
            
            <Image source={{uri: "https://i0.wp.com/yalewanders.com/wp-content/uploads/2020/01/BAA926E3-465D-4A3C-AE4A-B0984239CFB3.jpg?fit=4032%2C3024&ssl=1"}}
            style={{
                width: width - 30, 
                height: width - 30, 
                borderRadius: 15,
                }}
            />
            </View>

            <View style={styles.text}>
                <RegularText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id porttitor libero, dignissim semper quam. Fusce consectetur porta ante vel pretium. Maecenas in quam sed</RegularText>
            </View>

            <View>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(44, 218, 157, .45)', 'rgba(4, 67, 137, .45)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}>
                    <View style={styles.icons}>
                        <AntDesign name="heart" size={35} color="white" />
                        
                        <FontAwesome name="comment" size={35} color="white" style={{marginLeft: 66}}/>
                    </View>
                </LinearGradient>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        transform: [{ scale: 0.97}],
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 0,
        marginVertical: 0,
        margin: 5,
        marginBottom: 0,
        backgroundColor: "white",
        borderRadius: 15,
    },
    postContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        margin: 15,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: "flex-start",
    },
    gradient: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    icons: {
        flexDirection: "row",
        marginHorizontal: 20,
    }
    
})

export default PostPreview

