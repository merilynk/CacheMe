import React from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height

function PostComment() {
  return (
    <></>
  )
}

const styles = StyleSheet.create({
    commentBar: {
        flex: 1,
        width: windowWidth - windowWidth/10,
        height: windowHeight/15,
    },
    commentContainer: {}
})

export default PostComment