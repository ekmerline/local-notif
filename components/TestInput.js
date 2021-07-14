import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';
//import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from './Checkbox';
import ToggleSwitch from './ToggleSwitch';
import TimePicker from './TimePicker';



export default function TestInput() {



    const [distanceThreshold, setDistanceThreshold] = useState("");




    return (
        <>
            <TextInput 
            styles={styles.input}
            keyboardType='numeric'
            onChangeText={setDistanceThreshold}
            value={distanceThreshold}
            />
        </>
    );
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1
    },
  });