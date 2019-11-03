import React, { Component } from "react";

import { View, Button } from "react-native";

export default function Welcome (props){
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F6F6F6"
      }}
    >
      <View style={{ margin: 10 }}>
        <Button
          title="Sing In"
          onPress={() => props.navigation.navigate("Login")}
        />
      </View>

      <View style={{ margin: 10 }}>
        <Button
          title="Sing Up"
          onPress={() => props.navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};
