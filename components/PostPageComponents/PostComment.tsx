import { VoiceID } from 'aws-sdk';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity, TextInput, ScrollView, FlatList, SafeAreaView } from 'react-native';
import RegularText from "../Texts/regularText"
import MiniText from '../Texts/miniText';
import { Timestamp, collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { getCacheData, getDistanceBetween, getImage, getPoster, getTimeDifference } from '../PostData';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

type CacheData = {
  __id: string;
  __userId: string;
  username: string;
  comments: never[];
  numComments: number;
}

type CommentData = {
  __id: string;
  __userId: string;
  _createdAt: Timestamp;
  replies: never[];
  text: string;
}

const comment = {
  __id:  "",
  __userId: "",
  _createdAt: new Timestamp(0, 0),
  replies: [],
  text: "",
}

const PostComment = (props: CacheData) => {
  const [loading, setLoading] = useState(true);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [postedReply, setPostedReply] = useState('');
  const [postId, setPostId] = useState(props.__id);
  const [commentIds, setCommentIds] = useState(props.comments);
  const [commentsToRender, setCommentsToRender] = useState([comment]);
  const [commenter, setCommenter] = useState("");
  const [whenPosted, setWhenPosted] = useState("");


  const fetchPostComments = async (postId: string) => {
    const commentsList:CommentData[] = [];

    setCommentIds(props.comments);
    setPostId(props.__id);

    console.log(commentIds.length);

    commentIds.forEach(async (id) => {
      console.log(id);
      const comment = {
        __id:  "",
        __userId: "",
        _createdAt: new Timestamp(0, 0),
        replies: [],
        text: "",
      }

      // For each comment ID, find the document for the comment
      const commentDoc = await getDoc(doc(db, "comment", id));

      if (commentDoc.exists()) {
        comment.__id = commentDoc.data().__id;
        comment.__userId = commentDoc.data().__userId;
        setCommenter(await getPoster(comment.__userId));
        comment._createdAt = commentDoc.data()._createdAt;
        setWhenPosted(getTimeDifference(comment._createdAt));
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

  const handleReply = () => {
    // Handle reply logic here
    console.log('Reply:', replyMessage);
    // Display the posted reply
    setPostedReply(replyMessage);
    // Clear reply message after sending
    setReplyMessage('');
    // Show the reply button again
    setShowReplyBox(false);
  };

  const handleShowReplyBox = () => {
    setShowReplyBox(true);
  };

  useEffect(() => {
    fetchPostComments(postId);
  })

  return (
    <><SafeAreaView>
      {loading ? (
        <ScrollView style={styles.container}>
           <View style={styles.topBar}>
            <View>
              <Image source={require('../../assets/images/takumi.jpeg')} style={{ width: 30, height: 30, borderRadius: 15 }}></Image>
            </View>
            <View style={styles.userName}>
              <RegularText>Username</RegularText>
            </View>
            <View>
              <RegularText style={styles.time}>5 hours ago</RegularText>
            </View>
          </View>
          <View style={styles.midderBar}>
            <RegularText style={{ fontSize: 15 }}>This is a really long comment just to see if it overflows over the right or goes down to the bottom</RegularText>
          </View>
        </ScrollView>

      ) : (
        <FlatList data={commentsToRender} 
        keyExtractor={(c) => c.__id} 
        renderItem={({item}) => {
          return (
            <View>
              <View style={styles.topBar}>
                <View>
                  <Image source={require('../../assets/images/takumi.jpeg')} style={{ width: 30, height: 30, borderRadius: 15 }}></Image>
                </View>
                <View style={styles.userName}>
                  <RegularText>{ commenter }</RegularText>
                </View>
                <View>
                  <RegularText style={styles.time}>{ whenPosted }</RegularText>
                </View>
              </View>
              <View style={styles.midderBar}>
                <RegularText style={{ fontSize: 15 }}>{ item.text }</RegularText>
              </View>

              {!showReplyBox && (
                  <TouchableOpacity style={styles.bottomBar} onPress={handleShowReplyBox}>
                    <RegularText style={{ fontSize: 13, marginTop: 10, }}>Reply</RegularText>
                  </TouchableOpacity>
                )}

                {showReplyBox && (
                  <View style={styles.replyContainer}>
                    <TextInput
                      style={styles.replyInput}
                      placeholder="Type your reply..."
                      value={replyMessage}
                      onChangeText={setReplyMessage} />
                    <TouchableOpacity style={styles.replyButton} onPress={handleReply}>
                      <Text style={styles.replyButtonText}>Send</Text>
                    </TouchableOpacity>
                  </View>
                )}
            </View>
          );
        }}></FlatList>
      )}
    </SafeAreaView>
    <ScrollView style={styles.container}>
        {/* <View style={styles.topBar}>
          <View>
            <Image source={require('../../assets/images/takumi.jpeg')} style={{ width: 30, height: 30, borderRadius: 15 }}></Image>
          </View>
          <View style={styles.userName}>
            <RegularText>Username</RegularText>
          </View>
          <View>
            <RegularText style={styles.time}>5 hours ago</RegularText>
          </View>
        </View>
        <View style={styles.midderBar}>
          <RegularText style={{ fontSize: 15 }}>This is a really long comment just to see if it overflows over the right or goes down to the bottom</RegularText>
        </View> */}

        

        {/* Display the posted reply */}
        {postedReply !== '' && (
          <View style={styles.postedReplyContainer}>
            <RegularText style={styles.postedReplyText}>{postedReply}</RegularText>
          </View>
        )}
      </ScrollView></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    marginVertical: 10,
    flexDirection: "column",
  },
  topBar: {
    outline: '#FF5733',
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
  },
  userName:{
    flex: 1,
    position: "absolute",
    marginLeft: 45,
  },
  time:{
    flex: 1,
    fontSize: 13,
    color: "#545350",
    paddingRight: 10,
  },
  midderBar: {
    flex: 1,
    paddingLeft: 45,
  },
 
  bottomBar: {
    paddingLeft: 45,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 45,
    paddingTop: 10,
  },
  replyInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  replyButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  replyButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  postedReplyContainer: {
    paddingHorizontal: 45,
    marginTop: 10,
  },
  postedReplyText: {
    fontSize: 15,
  },
});

export default PostComment;