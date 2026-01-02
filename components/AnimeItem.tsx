import { COLOR } from "@/constants/color";
import { useRouter } from "expo-router";
import { FC } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  mal_id: number;
  title: string;
  status?: string;
  votes?: number;
  images?: {
    jpg?: {
      image_url: string;
    };
  };
  [key: string]: any; // menerima props tambahan lain
}

const AnimeItem: FC<Props> = ({
  mal_id,
  title,
  images,
  status,
  votes,
  ...rest
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/anime/${mal_id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: images?.jpg?.image_url }} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {status && <Text style={styles.status}>{status}</Text>}
        {votes !== undefined && (
          <Text style={styles.status}>Votes: {votes}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AnimeItem;

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;
const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: COLOR.active,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
  },

  imageContainer: {
    height: 140,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  content: {
    padding: 5,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: COLOR.background,
    marginBottom: 6,
    lineHeight: 20,
  },

  status: {
    color: COLOR.background,
  },
});
