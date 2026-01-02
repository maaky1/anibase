import AnimeItem from "@/components/AnimeItem";
import Header from "@/components/Header";
import { COLOR } from "@/constants/color";
import { TopAnime } from "@/models/TopAnime";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

const HomeScreen = () => {
  const [heroAnime, setHeroAnime] = useState<TopAnime | null>(null);
  const [randomAnimes, setRandomAnimes] = useState<TopAnime[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const shuffle = (arr: TopAnime[]) => [...arr].sort(() => 0.5 - Math.random());

  const fetchHome = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get(
        "https://api.jikan.moe/v4/top/anime?limit=20"
      );

      const shuffled = shuffle(res.data.data);
      setHeroAnime(shuffled[0]);
      setRandomAnimes(shuffled.slice(1, 11));
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);

  return (
    <LinearGradient
      colors={[COLOR.active, COLOR.backgroundLight, COLOR.primary]}
      style={{ flex: 1 }}
    >
      <Header />

      <FlatList
        data={randomAnimes}
        keyExtractor={(item) => item.mal_id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchHome} />
        }
        ListHeaderComponent={
          <>
            {/* HERO */}
            {heroAnime && (
              <View style={styles.heroCard}>
                <Image
                  source={{ uri: heroAnime.images.jpg.image_url }}
                  style={styles.heroImage}
                />
                <View style={styles.heroOverlay} />
                <View style={styles.heroText}>
                  <Text
                    style={styles.heroTitle}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {heroAnime.title}
                  </Text>
                  <Text style={styles.heroStatus}>{heroAnime.status}</Text>
                </View>
              </View>
            )}

            <Text style={styles.sectionTitle}>Random Anime</Text>

            {/* HORIZONTAL LIST */}
            <FlatList
              data={randomAnimes}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.mal_id.toString()}
              contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}
              renderItem={({ item }) => (
                <AnimeItem
                  mal_id={item.mal_id}
                  title={item.title}
                  images={item.images}
                  status={item.status}
                />
              )}
            />
          </>
        }
        renderItem={null}
      />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  heroCard: {
    margin: 12,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 10,
  },

  heroImage: {
    width: "100%",
    height: 260,
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  heroText: {
    position: "absolute",
    bottom: 15,
    left: 15,
  },

  heroTitle: {
    fontSize: 26,
    fontWeight: "700",
    maxWidth: Dimensions.get("window").width - 40,
    color: COLOR.backgroundLight,
    marginBottom: 8,
    textShadowColor: COLOR.background,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  heroStatus: {
    fontSize: 16,
    color: COLOR.backgroundLight,
    letterSpacing: 1,
    textShadowColor: COLOR.background,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 12,
    marginLeft: 15,
    color: COLOR.background,
    textShadowColor: COLOR.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
