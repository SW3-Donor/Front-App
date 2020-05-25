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

export default function App() {
  const [userToken, setUserToken] = React.useState(null);
  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setUserToken("asdf");
      },
      signOut: () => {
        setUserToken(null);
      },
    };
  });

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
          <HomeStack.Navigator>
            <HomeStack.Screen name="main" component={main} />
          </HomeStack.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
