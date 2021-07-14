import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

const ToggleSwitch = ({isEnabled, setIsEnabled}) => {

  

  return (
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setIsEnabled(previousState => !previousState)}
        value={isEnabled}
      />

  );
}


export default ToggleSwitch;