import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./Context";

import login from "./screens/auth_screen/login";
import createUser from "./screens/auth_screen/createUser";
import createSecondPassword from "./screens/auth_screen/createSecondPassword";

import main from "./screens/main_screen/main";
import bloodRegister from "./screens/main_screen/bloodRegister";
import checkSecondPassword from "./screens/main_screen/checkSecondPassword";

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="Auth" component={AuthScreen} />
  </RootStack.Navigator>
);

const AuthStack = createStackNavigator();
const AuthScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="logIn" component={login} />
    <AuthStack.Screen name="createUser" component={createUser} />
    <AuthStack.Screen
      name="createSecondPassword"
      component={createSecondPassword}
    />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="main"
      component={main}
      options={{ title: "도너", headerTintColor: "#fb5555" }}
    />
    <HomeStack.Screen
      name="checkSecondPassword"
      component={checkSecondPassword}
      options={{ title: "2차 비밀번호 확인", headerTintColor: "#fb5555" }}
    />
    <HomeStack.Screen
      name="bloodRegister"
      component={bloodRegister}
      options={{ title: "헌혈증 추가", headerTintColor: "#fb5555" }}
    />
  </HomeStack.Navigator>
);

export default function App() {
  const [userToken, setUserToken] = React.useState(null);
  const [userId, setUserId] = React.useState("");
  const [serverUrl, setServerUrl] = React.useState(
    "http://192.168.0.135:8080/"
  );
  const authContext = React.useMemo(() => {
    return {
      getServerUrl: () => {
        return serverUrl;
      },
      setToken: (token) => {
        setUserToken(token);
      },
      getToken: () => {
        return userToken;
      },
      signOut: () => {
        setUserToken(null);
        serUserId(null);
      },
      setUserId: (userId) => {
        setUserId(userId);
      },
      getUserId: () => {
        return userId;
      },
    };
  });

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? <HomeStackScreen /> : <RootStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
