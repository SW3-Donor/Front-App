import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../Context";

export default function bloodRegister({ route, navigation }) {
  const { number, mode, email, count } = route.params;
  const { getServerUrl, getToken } = React.useContext(AuthContext);
  const [secondPw, setSecondPw] = useState("");
  const serverUrl = getServerUrl();
  let url = "";
  let data = {};

  function submit() {
    if (mode === "register") {
      url = `${serverUrl}blood/register`;
      data = {
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
    } else if (mode === "send") {
      url = `${serverUrl}blood/send`;
      data = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secondpassword: secondPw,
          receiver: email,
          count: count,
        }),
      };
    } else if (mode === "quickSend") {
      url = `${serverUrl}blood/send`;
      data = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secondpassword: secondPw,
          postId: email,
          count: count,
        }),
      };
    }
    fetch(url, data)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log("responseJson :>> ", responseJson);
        if (responseJson.message === "헌혈증 등록이 완료되었습니다.") {
          Alert.alert("등록 성공", "헌혈증 등록이 완료되었습니다.");
          navigation.popToTop();
        } else if (
          responseJson.message ===
          "헌혈증 거래가 성공 하였습니다. 보내는건 기록과 각 유저 헌혈증 갯수입니다."
        ) {
          Alert.alert("보내기 성공", "헌혈증이 성공적으로 보내졌습니다.");
          navigation.popToTop();
        } else if (
          responseJson.message === "2차 비밀번호가 일치하지 않습니다."
        ) {
          Alert.alert("실패", responseJson.message);
        } else if (
          responseJson.message === `Cannot read property '_id' of null`
        ) {
          Alert.alert("실패", "받는사람의 이메일을 확인하세요");
          navigation.goBack();
        } else {
          Alert.alert("실패", responseJson.message);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
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
