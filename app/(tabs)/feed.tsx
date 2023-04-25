import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native"
import PostPreview from '../../components/posts'
import Header from '../../components/Header'


export default function feed() {
    return(
        <SafeAreaView>
            <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
                <Header/>
                <PostPreview></PostPreview>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        margin: 0,
        backgroundColor: "#EEF2FF",
    },
})

