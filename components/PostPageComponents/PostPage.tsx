import { View, StyleSheet, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useRouter, useLocalSearchParams, } from 'expo-router';
import { Timestamp, GeoPoint } from 'firebase/firestore';

import PostHeader from './PostHeader';
import PostComment from './PostComment';
import CommentBar from './CommentBar';


type CacheData = {
  id: string, 
  userId: string, 
  username: string,
  imageRef: string, 
  caption: string, 
  comments: never[],
  distBtwn: number, 
  timePosted: string, 
  location: GeoPoint | null, 
  nLikes: number,
  nComments: number,
}

const PostPage = (props: CacheData) => {
  
  return (
    <ScrollView style={styles.container}>
      <PostHeader id={props.id} 
        userId={props.userId} 
        username={props.username}
        imageRef={props.imageRef}
        caption={props.caption}
        distBtwn={props.distBtwn} 
        timePosted={props.timePosted}
        location={props.location}
        nLikes={props.nLikes}
        nComments={props.nComments} />
      
      {/* Add your post content here */}
      <View style={styles.postContent}>
        {/* Additional post content */}
      </View>

      <CommentBar />

      {<PostComment />}
      {/* Add any additional components or sections */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  postContent: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});

export default PostPage;
