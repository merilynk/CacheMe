import React, {useState} from 'react'
import ProfileInfo from './ProfileInfor'
import { useWindowDimensions, View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import RegularText from './Texts/regularText';
import BigText from './Texts/bigText';
import { LinearGradient } from 'expo-linear-gradient';



const PostPreview = () => {
    const {width} = useWindowDimensions()
    const [isLiked, setIsLiked] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    
    const toggleLike = () => {
        if (isLiked) {
            setLikeCount(likeCount - 1)
        } else {
            setLikeCount(likeCount + 1)
        }
        setIsLiked(!isLiked);
    };
    const toggleComment = () => {
        if (isComment) {
            setCommentCount(commentCount - 1)
        } else {
            setCommentCount(commentCount + 1)
        }
        setIsComment(!isComment);
    };
    

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
                        <TouchableOpacity onPress={toggleLike}>
                            <AntDesign name="heart" size={35} color={isLiked ? '#FF6E6E' : '#FFFFFF'}/>
                        </TouchableOpacity>
                        <BigText style={{ marginLeft: 22}}>{likeCount}</BigText>

                        <TouchableOpacity onPress={toggleComment}>
                            <FontAwesome name="comment" size={35} color="white" style={{marginLeft: 66}}/>
                        </TouchableOpacity>
                        <BigText style={{ marginLeft: 22}}>{commentCount}</BigText>
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
    },
    
})


export default PostPreview

