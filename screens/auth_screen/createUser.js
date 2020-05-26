import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { AuthContext } from "../../Context";

export default function createUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function createUserFetch() {
    // fetch("http://3.34.1.138:8080/auth/register", {
    const url = "http://192.168.0.135:8080/auth/register";
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        phone: phone,
      }),
    };

    fetch(url, data)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        setModalVisible(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function createUserBtn() {
    createUserFetch();
    console.log(modalVisible);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View style={styles.modalView}>
            <Text>회원가입이 완료되었습니다.</Text>
          </View>
        </View>
      </Modal>

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
          <TouchableOpacity style={styles.signupBtn} onPress={createUserBtn}>
            <Text style={{ color: "red" }}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "red" }}>asdfasdf</Text>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
});
