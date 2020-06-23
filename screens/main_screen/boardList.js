import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { TextInput, ScrollView, FlatList } from "react-native-gesture-handler";
import { AuthContext } from "../../Context";
import { useIsFocused } from "@react-navigation/native";

function Item({ title, content, id, navigation }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate("boardPost", { id: id })}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content.substr(0, 64)}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function boardList({ navigation }) {
  const { getServerUrl, getToken, getUserData } = React.useContext(AuthContext);
  const [first, setFirst] = useState(true);
  const [data, setData] = useState([]);
  const [isMine, setIsMine] = useState(false);
  const email = getUserData().email;
  const serverUrl = getServerUrl();
  const isFocused = useIsFocused();

  function refresh() {
    const url = `${serverUrl}board/posts`;
    const data = {
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

  function getMine() {
    return data.filter((post) => post.email === email);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => refresh()}>
          <Text style={styles.button}>새로고침</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsMine((mine) => !mine)}>
          <Text style={styles.button}>
            {isMine ? "전체보기" : "내 글 모아보기"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("boardWrite", { mode: "write" })}
        >
          <Text style={styles.button}>글쓰기</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={isMine ? getMine() : data}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              content={item.content}
              id={item._id}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item._id}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 8,
  },
  item: {
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    padding: 10,
    backgroundColor: "#fb5555",
    borderRadius: 8,
    alignItems: "center",
    color: "#ffffff",
    marginBottom: 3,
    marginRight: 5,
  },
  title: {
    fontSize: 18,
  },
});
