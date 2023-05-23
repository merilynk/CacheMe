import React, {useState, useEffect} from 'react'
//import ProfileInfo from './ProfileInfor'
import { useWindowDimensions, View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import RegularText from './Texts/regularText';
import BigText from './Texts/bigText';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { distanceBetween } from 'geofire-common';
import getLocation from '../helpers/location';
import Location from 'expo-location';
import { Link, useRouter } from 'expo-router';

import { collection, addDoc, setDoc, doc, getDoc, updateDoc, GeoPoint, Timestamp } from "firebase/firestore";
import { db, auth, storage } from '../firebase';;
import { getDownloadURL, ref } from "firebase/storage";

type PostProps = {
    id: string,
    captionText: string,
    uid: string, 
    image: string,
    numComments: number,
    numLikes: number,
    location: GeoPoint,
    timePosted: Timestamp,
}
const PostPreview = (props: PostProps) => {

    const {width} = useWindowDimensions()
    const [isLiked, setIsLiked] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const [likeCount, setLikeCount] = useState(props.numLikes);
    const [commentCount, setCommentCount] = useState(props.numComments);
    const [poster, setPoster] = useState("");
    const [currUserLoc, setCurrUserLoc] = useState<Location.LocationObject | null >();
    const [distBetween, setDistBetween] = useState(0);
    const [imageURI, setImageURI] = useState<string>();
    const router = useRouter();

    const getPoster = async () => {
        const docSnap = await getDoc(doc(db, "user", props.uid));
        if (docSnap.exists()) {
            setPoster(docSnap.data().username)
            return docSnap.data().username;
        }
        else {
            setPoster("InvalidUser");
            return "InvalidUser";
        }
    }

    const getImage = async () => {
        if (props.image != "" || props.image != null) {
            const gsRef = ref(storage, "images/" + props.image);
            getDownloadURL(gsRef).then( (url) => {
                setImageURI(url);
            });
            console.log("Theres's an image.")
        }   
    }

    useEffect( () => {
        getPoster();
        getImage();
        (async () => {
            const loc = await getLocation();
            setCurrUserLoc(loc);
            let currUserLat = loc?.coords.latitude as number;
            let currUserLong = loc?.coords.longitude as number;
            console.log("Current User: [" + currUserLat + ", " + currUserLong + "]");
            let postLat = props.location.latitude;
            let postLong = props.location.longitude;
            console.log("Post: [" + postLat + ", " + postLong + "]");
            const distInBtwn = distanceBetween([currUserLat, currUserLong], [postLat, postLong]);
            setDistBetween(Math.round(distInBtwn));
            console.log("Distance Between: " + distInBtwn);
            console.log(distBetween);
            console.log(props.timePosted.toDate());
            console.log(moment(props.timePosted.toDate()).fromNow());
        })();
    }, []);

    const toggleLike = async () => {
        if (isLiked) {
            setLikeCount(likeCount - 1)
        } else {
            setLikeCount(likeCount + 1)
        }
        const cacheRef = doc(db, "cache", props.id);
        await updateDoc(cacheRef, {numLikes: likeCount});
        setIsLiked(!isLiked);
    };
    
    const toggleComment = async () => {
        const cacheRef = doc(db, "cache", props.id);
        if (isComment) {
            setCommentCount(commentCount - 1)
        } else {
            setCommentCount(commentCount + 1)
        }
        await updateDoc(cacheRef, {numComments: commentCount});
        setIsComment(!isComment);
        // viewPost();
    };

    const locatePost = () => {
        console.log("Post is located at " + props.location);
    }

    /** Allows the user to view a page only with the post and its comments. */
    const viewPost = () => {
        console.log("View Post");
        // router.push("/app/postPageEx");
        // console.log(router.push);
    }

    return (
        <TouchableOpacity onPress={viewPost} style={styles.outerContainer}>
            <View style={styles.container}>
             <View style={styles.profileContainer}>
                <Image source = {require("../assets/images/takumi.jpeg")} style={styles.profileImage}/>
                <View style={styles.profileContainer}>
                    <RegularText style={styles.name} >{ poster }</RegularText>
                </View>
             </View>
             <Text style={styles.postTime}>{ moment(props.timePosted.toDate()).fromNow() }</Text>
            </View>
            <View style={styles.container}>
            <Link href={"../../postPageEX"}>
            {props.image == null || props.image == "" ? (
                <></>
            ) : (
                <View style={styles.postContainer}> 
                    <Image source={{uri: imageURI}}
                    style={{
                        width: width - 30, 
                        height: width - 30, 
                        borderRadius: 15,
                        }}
                    />
                </View> 
            )}
            <View style={styles.text}>
                <RegularText>{props.captionText}</RegularText>
            </View>
            </Link>
            </View>
            <View>
                <LinearGradient
                    colors={['rgba(44, 218, 157, .45)', 'rgba(4, 67, 137, .45)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}>
                    <View style={styles.icons}>
                        <TouchableOpacity onPress={toggleLike}>
                            <AntDesign name="heart" size={35} color={isLiked ? '#8E4162' : '#FFFFFF'}/>
                        </TouchableOpacity>
                        <RegularText style={{ marginLeft: 5}}>{likeCount}</RegularText>
        
                        <TouchableOpacity onPress={toggleComment}>
                            <FontAwesome name="comment" size={35} color="white" style={{marginLeft: 5}}/>
                        </TouchableOpacity>
                        <RegularText style={{ marginLeft: 5}}>{commentCount}</RegularText>
                    </View>
                    <View style={styles.icons}>
                        <RegularText>{distBetween} km away</RegularText>
                        <TouchableOpacity onPress={locatePost}>
                            <Ionicons name="location-sharp" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity>
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
        justifyContent: "space-between",
        alignItems: "center"
    }, 
    text: {
        // marginTop: 15,
        paddingTop: 10,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icons: {
        flexDirection: "row",
        marginHorizontal: 20,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontWeight: "700",
        fontSize: 16,
    },
    postTime: {
        fontSize: 14,
        fontWeight: "500",
    },
    location: {
        fontSize: 14,
        fontWeight: "500",
    }
})


export default PostPreview

