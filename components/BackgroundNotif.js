import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput, AppState } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

const BACKGROUND_FETCH_TASK = 'background-fetch';

const CURRENT_FUEL = 50;

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    //const client_token = await SecureStore.getItemAsync("client_token");
    
    const distance = await SecureStore.getItemAsync("distanceThreshold");
    console.log("Background task triggered");

    if(distance){
        if(Number(distance) > CURRENT_FUEL){
            setNotif(1, distance);
        }
    }
    await unregisterBackgroundFetchAsync();
    //setNotif(5);
  // Be sure to return the successful result type!
  return BackgroundFetch.Result.NewData;
});

// 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync(seconds) {
    console.log(`Registered seconds: ${seconds}`);
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: seconds,
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

const setNotif = (seconds, fuelLevel) => {
    const schedulingOptions = {
      content: {
        title: 'This is a notification',
        body: `Your fuel is below ${fuelLevel}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: "blue"
      },
      trigger: {
        seconds: seconds,
      },
    };
    // Notifications show only when app is not active.
    // (ie. another app being used or device's screen is locked)
    Notifications.scheduleNotificationAsync(
      schedulingOptions,
    );
  };

  const handleNotification = () => {
    console.warn('ok! got your notif');
  };

  const askNotification = async () => {
    // We need to ask for Notification permissions for ios devices
    const { status } = await Notifications.requestPermissionsAsync();
    if (Constants.isDevice && status === 'granted')
      console.log('Notification permissions granted.');
  };

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
    console.log("Unregistered task");
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function BackgroundNotif() {

    const TEN_MIN = 600000;
    const SIX_MIN = 360000;
    const THREE_MIN = 180000;
    const TWO_MIN = 120000;

    const minAdd = THREE_MIN;
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);
  const [notifTime, setNotifTime] = useState(String(Date.now() + minAdd));
  const [distanceThreshold, setDistanceThreshold] = useState("60");

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    askNotification();
    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    const listener = Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, []);


  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    getSavedData();
  }, []);

  const getSavedData = async () => {
    const distance = await SecureStore.getItemAsync("distanceThreshold");
    if(distance){
      setDistanceThreshold(String(distance));
    }
    const time = await SecureStore.getItemAsync("notifTime");
    if(time && Number(time) > Date.now()){
      setNotifTime(time);
    }else {
        SecureStore.setItemAsync("notifTime", notifTime);
    }
  };

  const _handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      await unregisterBackgroundFetchAsync();
    }else {
        registerTask();
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };

  useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
    console.log(`Registration status: ${status}`);
    console.log(`Is Registered: ${isRegistered}`);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {

    registerTask();
    }

    checkStatusAsync();
  };

  const registerTask = async () => {
    const time = await SecureStore.getItemAsync("notifTime");
    const timeNow = Date.now();
    console.log(timeNow);
    const intervalTime = Math.floor((Number(time) - Date.now())/1000);
    if(intervalTime > 0){
        console.log(`Interval seconds: ${intervalTime}`);
        console.log(`Interval minutes: ${Math.floor(intervalTime/60)}`);
        //console.log(`Notif Time: ${new Date(time)}`);
        console.log(`Notif Time: ${time}`);
        await registerBackgroundFetchAsync(intervalTime);
    }else {
        console.log(`Interval seconds: ${intervalTime}`);
        console.log(`Notif Time: ${time}`);
        //console.log(`Notif Time: ${new Date(time)}`);
        console.log("Time is negative.");
    }
  }

  const saveTime = async () => {
    SecureStore.setItemAsync("notifTime", notifTime);

  };

  const saveDistanceThreshold = async () => {
    SecureStore.setItemAsync("distanceThreshold", distanceThreshold);
  };

  

  return (
    <View >
        <Text>Stuff</Text>
        <Text>Stuff</Text>
        <Text>Stuff</Text>
      <View >
        <TextInput value={notifTime} onChangeText={setNotifTime}/>
      </View>
      <Button
        title={"Save Time"}
        onPress={saveTime}
      />
      <View >
        <TextInput value={distanceThreshold} onChangeText={setDistanceThreshold}/>
      </View>
      <Button
        title={"Save Distance"}
        onPress={saveDistanceThreshold}
      />
            <View>
        <Text>
          Background fetch status:{' '}
          <Text >{status ? BackgroundFetch.Status[status] : null}</Text>
        </Text>
        <Text>
          Background fetch task name:{' '}
          <Text >
            {isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
          </Text>
        </Text>
      </View>
      <Button
        title={isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
        onPress={toggleFetchTask}
      />
    </View>
  );
}
