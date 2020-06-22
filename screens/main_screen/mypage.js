import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../Context";

export default function myPage({ navigation }) {
  const { getServerUrl, getToken, signOut } = React.useContext(AuthContext);
  const [info, setInfo] = useState({ count: [] });
  const [first, setFirst] = useState(true);
  const [indicator, setIndicator] = useState(true);
  const serverUrl = getServerUrl();

  function refresh() {
    const url = `${serverUrl}profile/user`;
    const data = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    };

    fetch(url, data)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        setInfo(responseJson);
        setIndicator(false);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }

  if (first) {
    setFirst(false);
    refresh();
  }

  return (
    <View style={styles.container}>
      {indicator ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" style={{ alignItems: "center" }} />
        </View>
      ) : (
        <View style={styles.title}>
          <View>
            <Text style={{ marginBottom: 25, fontSize: 20 }}>내 정보</Text>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>
              <Text style={{ margin: 7 }}>이름 : </Text>
              <Text> {info.name}</Text>
            </Text>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>
              <Text style={{ margin: 7 }}>이메일 : </Text>
              <Text> {info.email}</Text>
            </Text>
            <Text style={{ marginBottom: 10, fontSize: 18 }}>
              <Text style={{ margin: 7 }}>보유 헌혈증 개수 : </Text>
              <Text> {info.count}</Text>
            </Text>
          </View>
          <View style={{ padding: 10, paddingHorizontal: 10, marginTop: 30 }}>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => navigation.navigate("editSecondPassword")}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                2차 비밀번호 수정
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => signOut()}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                로그아웃 하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => navigation.navigate("bloodList")}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                거래정보 보기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 30,
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
    marginBottom: 20,
  },
  title: {
    width: "95%",
    borderRadius: 15,
    borderWidth: 1,
    paddingTop: 30,
    padding: 20,
    marginBottom: 50,
  },
});
