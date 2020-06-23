import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../Context";

export function bloodSendMail({ navigation }) {
  const [email, setEmail] = useState("");

  function submit() {
    navigation.navigate("bloodSendNum", {
      email: email,
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputView}>
        <Text style={{ margin: 7 }}>받는사람의 이메일을 입력해주세요</Text>
        <TextInput
          placeholder="이메일"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          defaultValue={email}
          style={styles.inputBox}
        ></TextInput>
      </ScrollView>
      <View style={styles.submitView}>
        <TouchableOpacity style={styles.submitBtn} onPress={submit}>
          <Text style={{ color: "white", fontSize: 20 }}>
            보낼 개수 입력하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function bloodSendNum({ route, navigation }) {
  const { email, mode } = route.params;
  const [num, setNum] = useState("");

  function submit() {
    if (mode === "quickSend") {
      navigation.navigate("checkSecondPassword", {
        email: email,
        count: num,
        mode: "quickSend",
      });
    } else {
      navigation.navigate("checkSecondPassword", {
        email: email,
        count: num,
        mode: "send",
      });
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputView}>
        <Text style={{ margin: 7 }}>보낼 헌혈증 개수를 입력해 주세요</Text>
        <TextInput
          placeholder="헌혈증 개수"
          keyboardType="number-pad"
          onChangeText={(text) => setNum(text)}
          defaultValue={num}
          style={styles.inputBox}
        ></TextInput>
      </ScrollView>
      <View style={styles.submitView}>
        <TouchableOpacity style={styles.submitBtn} onPress={submit}>
          <Text style={{ color: "white", fontSize: 20 }}>보내기</Text>
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
