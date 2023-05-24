import React from 'react'
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native'

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const onPress = () => 1;

const CommentBar = () => {
   return (
    <View style={styles.container}>

      <View style={styles.topRow}>
        <View style={styles.replyTo}>
          <Text>Replying to []</Text>
        </View>

        <View style={styles.xMark}>
          <Text>X</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.pfp}>
          <Text>PFP</Text>
        </View>

        <View style={styles.commentBox}>
          <Text>Add a comment</Text>
        </View>
        <TouchableOpacity style={styles.postButton} onPress = {onPress}>
            <Text>Post</Text>
        </TouchableOpacity>
        
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,                                    // uneeded tbh
      width: windowWidth,                         // makes width as big as any window given
      //borderWidth: 1,                         
      //borderColor: "black",                   
      height: windowHeight/10,                //height 1/10 of screen height
      flexDirection: "column",                //the children stack vertically
      alignSelf: 'flex-end',                  
      justifyContent: 'space-between',        
      backgroundColor: 'white',                         
    },
    topRow: {                                 //IF YOU ARE IMPLEMENTING REPLIES YOU CAN JUST NOT RENDER TOP ROW AND IT SHOULD WORK
      flex: 0.5,
      backgroundColor: 'beige',
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
      paddingLeft: 3,
      marginRight: 10,

    },
    postButton: {
      height: windowHeight/30,
      alignSelf: 'center',
      justifyContent: 'center',
    //  borderColor: "red",
    //  borderWidth: 2,
    //  borderStyle: "dotted",
      paddingRight: 20,
      position: 'absolute',
      zIndex: 1,
    },
    
})

export default CommentBar