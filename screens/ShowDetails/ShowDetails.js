import React, { useState,useEffect,useContext } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import UserPermissions from './userpermisses'
import Fire, { database,auth } from '../../firebase'
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

import * as ImagePicker from 'expo-image-picker';

function ShowDetails() {
  const { user } = useContext(AuthenticatedUserContext);
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState('');
  const getImageUrl = () => {
    const imageRef = database.ref('photos');
    imageRef.on('value', (snapshot) => {
      const imageUrls = snapshot.val();
      const urls = [];
      for (let id in imageUrls) {
        urls.push({ id, url: imageUrls[id] });
      }
      const newState = [...pickedImagePath, ...urls]; 
      setPickedImagePath(newState);
      console.log(newState);
    });
  };
  useEffect(() => {
    getImageUrl();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }
  const upload = () => {
    Fire.shared.addPhoto(pickedImagePath).then(()=>{
      setPickedImagePath(null)

    })
    .catch(err=>{
      alert(err.message)
    })
  }

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }
  useEffect(() => {
    UserPermissions.getPermissionAsync();
   }, [])
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        {
          pickedImagePath !== '' && <Image
            source={{ uri: pickedImagePath }}
            style={styles.image}
          />
        }
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={openCamera} title="Open camera"  />
        <Button title="Upload" onPress={upload}/>
        
      </View>
      
      <Text>Email: {user.email}</Text>
      <Button onPress={handleSignOut}>
        <Text>Sign out</Text>
      </Button>
    </View>
  );
}

export default ShowDetails;

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageContainer: {
    padding: 30
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover'
  }
});