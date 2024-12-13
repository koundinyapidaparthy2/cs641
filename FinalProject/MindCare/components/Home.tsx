import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, Button, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoodsRequest, deleteMoodRequest } from '../store/moodSlice';
import { RootState } from '../store';
import { Audio } from 'expo-av';
import Emoji from 'react-native-emoji';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { moods, isFetching, error } = useSelector((state: RootState) => state.mood);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Use useFocusEffect to fetch moods whenever the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchMoodsRequest());
    }, [dispatch])
  );

  const playAudio = async (audioBase64: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioBase64 }
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  // Function to delete a mood
  const handleDeleteMood = (moodId: string) => {
    Alert.alert(
      "Delete Mood",
      "Are you sure you want to delete this mood?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => dispatch(deleteMoodRequest({ moodId })) }, // Dispatch delete action
      ]
    );
  };

  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); 
      }
    };
  }, [sound]);

  if (isFetching) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>User Moods</Text>
      <FlatList
        data={moods}
        keyExtractor={(mood) => mood._id}
        renderItem={({ item: mood }) => (
          <View style={{ marginBottom: 20, borderWidth: 1, borderColor: '#ccc', padding: 10 }}>
            <Text style={{ fontSize: 30 }}><Emoji name={mood.emoji} style={styles.emoji} /></Text>
            <Text style={{ fontSize: 18 }}>{mood.text}</Text>
            <Text style={{ marginTop: 5 }}>{new Date(mood.date).toLocaleString()}</Text>
            {mood.image && <Image source={{ uri: mood.image }} style={styles.previewImage} />}
            {mood.audio && (
              <Button
                title="Play Audio"
                onPress={() => playAudio(`data:audio/m4a;base64,${mood.audio}`)}
              />
            )}
            <Button
              title="Delete Mood"
              onPress={() => handleDeleteMood(mood._id)}
              color="red" // Optional: to visually distinguish the delete button
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  previewImage: {
    width: '95%',
    height: 'auto',
    aspectRatio: 1,
    marginTop: 10,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 8,
  },
  emoji: {
    fontSize: 35,
    margin: 10,
  },
});

export default Home;
