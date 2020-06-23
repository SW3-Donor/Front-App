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

function Me({ navigation, data }) {
  const { getServerUrl, getToken } = React.useContext(AuthContext);
  const serverUrl = getServerUrl();

  function deleteFatch(id) {
    console.log("delete!!!!");
    const url = `${serverUrl}board/post${id}`;
    const data = {
      method: "DELETE",
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
        navigation.goBack();
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <TouchableOpacity>
        <Text
          style={styles.button}
          onPress={() => {
            deleteFatch(data._id);
          }}
        >
          삭제하기
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={styles.button}
          onPress={() => {
            navigation.navigate("boardWrite", {
              mode: "edit",
              id: data._id,
              titleOrigin: data.title,
              contentOrigin: data.content,
              countOrigin: data.count,
            });
          }}
        >
          수정하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function NotMe({ navigation }) {
  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.button}>기부하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function boardList({ route, navigation }) {
  const { getServerUrl, getToken, getUserData } = React.useContext(AuthContext);
  const { id } = route.params;
  const [first, setFirst] = useState(true);
  const [data, setData] = useState({});
  const userData = getUserData();
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
        <Text>
          {data.received} / {data.count}
        </Text>
        {userData.email === data.email ? (
          <Me navigation={navigation} data={data} />
        ) : (
          <NotMe navigation={navigation} />
        )}
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
    marginLeft: 6,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
  },
});
