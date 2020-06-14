import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../Context";

export default function App() {
  const { getServerUrl, getToken } = React.useContext(AuthContext);
  const [number, setNumber] = useState("");
  const serverUrl = getServerUrl();

  // function submit() {
  //   const url = `${serverUrl}/blood/register`;
  //   const data = {
  //     method: "POST",
  //     headers: {
  //       Authhorization: `Bearer ${getToken()}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       secondpassword: sec,
  //       number: number,
  //     }),
  //   };

  //   fetch(url, data)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseJson) => {
  //       setToken(responseJson.token);
  //     })
  //     .catch((error) => {
  //       alert("test");
  //     });
  // }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputView}>
        <TextInput
          placeholder="헌혈증 번호"
          keyboardType="decimal-pad"
          onChangeText={(text) => setNumber(text)}
          defaultValue={number}
          style={styles.inputBox}
        ></TextInput>
      </ScrollView>
      <View style={styles.submitView}>
        <TouchableOpacity style={styles.submitBtn} onPress={submit}>
          <Text style={{ color: "white", fontSize: 20 }}>등록하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 50,
  },
  inputBox: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  inputView: {
    flex: 1,
    width: "100%",
  },
  submitView: {
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: 30,
  },
  submitBtn: {
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#fb5555",
    padding: 10,
  },
});
