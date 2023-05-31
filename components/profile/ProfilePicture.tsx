import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import { storage } from "../../firebase";
import { Dimensions, View, Image, Text } from "react-native";

type profilePictureProps = {
    profilePictureID: string;
}

const windowWidth = Dimensions.get('screen').width

async function getProfileImage (image: string) {
    let uri = "";
    if (image != "" || image != null) {
        const gsRef = ref(storage, "profile/" + image);
        await getDownloadURL(gsRef).then( (url) => {
            uri = url;
            return url;
        });
        return uri;
    }  else {
        return uri;
    } 
  }


export default function Home(props: profilePictureProps) {
    const [imageURI, setImageURI] = useState("");
    getProfileImage(props.profilePictureID).then( async (uri) => {
        if (uri) {
            setImageURI(uri);
        } else {
            setImageURI("");
        }
    });

    return (
        <View style={{
            width: windowWidth,
            justifyContent: "center",
            alignItems: "center",}}> 
                    {imageURI != "" && <Image source={{uri: imageURI}}
                    style={{
                            width: windowWidth*.2, 
                            height: windowWidth*.2, 
                            borderRadius: (windowWidth*.2)/2
                        }}
                    />}
                </View>
    )
}