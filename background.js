import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, Text, ActivityIndicator, View } from 'react-native';
import {BlurView} from 'expo-blur';
import { useState, useEffect } from 'react';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export default function App() {
  
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchImage = async () => {
    try {
      const res = await fetch(`https://api.unsplash.com/photos/random?query=weather&orientation=portrait&client_id=${API_KEY}`);
      const data = await res.json();
      
      setImageURL(data.urls?.regular);
    } catch(error){
      console.error("Error fetching image:", error);
    } finally{
      setLoading(false)
    } 
  };
  useEffect (() =>{
    fetchImage();
    const interval = setInterval(fetchImage, 50000);
    return () => clearInterval(interval);
  }, [])
  
  return (
     <View style={styles.container}>
      {imageURL? (
        <ImageBackground
          source={{ uri: imageURL }}
          style={styles.background}
          resizeMode="cover"
        >
          <BlurView intensity={50} style={styles.blurContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={styles.text}>🌦 OpenWeather App</Text>
            )}
          </BlurView>
        </ImageBackground>
      ) : (
        <ActivityIndicator size="large" color="#000" />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background:{
    flex: 1,
    justifyContent: 'center',
  },
  blurContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize: 28,
    fontWeight:"bold",
    color:"#fff",
  }
});