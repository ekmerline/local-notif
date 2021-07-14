import React, {useState} from 'react';
import {View, Button, Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePicker = ({time, setTime}) => {

  //const [date, setDate] = useState(new Date(1598051730000));

  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShow(Platform.OS === 'ios');
    setTime(currentDate);
  };


  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <View>
      <Button onPress={showTimepicker} title="C" />
      <Text>{time.toString()}</Text>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode='time'
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default TimePicker;