import axios from "axios";
import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { useSelector } from "react-redux";
import { API, API_CREATE } from "../constants/API";
import { commonStyles, darkStyles, lightStyles } from "../styles/commonStyles";


export default function CreateScreen({ navigation }) {

  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  const styles = { ...commonStyles, ...(isDark ? darkStyles : lightStyles) };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  async function savePost() {
    const post = {
      title: title,
      content: content,
    };
    try {
      console.log(token);
      const response = await axios.post(API + API_CREATE, post, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log(response.data);
      navigation.navigate("Index", { post: post });
    } catch (error) {
      console.log(error);
    }
  }

 
  return (
   <Modal 
   transparent={true}
   animationType='slide'
   >
   <View style={additionalStyles.modal}>
        <Text style={[additionalStyles.label, styles.text]}>Enter Title:</Text>
        <TextInput
          style={additionalStyles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Text style={[additionalStyles.label, styles.text]}>
          Enter Content:
        </Text>
        <TextInput
          style={additionalStyles.input}
          value={content}
          onChangeText={(text) => setContent(text)}
        />
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={savePost}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => navigation.navigate("Index")}
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>

        </View>
      </Modal>
  );
}

const additionalStyles = StyleSheet.create({
  input: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    width: 300,
  },
  label: {
    fontSize: 28,
    marginBottom: 10,
    marginLeft: 5,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    marginTop: 110,
    marginBottom: 480,
    backgroundColor: '#fff',
  },

});