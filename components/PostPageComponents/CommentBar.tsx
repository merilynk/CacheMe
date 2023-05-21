import React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

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
        <View style={styles.postButton}>
            <Text>Post</Text>
        </View>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: windowWidth,
      borderWidth: 1,
      borderColor: "black",
      height: windowHeight/15,
      flexDirection: "column",
    },
    topRow: {
      height: windowHeight/20,
      flex: 1,
      backgroundColor: "white",
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
    bottomRow: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    pfp: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-start",
      paddingLeft: 20,
      borderColor: "green",
      borderWidth: 2,
      borderStyle: "dotted"
    },
    commentBox: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-start",
      width: 200,
      borderColor: "yellow",
      borderWidth: 2,
    },
    postButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "red",
      borderWidth: 2,
      borderStyle: "dotted"
    }
})

export default CommentBar