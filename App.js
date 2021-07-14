import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import AppStateExample from './components/AppStateExample';
import BackgroundNotif from './components/BackgroundNotif';


function App() {

  // const [isChecked, setIsChecked] = useState(false);

  const [notifData, setNotifData] = useState({
    mileage: 50,
    active: true,
    time: new Date(1598051730000),
    repeat: true
  });

  const [distanceThreshold, setDistanceThreshold] = useState("");
  //const [text, onChangeText] = useState("Useless Text");
  return (
    <>
      {/* <TimerNotification/> */}
    {/* <Checkbox isChecked={isChecked} setIsChecked={setIsChecked}/> */}
    {/* <ToggleSwitch /> */}
    {/* <TimePicker /> */}
    {/* <Mileage
    notifData={notifData}
    setNotifData={setNotifData}
    /> */}
    {/* <TestInput /> */}
  
    <BackgroundNotif />
    {/* <TextInput 
            styles={styles.input}
            keyboardType='numeric'
            onChangeText={setDistanceThreshold}
            value={distanceThreshold}
            /> */}
      {/* <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default App;