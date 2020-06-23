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

export default function boardList({ route, navigation }) {
  const { getServerUrl, getToken } = React.useContext(AuthContext);
  const { id } = route.params;
  const [first, setFirst] = useState(true);
  const [data, setData] = useState({});
  const serverUrl = getServerUrl();

  function refresh() {
    const url = `${serverUrl}board/post${id}`;
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
        console.log(responseJson);
        setData(responseJson.post);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.titleView}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{data.name}</Text>
          <Text>{data.updatedAt}</Text>
        </View>
        <Text style={{ marginRight: 10 }}>
          {data.received} / {data.count}
        </Text>
        <TouchableOpacity>
          <Text style={styles.button}>기부하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.postView}>
        <ScrollView>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={{ fontSize: 15 }}>{data.content}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  postView: {
    flex: 1,
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#fb5555",
    borderRadius: 8,
    alignItems: "center",
    color: "#ffffff",
    marginBottom: 3,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
  },
});
