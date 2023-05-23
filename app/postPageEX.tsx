import React, {useState, useEffect} from 'react';
import { useRouter, useLocalSearchParams, useSearchParams } from 'expo-router';
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import PostPage from '../components/PostPageComponents/PostPage'

const postPageEx = () => {
    const router = useRouter();
    const { postId } = useSearchParams();
  
    useEffect ( () => {
      console.log("post id: " + postId);
      console.log(postId?.length);
    }, [postId]) 
    return (
        <PostPage></PostPage>
    )
}

export default postPageEx