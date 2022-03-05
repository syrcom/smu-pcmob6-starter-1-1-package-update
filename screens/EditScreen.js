import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";

export default function EditScreen({ navigation }) {

  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title, { marginTop: 20 }]}>
        Edit Screen
      </Text>
          </View>
  );
}

const styles = StyleSheet.create({});
