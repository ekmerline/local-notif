import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';
//import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from './Checkbox';
import ToggleSwitch from './ToggleSwitch';
import TimePicker from './TimePicker';



export default function Mileage({ notifData, setNotifData }) {



    const [distanceThreshold, setDistanceThreshold] = useState(notifData.mileage.toString());
    const [isChecked, setIsChecked] = useState(notifData.repeat);
    const [isEnabled, setIsEnabled] = useState(notifData.active);
    const [notifTime, setNotifTime] = useState(notifData.time);


    const saveNotifData = () => {
        setNotifData({
            mileage: Number(distanceThreshold),
            active: isEnabled,
            time: notifTime,
            repeat: isChecked
        });
    };



    return (
        <>
        <View>
            <TextInput 
            styles={styles.input}
            keyboardType='numeric'
            onChangeText={setDistanceThreshold}
            value={distanceThreshold}
            />
        </View>
            <ToggleSwitch 
            isEnabled={isEnabled}
            setIsEnabled={setIsEnabled}
            />
            <TimePicker 
            time={notifTime}
            setTime={setNotifTime}
            />
            
            <Checkbox
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            />
        <Button onPress={saveNotifData} title="Save"/>
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