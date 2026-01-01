import Header from "@/components/Header";
import { COLOR } from "@/constants/color";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Anime = {
  title: string;
  status: string;
  synopsis: string;
};

const HomeScreen = () => {
  const [anime, setAnime] = useState<Anime | null>(null);

  const getAnime = async () => {
    const topAnime = await axios.get("https://api.jikan.moe/v4/top/anime");
    const list = topAnime.data.data;
    const random = list[Math.floor(Math.random() * list.length)];

    const anime = await axios.get(
      "https://api.jikan.moe/v4/anime/${random.mal_id}"
    );
    // console.log(JSON.stringify(anime.data.data, null, 2));
    setAnime(anime.data.data);
  };

  useEffect(() => {
    getAnime();
  }, []);

  return (
    <LinearGradient
      colors={[COLOR.active, COLOR.backgroundLight, COLOR.primary]}
      style={{ flex: 1 }}
    >
      <Header />
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={{
              uri: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
            }}
            style={styles.imageFull}
          />
          <View style={styles.overlay}>
            <Text style={styles.title}>{anime?.title}</Text>
            <Text style={styles.status}>{anime?.status}</Text>
          </View>
        </View>
        <Text style={styles.description}>{anime?.synopsis}</Text>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageFull: {
    width: "100%",
    height: 400,
    borderRadius: 25,
    elevation: 15,
  },

  card: {
    position: "relative",
    marginBottom: 20,
    borderRadius: 12,
  },

  overlay: {
    position: "absolute",
    bottom: 5,
    left: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: "600",
    color: COLOR.backgroundLight,
    marginBottom: 8,
    textShadowColor: COLOR.background,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  status: {
    fontSize: 20,
    color: COLOR.backgroundLight,
    letterSpacing: 1,
    textShadowColor: COLOR.background,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  description: {
    fontSize: 10,
    paddingHorizontal: 15,
  },
});
