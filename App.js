import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Provider, useSelector } from "react-redux";
import LoggedInTabStack from "./components/LoggedInTabStack";
import store from "./redux/configureStore";
import SignInSignUpScreen from "./screens/SignInSignUpScreen";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

function App() {
  const token = useSelector((state) => state.auth.token);
  const isDark = useSelector((state) => state.accountPrefs.isDark);
  console.log(token);
  return (
    <NavigationContainer>
      <StatusBar style={isDark ? "light" : "dark"} />
     <Stack.Navigator
          mode="modal"
          headerMode="none"
          initialRouteName={token != null ? "Logged In" : "SignInSignUp"}
          animationEnabled={false}>
        <Stack.Screen component={SignInSignUpScreen} name="SignInSignUp" />
        <Stack.Screen component={LoggedInTabStack} name="Logged In" />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
