import React from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import PostHeader from './PostHeader';
import PostComment from './PostComment';
import CommentBar from './CommentBar'

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const PostPage = () => {
  return (
    <ScrollView style={styles.container}>
      <PostHeader />
      {/* Add your post content here */}

      <CommentBar />

      <PostComment />
      {/* Add any additional components or sections */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    border: "flex",
    flexDirection: 'column',
    // alignItems: "flex-start"
  },
});

export default PostPage;