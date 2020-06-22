import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../Context";

export default function editSecondPassword({ navigation }) {
  const { getServerUrl, getToken } = React.useContext(AuthContext);
  const [secondpassword, setSecondpassword] = useState("");
  const serverUrl = getServerUrl();

  function submit() {
    const url = `${serverUrl}auth/password`;
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        secondpassword: secondpassword,
      }),
    };

    fetch(url, data)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        Alert.alert("수정 완료", "2차 비밀번호가 수정되었습니다.");
        navigation.goBack();
      })
      .catch((error) => {
        alert("test");
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputView}>
        <Text style={{ fontSize: 25, padding: 10, marginBottom: 20 }}>
          2차 비밀번호 수정
        </Text>
        <TextInput
          placeholder="2차 비밀번호"
          keyboardType="decimal-pad"
          secureTextEntry={true}
          onChangeText={(text) => setSecondpassword(text)}
          defaultValue={secondpassword}
          style={styles.inputBox}
        ></TextInput>
      </ScrollView>
      <View style={styles.submitView}>
        <TouchableOpacity style={styles.submitBtn} onPress={submit}>
          <Text style={{ color: "white", fontSize: 20 }}>
            2차 비밀번호 수정하기
          </Text>
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
