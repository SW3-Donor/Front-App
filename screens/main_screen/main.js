import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../Context";
import { useIsFocused } from "@react-navigation/native";

export default function main({ navigation }) {
  const { getServerUrl, getToken, setUserData, getUserData } = React.useContext(
    AuthContext
  );
  const [first, setFirst] = useState(true);
  const [data, setData] = useState([
    { _id: "", title: "", content: "" },
    { _id: "", title: "", content: "" },
    { _id: "", title: "", content: "" },
    { _id: "", title: "", content: "" },
  ]);
  const serverUrl = getServerUrl();
  const isFocused = useIsFocused();

  function refresh() {
    let url = `${serverUrl}profile/user`;
    let data = {
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
        setUserData(responseJson);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });

    url = `${serverUrl}board/posts`;
    data = {
      method: "GET",
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
        setData(responseJson.posts.reverse());
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }

  if (isFocused) {
    if (first) {
      setFirst(false);
      refresh();
    }
  } else if (!isFocused) {
    if (!first) {
      setFirst(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <View style={styles.profileText}>
          <TouchableOpacity onPress={() => navigation.navigate("mypage")}>
            <Text style={{ fontSize: 30 }}>{getUserData().name}</Text>
            <Text style={{ marginTop: 10, fontSize: 16 }}>
              {getUserData().email}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.titleBox}
          onPress={() => navigation.navigate("bloodList")}
        >
          <View style={styles.titleL}>
            <Text style={styles.titleText}>내 헌혈증</Text>
          </View>
          <View>
            <Text style={styles.titleText}>
              <Text>{getUserData().count}</Text>
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
            <Text
              style={styles.innerText}
              onPress={() => navigation.navigate("bloodList")}
            >
              헌혈증 내역보기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.box}>
        <TouchableOpacity onPress={() => navigation.navigate("boardList")}>
          <View style={styles.titleBox}>
            <View style={styles.titleL}>
              <Text style={styles.titleText}>기부 게시판</Text>
            </View>
            <View>
              <Text style={styles.titleText}>{">"}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("boardPost", { id: data[0]._id })
              }
            >
              <Text style={styles.title}>{data[0].title}</Text>
              <Text style={styles.content}>
                {data[0].content.substr(0, 64)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("boardPost", { id: data[1]._id })
              }
            >
              <Text style={styles.title}>{data[1].title}</Text>
              <Text style={styles.content}>
                {data[1].content.substr(0, 64)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("boardPost", { id: data[2]._id })
              }
            >
              <Text style={styles.title}>{data[2].title}</Text>
              <Text style={styles.content}>
                {data[2].content.substr(0, 64)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("boardPost", { id: data[3]._id })
              }
            >
              <Text style={styles.title}>{data[3].title}</Text>
              <Text style={styles.content}>
                {data[3].content.substr(0, 64)}
              </Text>
            </TouchableOpacity>
          </View>
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
  title: {
    fontSize: 18,
  },
  item: {
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
