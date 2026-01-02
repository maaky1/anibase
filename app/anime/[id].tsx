import Header from "@/components/Header";
import { COLOR } from "@/constants/color";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const DetailAnime = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getDetail = async () => {
    try {
      const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
      setAnime(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLOR.primary} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[COLOR.active, COLOR.backgroundLight, COLOR.primary]}
      style={{ flex: 1 }}
    >
      <Header btnBack />

      <ScrollView contentContainerStyle={styles.container}>
        {/* HERO IMAGE */}
        <Image
          source={{ uri: anime?.images?.jpg?.large_image_url }}
          style={styles.poster}
        />

        {/* TITLE */}
        <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
          {anime?.title}
        </Text>

        {/* META */}
        <View style={styles.meta}>
          <Text style={styles.metaText}>{anime?.status}</Text>
          <Text style={styles.metaText}>⭐ {anime?.score ?? "-"}</Text>
          <Text style={styles.metaText}>
            {anime?.year ?? anime?.aired?.prop?.from?.year}
          </Text>
        </View>

        {/* SYNOPSIS */}
        <Text style={styles.section}>Synopsis</Text>
        <Text style={styles.synopsis}>
          {anime?.synopsis || "No synopsis available."}
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

export default DetailAnime;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  poster: {
    width: width - 32,
    height: 420,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLOR.black,
    textShadowColor: COLOR.backgroundLight,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 12,
    maxWidth: "95%",
  },

  meta: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  metaText: {
    color: COLOR.black,
    textShadowColor: COLOR.backgroundLight,
    fontSize: 14,
    backgroundColor: COLOR.active,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  section: {
    fontSize: 20,
    fontWeight: "600",
    color: COLOR.black,
    marginBottom: 8,
  },

  synopsis: {
    fontSize: 15,
    lineHeight: 22,
    color: COLOR.black,
    textShadowColor: COLOR.backgroundLight,
  },
});
