import { COLOR } from "@/constants/color";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  name: string;
  active?: boolean;
  onPress: () => void;
}

const GenreItem: FC<Props> = ({ name, active, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={[styles.badge, active && { backgroundColor: COLOR.background }]}
      >
        <Text
          style={[
            styles.badgeText,
            active && { color: "#fff", fontWeight: "600" },
          ]}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GenreItem;

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
  },

  badge: {
    backgroundColor: COLOR.primary,
    borderRadius: 25,
    paddingHorizontal: 14,
    paddingVertical: 8,
    elevation: 5,
  },

  badgeText: {
    color: COLOR.inactive,
  },
});
