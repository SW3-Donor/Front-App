import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./Context";

import login from "./screens/auth_screen/login";
import createUser from "./screens/auth_screen/createUser";
import main from "./screens/main_screen/main";

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
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="main" component={main} />
  </HomeStack.Navigator>
);

export default function App() {
  const [userToken, setUserToken] = React.useState(null);
  const [userId, setUserId] = React.useState("");
  const authContext = React.useMemo(() => {
    return {
      setToken: (token) => {
        setUserToken(token);
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
