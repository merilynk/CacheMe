import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase'
import { useRouter, useSearchParams } from 'expo-router';

export default function Home() {
    const { id } = useSearchParams();
    const router = useRouter();
    const handlePress = () => {
        router.push("/map");
      }

    return (
        <View style={styles.container}>
            <Text>{id}</Text>
          <TouchableOpacity
            onPress={handlePress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Return to map</Text>
          </TouchableOpacity>
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
     button: {
      backgroundColor: '#0782F9',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
  })
  