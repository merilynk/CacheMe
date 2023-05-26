import { View, StyleSheet, ScrollView, KeyboardAvoidingView, FlatList, Dimensions,} from 'react-native';
// import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import React, {useState, useEffect} from 'react';
import { useRouter, useLocalSearchParams, } from 'expo-router';
import { Timestamp, GeoPoint, getDoc, doc } from 'firebase/firestore';

import PostHeader from './PostHeader';
import PostComment from './PostComment';
import CommentBar from './CommentBar';
import { getPoster, getTimeDifference } from '../PostData';
import { db } from '../../firebase';
import NewPostComment from './NewPostComment';

const windowHeight = Dimensions.get('screen').height;

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
      <KeyboardAvoidingView>
      <FlatList style={styles.scrollingComments}
        data={props.comments}
        keyExtractor={(c) => c}
        ListHeaderComponent={
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
        }
        renderItem={({item}) => {
          return (
            <NewPostComment id={item}/>
          )
        }}>
      </FlatList>
      <View style={styles.commentInput}>
        <CommentBar />
      </View>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollingComments: {
    backgroundColor: '#EEF2FF',
    marginBottom:5
  },
  commentInput: {
    position: "absolute",
    marginTop: windowHeight - 100,
    paddingTop: 5
  },
});

export default PostPage;
