import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  VirtualizedList,
  ActivityIndicator,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../Context";

function Item({ title, date }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{date}</Text>
    </View>
  );
}

function Viewblood({ info }) {
  return (
    <View style={{ marginBottom: 30 }}>
      <FlatList
        data={info.myblood}
        renderItem={({ item }) => (
          <Item title={item.validnumber} date={item.updatedAt} />
        )}
        keyExtractor={(item) => item._id}
      ></FlatList>
    </View>
  );
}

function ViewSend({ info }) {
  return (
    <View>
      <FlatList
        data={info.sendtrade}
        renderItem={({ item }) => (
          <Item title={item.receiver} date={item.updatedAt} />
        )}
        keyExtractor={(item) => item._id}
      ></FlatList>
    </View>
  );
}

function ViewReceive({ info }) {
  return (
    <View>
      <FlatList
        data={info.receivetrade}
        renderItem={({ item }) => (
          <Item title={item.sender} date={item.updatedAt} />
        )}
        keyExtractor={(item) => item._id}
      ></FlatList>
    </View>
  );
}

export default function bloodList({ navigation }) {
  const { getServerUrl, getToken } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState({ count: [] });
  const serverUrl = getServerUrl();
  const [bloodVisible, setBloodVisible] = useState(true);
  const [sendVisivle, setSendVisible] = useState(false);
  const [receiveVisivle, setReceiveVisible] = useState(false);
  const [first, setFirst] = useState(true);
  const [btn1, setBtn1] = useState(true);
  const [btn2, setBtn2] = useState(false);
  const [btn3, setBtn3] = useState(false);
  const [indicator, setIndicator] = useState(true);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={btn1 ? styles.clickedButtonLayout : styles.buttonLayout}
          onPress={() => {
            setBtn1(true);
            setBtn2(false);
            setBtn3(false);
            setBloodVisible(true);
            setSendVisible(false);
            setReceiveVisible(false);
          }}
        >
          <Text style={styles.buttonText}>보유 헌혈증</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={btn2 ? styles.clickedButtonLayout : styles.buttonLayout}
          onPress={() => {
            setBtn1(false);
            setBtn2(true);
            setBtn3(false);
            setBloodVisible(false);
            setSendVisible(true);
            setReceiveVisible(false);
          }}
        >
          <Text style={styles.buttonText}>보낸 내역</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={btn3 ? styles.clickedButtonLayout : styles.buttonLayout}
          onPress={() => {
            setBtn1(false);
            setBtn2(false);
            setBtn3(true);
            setBloodVisible(false);
            setSendVisible(false);
            setReceiveVisible(true);
          }}
        >
          <Text style={styles.buttonText}>받은 내역</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: "right", marginBottom: 10, fontSize: 18 }}>
        <Text>소유하고 있는 헌혈증</Text>
        <Text> {info.count} 개 </Text>
      </Text>
      <View style={{ flex: 1 }}>
        {indicator ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" style={{ alignItems: "center" }} />
          </View>
        ) : null}
        {bloodVisible ? <Viewblood info={info} /> : null}
        {sendVisivle ? <ViewSend info={info} /> : null}
        {receiveVisivle ? <ViewReceive info={info} /> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 20,
  },
  buttonView: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  buttonLayout: {
    flex: 1,
    alignItems: "center",
    borderRadius: 30,
    margin: 10,
  },
  clickedButtonLayout: {
    flex: 1,
    alignItems: "center",
    borderRadius: 30,
    margin: 10,
    backgroundColor: "#ffbfbf",
  },
  buttonText: {
    fontSize: 15,
    padding: 8,
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
  },
  item: {
    padding: 15,
    marginVertical: 1,
    marginHorizontal: 4,
  },
  title: { fontSize: 18 },
  content: { fontSize: 13, textAlign: "right" },
});
