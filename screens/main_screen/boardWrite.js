import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { TextInput, ScrollView, FlatList } from "react-native-gesture-handler";
import { AuthContext } from "../../Context";

export default function boardWrite({ route, navigation }) {
  const { getServerUrl, getToken } = React.useContext(AuthContext);
  const { mode, titleOrigin, contentOrigin, countOrigin, id } = route.params;
  const serverUrl = getServerUrl();

  const [title, setTitle] = useState(titleOrigin);
  const [content, setContent] = useState(contentOrigin);
  const [count, setCount] = useState(countOrigin);

  function submit() {
    let url = ``;
    let method = "";

    if (mode === "write") {
      url = `${serverUrl}board/post`;
      method = "POST";
    } else if (mode === "edit") {
      url = `${serverUrl}board/post${id}`;
      method = "PUT";
    }

    console.log("url :>> ", url);
    console.log("method :>> ", method);

    const data = {
      method: method,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        count: count,
      }),
    };

    fetch(url, data)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        Alert.alert("등록성공", "등록이 되었습니다.");
        navigation.goBack();
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.postView}>
        <ScrollView>
          <TextInput
            style={styles.inputBox}
            placeholder="제목"
            onChangeText={(text) => setTitle(text)}
            defaultValue={title}
          ></TextInput>
          <TextInput
            style={styles.inputBox}
            placeholder="내용"
            onChangeText={(text) => setContent(text)}
            defaultValue={content}
            multiline={true}
          ></TextInput>
          <TextInput
            style={styles.inputBox}
            placeholder="기부 목표"
            onChangeText={(text) => setCount(text)}
            defaultValue={count}
            keyboardType="number-pad"
          ></TextInput>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => submit()}>
        <Text style={{ color: "#ffffff", fontSize: 18 }}>작성하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  postView: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  inputBox: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#aaa",
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#fb5555",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 3,
  },
});
