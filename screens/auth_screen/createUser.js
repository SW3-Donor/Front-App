import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { AuthContext } from "../../Context";

export default function createUser({ navigation }) {
  const { getServerUrl } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [userId, setUserId] = useState("");

  function closeModal() {
    console.log("isSuccess :>> ", isSuccess);
    setModalVisible(false);
    if (isSuccess)
      navigation.navigate("createSecondPassword", { userId: userId });
  }

  function createUserFetch() {
    const url = `${getServerUrl()}auth/register`;
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
        if (responseJson.message === "이미 가입되어 있는 메일입니다.") {
          Alert.alert("중복된 이메일", "이미 가입되어 있는 메일입니다");
        } else {
          setUserId(responseJson.userId);
          setIsSuccess(true);
          setModalVisible(true);
        }
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }

  function createUserBtn() {
    createUserFetch();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          onPress={closeModal}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20, marginBottom: 15 }}>
              회원가입이 완료되었습니다.
            </Text>
            <Text style={{ fontSize: 15 }}> 2차비밀번호를 설정합니다.</Text>
          </View>
        </TouchableOpacity>
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
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={{ color: "red" }}>뒤로가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
