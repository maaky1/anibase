import Header from "@/components/Header";
import { Link } from "expo-router";
import { Text, View } from "react-native";

const AnimeScreen = () => {
  return (
    <View>
      <Header btnBack={true} />
      <Text>Ini Halaman Anime</Text>
      <Link href={"/"} style={{ fontSize: 20, color: "blue" }}>
        Home
      </Link>
    </View>
  );
};

export default AnimeScreen;
