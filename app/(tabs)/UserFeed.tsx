import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


interface PostData {
  id: string;
  text: string;
  location: firebase.firestore.GeoPoint;
  timePosted: firebase.firestore.Timestamp;
}

const UserFeed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const db = firebase.firestore();
      const postsRef = db.collection('posts');
      const snapshot = await postsRef.get();
      const fetchedPosts: PostData[] = [];
      snapshot.forEach((doc) => {
        const postData = doc.data() as PostData;
        fetchedPosts.push(postData);
      });
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <View>
      {posts.map((post) => (
        <View key={post.id}>
          <Text>{post.text}</Text>
          <Text>
            Location: {post.location.latitude}, {post.location.longitude}
          </Text>
          <Text>
            Posted on: {post.timePosted.toDate().toLocaleDateString()}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default UserFeed;
