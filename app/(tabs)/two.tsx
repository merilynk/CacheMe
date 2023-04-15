import { ImageSourcePropType, StyleSheet } from 'react-native';
import { Image } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import AWS from 'aws-sdk';
import { ReactFragment } from 'react';

AWS.config.update({
  accessKeyId: 'AKIAQVAPLCRIXV6LNT6W',
  secretAccessKey: '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',
  region: 'us-west-1'
});


const s3 = new AWS.S3({
  region: "us-west-1"
});
let src: string | undefined;
s3.getObject({
  Bucket: 'cacheme',
  Key: 'fb6ccb8a-23c3-4376-8efb-3cf850f79c1f.png'
}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    let base64String = data.Body?.toString('base64');
    src = "data:image/png;base64,"+base64String;
    //console.log(src);
  }
});

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
      <Image style={{width:200, height:200}}source={{uri: src}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
