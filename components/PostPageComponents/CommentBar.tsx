import { FieldValue, Timestamp, arrayUnion, collection, doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { auth, db } from '../../firebase';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

type CacheData = {
  __id: string,
}

const CommentBar = (props: CacheData) => {
  const [text, onChangeText] = useState(''); // State to track the comment text
  const [replying, setReplying] = useState(false); // State to track the reply status
  const [replyToUsername, setReplyToUsername] = useState(''); // State to track the username being replied to

  const postComment = async () => {
    if (replying) {
      console.log(`Replying to ${replyToUsername}: ${text}`);
    } else {
      console.log(text);
    }
    
    addCommentToFirestore(props.__id);
    stopReply();
    onChangeText('');
  };

  const addCommentToFirestore = async (postId: string) => {
    try {
      const newCommentRef = doc(collection(db, "comment"));
      setDoc(newCommentRef, {
        __id: newCommentRef.id,
        __userId: auth.currentUser?.uid,
        _createdAt: Timestamp.fromDate(new Date()),
        replies: [],
        text: text,
      });
      console.log("Document written with ID: ", newCommentRef.id);

      const updateCacheRef = doc(db, "cache", props.__id);
      updateDoc(updateCacheRef, {
        comments: arrayUnion(newCommentRef.id),
        numComments: increment(1),
      });
      console.log("Cache document updated: ", updateCacheRef.id);
    } catch (e) {
      console.error("Error adding comment document");
    }  
  }

  const stopReply = () => {
    setReplying(false);
    setReplyToUsername('');
  };

  return (
    <View style={styles.container}>
      {/* Top Row */}
      { replying? (
        <View style={styles.topRow}>
          <View style={styles.replyTo}>
              <Text>Replying to {replyToUsername}</Text>
          </View>
          <TouchableOpacity style={styles.xMark} onPress={stopReply}>
            <Text>X</Text>
          </TouchableOpacity>
       </View>
      ) : (<></>)}
      
      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <View style={styles.pfp}>
          <Text>PFP</Text>
        </View>

        {/* Comment Input */}
        <TextInput
          style={styles.commentBox}
          onChangeText={onChangeText}
          value={text}
          placeholder={replying ? `Replying to ${replyToUsername}` : 'Add a comment ...'}
          placeholderTextColor="grey"
        />

        {/* Post Button */}
        <TouchableOpacity style={styles.postButton} onPress={postComment}>
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      width: windowWidth,                         // makes width as big as any window given                  
      height: windowHeight/9,                //height 1/10 of screen height     
      backgroundColor: '#EEF2FF',
      paddingBottom: 10
    },
    topRow: {                                 //IF YOU ARE IMPLEMENTING REPLIES YOU CAN JUST NOT RENDER TOP ROW AND IT SHOULD WORK
      flex: 0.5,
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
    },
    replyTo: {
      flex: 1,
      justifyContent: "center",
      paddingLeft: 20,
    },
    xMark: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",
      paddingRight: 15,
    },
    bottomRow: {                            //Implementation for the pfp, comment, post button
      flex: 1,
      flexDirection: "row",
      justifyContent: 'flex-end'
    },
    pfp: {
      height: windowHeight/20,
      width: windowHeight/20,
      alignSelf: 'center',
      borderWidth: 8,
      borderRadius: windowHeight/30,
      borderColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: windowWidth/60,
    },
    commentBox: {
      height: windowHeight/30,
      alignSelf: 'center',
      width: windowWidth/1.2,
      borderColor: "black",
      borderRadius: 10,
      borderWidth: 1,
      justifyContent: 'center',
      paddingLeft: 5,
      marginRight: 10,

    },
    postButton: {
      height: windowHeight/30,
      alignSelf: 'center',
      justifyContent: 'center',
      paddingRight: 20,
      position: 'absolute',
      zIndex: 1,
    },
    
})

export default CommentBar