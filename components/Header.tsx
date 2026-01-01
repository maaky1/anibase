import { COLOR } from "@/constants/color";
import { Ionicons } from "@expo/vector-icons";
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
      <Text style={styles.title}>My App</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLOR.primary,
    letterSpacing: 2,
  },
});
