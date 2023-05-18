import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const PostComment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.commentText}>This is a comment.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth - windowWidth / 10,
    height: windowHeight / 15,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    color: 'black',
  },
});

export default PostComment;