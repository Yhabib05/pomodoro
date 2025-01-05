import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, Modal, Pressable, TextInput } from 'react-native';
import {TimerCountDownDisplay} from './TimerCountDownDisplay';
import {TimerToggleButton} from './TimerToggleButton';
import {TimerModeDisplay, TimerModes} from './TimerModeDisplay'
import {ModalConfig} from './ModalConfig'

const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;//1000 = 1s
const BREAK_TIME_MINUTES = 0.1 * 60 * 1000;

export default function App() {
  const [focusTime, setFocusTime]=useState<number>(FOCUS_TIME_MINUTES);
  const [breakTime, setBreakTime]=useState<number>(BREAK_TIME_MINUTES);
  const [timerCount,setTimerCount] = useState<number>(focusTime)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout|null>(null);
  const [isTimerRunning, setIsTimerRunning] =useState<Boolean>(false);
  const [timerMode,setTimerMode] = useState<TimerModes>("Focus");
  const [modalVisible,setModalVisible] = useState<boolean>(false);
  const [customFocusTime,setCustomFocusTime] = useState<string>('');
  const [customBreakTime,setCustomBreakTime] = useState<string>('');

  useEffect(() => {
    if(timerCount===0){
      if (timerMode==='Focus'){
        setTimerMode('Break');
        setTimerCount(breakTime);
      } else {
        setTimerMode('Focus');
        setTimerCount(focusTime);
      }
      stopTimer();
    }
  },[timerCount])

  const startTimer = () =>{
    setIsTimerRunning(true);
    const id = setInterval(()=> setTimerCount(prev => prev-1000),1000);
    setTimerInterval(id);
  };

  const stopTimer = ()=>{
    if (timerInterval){
      window.clearInterval(timerInterval);
    }
    setIsTimerRunning(false);

  };

  const applyCustomTimes = () => {
    const newFocusTime = parseFloat(customFocusTime) * 60 * 1000 || focusTime;
    const newBreakTime = parseFloat(customBreakTime) * 60 * 1000 || breakTime;

    setFocusTime(newFocusTime);
    setBreakTime(newBreakTime);
    setTimerCount(newFocusTime); // Reset timer to new Focus Time
    setModalVisible(false);
  };

  return (
    <View style={{
      ...styles.container,
    ...{backgroundColor: timerMode ==='Break'? "#2a9d8f": '#d95550'

    }}}>
      <TimerModeDisplay timerMode={timerMode} />
      <StatusBar style="auto" />
      <TimerToggleButton isTimerRunning={isTimerRunning} startTimer={startTimer} stopTimer={stopTimer}   />
      <TimerCountDownDisplay timerDate={new Date(timerCount)}/>
      <Pressable
          style={[styles.button, styles.buttonOpen, { marginTop: 20 }]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.modalText}>Configure timer</Text>
      </Pressable>  
      <ModalConfig modalVisible={modalVisible} 
      setModalVisible={setModalVisible}
      customFocusTime={customFocusTime}
      setCustomFocusTime={setCustomFocusTime}
      customBreakTime={customBreakTime}
      setCustomBreakTime={setCustomBreakTime}
      applyCustomTimes={applyCustomTimes}
      />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d95550',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  modalText:{
    fontSize : 40,
    fontWeight: '800',
    color: 'white',
  },
});
