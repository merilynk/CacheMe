import AWS from 'aws-sdk';
import { useEffect, useState } from 'react';
import { Image, ActivityIndicator } from 'react-native';

//Image loads slowly, probably because it is rerendering. Maybe find a way to return the src instead of an image component

//TODO: Add these to .env file
AWS.config.update({
  accessKeyId: 'AKIAQVAPLCRIXV6LNT6W',
  secretAccessKey: '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',
  region: 'us-west-1'
});

type AWSImageProps = {
  id: string;
};

export default function AWSImage(props: AWSImageProps) {
  const [image, setImage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const s3 = new AWS.S3({
        region: "us-west-1"
      });
      
      s3.getObject({
        Bucket: 'cacheme',
        Key: props.id,
      }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let base64String = data.Body?.toString('base64');
          setImage("data:image/png;base64,"+base64String);
        }
      });
    }
    fetchData();
  }, []);

  
  if(image == ""){
    return <>
    <ActivityIndicator />
    </>
  }
  if(image == "error"){
    return <>
    <ActivityIndicator /> //TODO: update this with an error image or redirect maybe?
    </>
  }
  return (
    <>
    <Image style={{width: "50%", height: "50%"}}source={{uri: image}}/>
    </>
  )
}


