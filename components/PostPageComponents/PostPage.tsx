import { View, StyleSheet, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useRouter, useLocalSearchParams, } from 'expo-router';

import PostHeader from './PostHeader';
import PostComment from './PostComment';
import CommentBar from './CommentBar';


const PostPage = () => {


  return (
    <ScrollView style={styles.container}>
      <PostHeader />
      
      {/* Add your post content here */}
      <View style={styles.postContent}>
        {/* Additional post content */}
      </View>

      <CommentBar />

      <PostComment />
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
