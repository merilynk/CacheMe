import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import PostHeader from './PostHeader';
import PostComment from './PostComment';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const PostPage = () => {
  return (
    <View style={styles.container}>
      <PostHeader />
      {/* Add your post content here */}
      <PostComment />
      {/* Add any additional components or sections */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Add any desired styling for the container
  },
});

export default PostPage;