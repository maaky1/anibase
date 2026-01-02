import { COLOR } from "@/constants/color";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  btnBack?: boolean;
}

const Header: FC<Props> = ({ btnBack = false }) => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      {btnBack && (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" color={COLOR.background} size={20} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>
        <Octicons name="database" size={20} />
        Anibase
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 23,
    fontWeight: "700",
    color: COLOR.background,
    textShadowColor: COLOR.inactive,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 1,
  },
});
