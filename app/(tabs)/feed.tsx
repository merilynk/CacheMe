// React Modules
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList, Alert, ListRenderItemInfo } from "react-native"
import { LayoutAnimation, RefreshControl } from 'react-native';

// Components
import PostPreview from '../../components/Post'
import Header from '../../components/Header'

// Firebase
import { auth, db, storage } from '../../firebase';
import { GeoPoint, Timestamp, collection, getDocs, orderBy, query } from 'firebase/firestore';


// Set the default number of posts to load for each pagiation
const PAGE_SIZE = 20;

const cache = {
    __id: "",
    __imageId: "",
    __userId: "",
    _createdAt: new Timestamp(0, 0),
    caption: "",
    location: new GeoPoint(0, 0),
    numComments: 0,
    numLikes: 0,
    reported: false
}

type CacheData = {
    __id: string; 
    __imageId: string; 
    __userId: string; 
    _createdAt: Timestamp; 
    caption: string; 
    location: GeoPoint; 
    numComments: number; 
    numLikes: number; 
    reported: boolean;
}

const Feed = () => {
    const [postsToRender, setPostsToRender] = useState([cache]);
    const [loading, setLoading] = useState(true);
    
    const fetchPosts = async () => {
        const postsList:CacheData[] = [];
        const cacheRef = collection(db, "cache");
        const q = query(cacheRef, orderBy('_createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((cache) => {
            const {
                __id,
                __imageId,
                __userId,
                _createdAt,
                caption,
                location,
                numComments,
                numLikes,
                reported
            } = cache.data();
            // console.log("DB DATA: ")
            // console.log(cache.data())
            postsList.push({
                __id,
                __imageId,
                __userId,
                _createdAt,
                caption,
                location,
                numComments,
                numLikes,
                reported
            });
            // console.log("GOT: ")
            // console.log({
            //     __id,
            //     __imageId,
            //     __userId,
            //     _createdAt,
            //     caption,
            //     location,
            //     numComments,
            //     numLikes,
            //     reported
            // });
        });

        setPostsToRender(postsList);

        if (loading) {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchPosts();
    })

    return(
        <SafeAreaView>
            {loading ? (
                <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
                    <Header/>
                    <PostPreview id={""} captionText={"hello"} 
                        uid={"mgEEj5Bn8PKhEtj2X6dl"} 
                        image={"4d6de4a1-ee2d-11ed-8ee9-63af3c88610d"}
                        numComments={200}
                        numLikes={400}
                        location={new GeoPoint(-78.3, 105.6)}
                        timePosted={new Timestamp(800, 894023)}/>
                </ScrollView>
            ) : (
                <>
                    <Header />
                    <FlatList data={postsToRender} 
                        keyExtractor={(c) => c.__id} 
                        renderItem={({ item }) => {
                            return (
                                <PostPreview id={item.__id}
                                    captionText={item.caption} 
                                    uid={item.__userId} 
                                    image={item.__imageId} 
                                    numComments={item.numComments} 
                                    numLikes={item.numLikes} 
                                    location={item.location} 
                                    timePosted={item._createdAt} />
                            );
                        }} 
                        showsVerticalScrollIndicator={false}/>
                </>
                    
            )}
            
        </SafeAreaView>
    );
};

export default Feed;

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        margin: 0,
        backgroundColor: "#EEF2FF",
    },
})

