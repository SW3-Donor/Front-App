import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../../Context";

export default function login({ navigation }) {
  const { setToken } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signIn() {
    const url = "http://192.168.0.135:8080/auth/login";
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch(url, data)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        setToken(responseJson.token);
      })
      .catch((error) => {
        alert("test");
      });
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/donor.png")} style={styles.logo} />
      <View style={styles.form}>
        <View style={styles.input}>
          <Text style={{ fontSize: 25, marginBottom: 10, color: "#fb5555" }}>
            로그인
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
          <TouchableOpacity style={styles.loginBtn} onPress={() => signIn()}>
            <Text style={{ color: "white" }}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupBtn}
            onPress={() => navigation.navigate("createUser")}
          >
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
  logo: {
    width: 200,
    resizeMode: "contain",
    marginBottom: 10,
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
    height: 400,
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
  loginBtn: {
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#fb5555",
    padding: 10,
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
