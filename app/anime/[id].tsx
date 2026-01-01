import Header from "@/components/Header";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const DetailAnime = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Header btnBack={true} />
      <Text style={{ fontSize: 30 }}>Detail Anime id : {id}</Text>
    </View>
  );
};

export default DetailAnime;
