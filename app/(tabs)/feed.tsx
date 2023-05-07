// Built in modules
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native"
import { LayoutAnimation, RefreshControl } from 'react-native';

// Components
import PostPreview from '../../components/Post'
import Header from '../../components/Header'

// Firebase
import { auth, db } from '../../firebase';
import { GeoPoint, Timestamp } from 'firebase/firestore';


// Set the default number of posts to load for each pagiation
const PAGE_SIZE = 20;

export default class Feed extends Component {
    state = {
        loading: false,
        posts: [],
        data: {},
    };


    render () {
        LayoutAnimation.easeInEaseOut();
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
        )
    }
}

// export default function feed() {
//     return(
//         <SafeAreaView>
//             <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
//                 <Header/>
//                 <PostPreview></PostPreview>
//             </ScrollView>
//         </SafeAreaView>
//     )
// }

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        margin: 0,
        backgroundColor: "#EEF2FF",
    },
})

