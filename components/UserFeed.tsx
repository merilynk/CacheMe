import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { GeoPoint, Timestamp, collection, getDocs, orderBy, query } from 'firebase/firestore';

// Components
import PostPreview from './Post';
import Header from './Header';

// Firebase
import { db } from '../firebase';

type CacheData = {
  __id: string;
  __imageId: string;
  __userId: string;
  _createdAt: Timestamp;
  caption: string;
  location: GeoPoint;
  numComments: number;
  numLikes: number;
  reported: boolean;
};

const UserFeed = () => {
  const [postsToRender, setPostsToRender] = useState<CacheData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsList: CacheData[] = [];
      const cacheRef = collection(db, 'cache');
      const q = query(cacheRef, orderBy('_createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((cache) => {
        const {
          __id,
          __imageId,
          __userId,
          _createdAt,
          caption,
          location,
          numComments,
          numLikes,
          reported,
        } = cache.data();

        postsList.push({
          __id,
          __imageId,
          __userId,
          _createdAt,
          caption,
          location,
          numComments,
          numLikes,
          reported,
        });
      });

      setPostsToRender(postsList);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Header />
          <FlatList
            data={postsToRender}
            keyExtractor={(item) => item.__id}
            renderItem={({ item }) => (
              <PostPreview
                id={item.__id}
                captionText={item.caption}
                uid={item.__userId}
                image={item.__imageId}
                numComments={item.numComments}
                numLikes={item.numLikes}
                location={item.location}
                timePosted={item._createdAt}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default UserFeed;

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    margin: 0,
    marginBottom: 50,
    backgroundColor: '#EEF2FF',
  },
});
