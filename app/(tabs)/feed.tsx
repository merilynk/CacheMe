// React Modules
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList, Alert } from "react-native"
import { LayoutAnimation, RefreshControl } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// Components
import PostPreview from '../../components/Post'
import Header from '../../components/Header'

// Firebase
import { auth, db, storage } from '../../firebase';
import { GeoPoint, Timestamp } from 'firebase/firestore';


// Set the default number of posts to load for each pagiation
const PAGE_SIZE = 20;

const Feed = () => {
    return(
        <SafeAreaView>
            <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
                <Header/>
                <PostPreview captionText={"hello"} 
                    uid={"mgEEj5Bn8PKhEtj2X6dl"} 
                    image={"https://i0.wp.com/yalewanders.com/wp-content/uploads/2020/01/BAA926E3-465D-4A3C-AE4A-B0984239CFB3.jpg?fit=4032%2C3024&ssl=1"}
                    numComments={200}
                    numLikes={400}
                    location={new GeoPoint(36.99, 122.05)}
                    timePosted={new Timestamp(800, 894023)}/>
            </ScrollView>
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

