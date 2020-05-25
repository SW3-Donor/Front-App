import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function createUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function createUserPost() {
    fetch("http://3.34.1.138:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        phone: phone,
      }).then((respons) => respons.json()),
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.input}>
          <Text style={{ fontSize: 25, marginBottom: 10, color: "#fb5555" }}>
            회원가입
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="이메일"
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={(text) => setEmail(text)}
            defaultValue={email}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="비밀번호"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            defaultValue={password}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="비밀번호 확인"
            textContentType="password"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="이름"
            onChangeText={(text) => setName(text)}
            defaultValue={name}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="전화번호"
            onChangeText={(text) => setPhone(text)}
            defaultValue={phone}
          />
          <TouchableOpacity style={styles.signupBtn} onPress={createUserPost}>
            <Text style={{ color: "red" }}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    backgroundColor: "#fb5555",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 70,
    borderRadius: 15,
  },
  input: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: 300,
    height: 500,
    alignItems: "baseline",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  inputBox: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  signupBtn: {
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#fb5555",
    borderWidth: 1,
    padding: 10,
  },
});
