import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function main({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <View style={styles.profileText}>
          <Text style={{ fontSize: 30 }}>강용재</Text>
          <Text style={{ marginTop: 10, fontSize: 16 }}>k33721@gmail.com</Text>
        </View>
        <View style={styles.profileImg}></View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.titleBox}>
          <View style={styles.titleL}>
            <Text style={styles.titleText}>내 헌혈증</Text>
          </View>
          <View>
            <Text style={styles.titleText}>
              <Text>10</Text>
              <Text>장 {">"}</Text>
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.innerBtn}>
            <Text
              style={styles.innerText}
              onPress={() => navigation.navigate("bloodRegister")}
            >
              헌혈증 등록하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.innerBtn}>
            <Text
              style={styles.innerText}
              onPress={() => navigation.navigate("bloodSendMail")}
            >
              헌혈증 보내기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.innerBtn}>
            <Text style={styles.innerText}>헌혈증 내역보기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.box}>
        <View style={styles.titleBox}>
          <View style={styles.titleL}>
            <Text style={styles.titleText}>기부 게시판</Text>
          </View>
          <View>
            <Text style={styles.titleText}>{">"}</Text>
          </View>
        </View>
        <View>
          <View></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  line: {
    borderBottomWidth: 1,
    backgroundColor: "black",
  },
  box: {
    marginBottom: 10,
    width: "100%",
    borderColor: "#eeeeee",
    borderTopWidth: 1,
    padding: 15,
  },
  profileBox: {
    marginBottom: 10,
    width: "100%",
    padding: 15,
    flexDirection: "row",
  },
  profileText: {
    flex: 2,
  },
  profileImg: {
    flex: 1,
    backgroundColor: "#dddddd",
  },
  titleL: {
    flex: 1,
  },
  titleR: {
    flexDirection: "column",
  },
  titleText: {
    fontSize: 24,
  },
  titleBox: {
    flexDirection: "row",
    marginBottom: 10,
  },
  innerBtn: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginTop: 10,
  },
  innerText: {
    fontSize: 18,
  },
});
