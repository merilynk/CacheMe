import React, {useState, useEffect} from 'react'
import { useWindowDimensions, View, Image, StyleSheet, TouchableOpacity, Text, ImageBackground} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import RegularText from './Texts/regularText';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { distanceBetween } from 'geofire-common';
import getLocation from '../helpers/location';
import Location from 'expo-location';
import {BlurView } from 'expo-blur';
import { Link, useNavigation, useLocalSearchParams, useRouter } from 'expo-router';

import { collection, addDoc, setDoc, doc, getDoc, updateDoc, GeoPoint, Timestamp, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth, storage } from '../firebase';;
import { getDownloadURL, ref } from "firebase/storage";

type CacheData = {
    id: string,
    captionText: string,
    uid: string, 
    image: string,
    numComments: number,
    numLikes: number,
    location: GeoPoint,
    timePosted: Timestamp,
    likeIDs: string[],
}

const PostPreview = (props: CacheData) => {

    const {width} = useWindowDimensions()
    const [isLiked, setIsLiked] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const [likeCount, setLikeCount] = useState(props.numLikes);
    const [commentCount, setCommentCount] = useState(props.numComments);
    const [poster, setPoster] = useState("");
    const [distBetween, setDistBetween] = useState(0);
    const [imageURI, setImageURI] = useState<string>();
    const [outOfRadius, setOutOfRadius] = useState(false);


    const router = useRouter();
    const params = useLocalSearchParams();
    const uid: string = auth.currentUser!.uid;

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
        if (props.image != "" && props.image != null) {
            const gsRef = ref(storage, "images/" + props.image);
            getDownloadURL(gsRef).then( (url) => {
                setImageURI(url);
                console.log(url);
            });
        } else{
            setImageURI("");
        } 
    }

    useEffect( () => {
        getPoster();
        getImage();
        checkForID(uid);
        (async () => {
            const loc = await getLocation();
            let currUserLat = loc?.coords.latitude as number;
            let currUserLong = loc?.coords.longitude as number;
            let postLat = props.location.latitude;
            let postLong = props.location.longitude;
            const distInBtwn = distanceBetween([currUserLat, currUserLong], [postLat, postLong]);
            setDistBetween(Math.round(distInBtwn));
            console.log("Distance between user and post (km): " + distInBtwn);
            if (distInBtwn > 5) {
                console.log("Too far => Blur");
                setOutOfRadius(true);
            } else {
                setOutOfRadius(false);
            }
        })();
        
    }, []);

    const toggleLike = async () => {
        const cacheRef = doc(db, "cache", props.id);
        if (isLiked) {
            setLikeCount(likeCount - 1)
            await updateDoc(cacheRef, {
                numLikes: increment(-1),
                likeIDs: arrayRemove(auth.currentUser?.uid),
            });
        } else {
            setLikeCount(likeCount + 1)
            await updateDoc(cacheRef, {
                numLikes: increment(1),
                likeIDs: arrayUnion(auth.currentUser?.uid),
            });
        
        };
        setIsLiked(!isLiked);
    };

    const viewPost = () => {
        const { postId = props.id } = params;
        router.push({ pathname: '/postPageEX', params: { postId }}); // userId, username, imageRef, caption, distBtwn, timePosted, location, nLikes, liked, nComments}
    }

    const checkForID = (stringToCheck: string) => {
        props.likeIDs.forEach((ID) => {
            if (ID === stringToCheck) {
                console.log("Matched ID: " + ID);
                setIsLiked(!isLiked);
            }
        });
    };


    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
             <View style={styles.profileContainer}>
                <Image source = {require("../assets/images/takumi.jpeg")} style={styles.profileImage}/>
                <View style={styles.profileContainer}>
                    <RegularText style={styles.name} >{ poster }</RegularText>
                </View>
             </View>
             <Text style={styles.postTime}>{ moment(props.timePosted.toDate()).fromNow() }</Text>
            </View>
            {(props.image == null || props.image == "") ? (
                <></>
            ) : (<View style={styles.postContainer }> 
                    <Image source={{uri: imageURI}}
                    blurRadius={outOfRadius ? 20 : 0}
                    style={{
                        width: width - 30, 
                        height: width - 30, 
                        borderRadius: 15,
                        }}
                    />
                </View> 
            )}
            <View style={{paddingBottom: 5}} >
                <RegularText style={outOfRadius ? styles.blurredText : styles.text}>{props.captionText}</RegularText>
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

                        <TouchableOpacity onPress={viewPost}>
                            <FontAwesome name="comment" size={35} color="white" style={{marginLeft: 5}}/>
                        </TouchableOpacity>
                        <RegularText style={{ marginLeft: 5}}>{commentCount}</RegularText>
                    </View>
                    <View style={styles.icons}>
                        <RegularText>{distBetween} km away</RegularText>
                        <TouchableOpacity onPress={() => {
                            const {latitude = props.location.latitude, longitude = props.location.longitude} = params;
                            router.push({pathname: "/map", params: {latitude, longitude}});
                        }}>
                            <Ionicons name="location-sharp" size={35} color="white" />
                        </TouchableOpacity>
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
        justifyContent: "space-between",
        alignItems: "center"
    }, 
    text: {
        paddingTop: 10,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: "flex-start",
    },
    blurredText: {
        margin: 15,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: "flex-start",
        height: 3,
        width: 70,
        shadowOpacity: 1,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 0.5,
        borderColor: "white",
        backgroundColor: "rgba(255, 255, 255, 1)"
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

