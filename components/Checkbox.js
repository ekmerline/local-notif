import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 

const Checkbox = ({isChecked, setIsChecked}) => {


const checkIcon = isChecked ? "check-square-o" : "square-o";

  return (
    <View>
        <Pressable onPress={()=> setIsChecked(isChecked => !isChecked)}>
            <FontAwesome name={checkIcon} size={24} color="black" />
            <Text>Repeat</Text>
        </Pressable>
    </View>
  );
};

export default Checkbox;