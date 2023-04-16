import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIAQVAPLCRIXV6LNT6W',
  secretAccessKey: '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',
  region: 'us-west-1'
});

const s3 = new AWS.S3({
  region: "us-west-1"
});
let src: string;
s3.getObject({
  Bucket: 'cacheme',
  Key: 'fb6ccb8a-23c3-4376-8efb-3cf850f79c1f.png'
}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    let base64String = data.Body?.toString('base64');
    src = "data:image/png;base64,"+base64String;
  }
});


export default function AWSImageSrc() {
    return src;
}


