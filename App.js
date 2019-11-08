import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [cameraPermission, setCameraPermission] = useState('denied');
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log(images)
    if (cameraPermission === 'denied') {
      Permissions.askAsync(Permissions.CAMERA_ROLL)
        .then(({ status }) => setCameraPermission(status));
    }
  }, [images]);

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    result.key = `${result.uri}_${images.length}`;
    const newImages = [...images, result]
    setImages(newImages);
  };

  takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    result.key = `${result.uri}_${images.length}`;
    const newImages = [...images, result]
    setImages(newImages);
  }

  if (cameraPermission === 'denied') return (
    <View style={styles.container}>
      <Text>No tienes permisos</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View >
        {images.length <= 0 ?
          <Text>Agrega una foto...</Text> :
          <View style={styles.imageContainer}>
            {images.map(image => (
              <Image
                style={{ height: 100, width: 100, margin: 5 }}
                source={{ uri: image.uri }}
                key={image.key}
              />
            ))}
          </View>
        }
      </View>
      <View style={styles.buttonContainer} >
        <Button
          title="abrir fotos"
          onPress={pickImage}
        />
        <Button
          title="abrir camara"
          onPress={takePicture}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-between"
  }
});
