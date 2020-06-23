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

function Item({ title, content, id }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => console.log("id :>> ", id)}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function boardList({ navigation }) {
  const { getServerUrl, getToken } = React.useContext(AuthContext);
  const [first, setFirst] = useState(true);
  const [data, setData] = useState({});
  const serverUrl = getServerUrl();

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
        console.log(responseJson);
        setData(responseJson);
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
      <View>
        <FlatList
          data={data.posts}
          renderItem={({ item }) => (
            <Item title={item.title} content={item.content} id={item._id} />
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 8,
    paddingTop: 50,
  },
  item: {
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  title: {
    fontSize: 20,
  },
});
