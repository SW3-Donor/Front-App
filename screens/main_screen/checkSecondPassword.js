import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../Context";

export default function bloodRegister({ route, navigation }) {
  const { number, mode } = route.params;
  const { getServerUrl, getToken } = React.useContext(AuthContext);
  const [secondPw, setSecondPw] = useState("");
  const serverUrl = getServerUrl();

  function submit() {
    if (mode === "register") {
      const url = `${serverUrl}blood/register`;
      const data = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: number,
          secondpassword: secondPw,
        }),
      };

      fetch(url, data)
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          console.log("responseJson :>> ", responseJson);
          if (responseJson.message === "헌혈증 등록이 완료되었습니다.") {
            Alert.alert("등록 성공", "헌혈증 등록이 완료되었습니다.");
            navigation.popToTop();
          } else if (responseJson.message === "이미 존재하는 번호 입니다.") {
            Alert.alert("등록 실패", "이미 등록되어있는 헌혈증입니다.");
            navigation.goBack();
          }
        })
        .catch((error) => {
          console.log("error :>> ", error);
        });
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputView}>
        <Text style={{ margin: 7 }}>2차 비밀번호를 입력해 주세요</Text>
        <TextInput
          placeholder="2차 비밀번호"
          keyboardType="decimal-pad"
          onChangeText={(text) => setSecondPw(text)}
          secureTextEntry={true}
          defaultValue={secondPw}
          style={styles.inputBox}
        ></TextInput>
      </ScrollView>
      <View style={styles.submitView}>
        <TouchableOpacity style={styles.submitBtn} onPress={submit}>
          <Text style={{ color: "white", fontSize: 20 }}>확인</Text>
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
