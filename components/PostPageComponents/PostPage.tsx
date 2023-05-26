import { View, StyleSheet, ScrollView, KeyboardAvoidingView, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useRouter, useLocalSearchParams, } from 'expo-router';
import { Timestamp, GeoPoint, getDoc, doc } from 'firebase/firestore';

import PostHeader from './PostHeader';
import PostComment from './PostComment';
import CommentBar from './CommentBar';
import { getPoster, getTimeDifference } from '../PostData';
import { db } from '../../firebase';


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

type CommentData = {
  __id: string;
  __userId: string;
  _createdAt: Timestamp;
  username: string;
  replies: never[];
  text: string;
  timePosted: string;
}

const comment = {
  __id:  "",
  __userId: "",
  _createdAt: new Timestamp(0, 0),
  username: "",
  replies: [],
  text: "",
  timePosted: "",
}

const PostPage = (props: CacheData) => {
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState(props.id);
  const [commentIds, setCommentIds] = useState(props.comments);
  const [commentsToRender, setCommentsToRender] = useState([comment]);
  const [commenter, setCommenter] = useState("");
  const [whenPosted, setWhenPosted] = useState("");

  console.log(props.comments);

  const fetchPostComments = async (postId: string) => {
    const commentsList:CommentData[] = [];

    setCommentIds(props.comments);
    setPostId(postId);

    commentIds.forEach(async (id) => {
      console.log(id);
      const comment = {
        __id:  "",
        __userId: "",
        _createdAt: new Timestamp(0, 0),
        username: "",
        replies: [],
        text: "",
        timePosted: "",
      }

      // For each comment ID, find the document for the comment
      const commentDoc = await getDoc(doc(db, "comment", id));

      if (commentDoc.exists()) {
        comment.__id = commentDoc.data().__id;
        comment.__userId = commentDoc.data().__userId;
        comment.username = await getPoster(comment.__userId)
        // setCommenter(username);
        comment._createdAt = commentDoc.data()._createdAt;
        comment.timePosted = getTimeDifference(comment._createdAt)
        // setWhenPosted(timeDiff);
        comment.replies = commentDoc.data().replies;
        comment.text = commentDoc.data().text;
      }
      
      // Add the document to the commentList
      commentsList.push(comment);
    })

    setCommentsToRender(commentsList);

    if (loading) {
      setLoading(false);
    }
  }

  return (
    <View>
      <FlatList data={commentsToRender}
        keyExtractor={(c) => c.__id}
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
            <PostComment __id={item.__id}
                      __userId={item.__userId}
                      replies={item.replies}
                      username={item.username}
                      text={item.text}
                      timePosted={item.timePosted}/>
          )
        }}>
      </FlatList>

      
     
      <KeyboardAvoidingView>
        <CommentBar />
      </KeyboardAvoidingView>
    </View>
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
