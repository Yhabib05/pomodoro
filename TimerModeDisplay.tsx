import React from "react";
import {StyleSheet, Text, View} from 'react-native'

export type TimerModes = "Focus" | "Break";
type Props ={
    timerMode : TimerModes
}

export const TimerModeDisplay : React.FC<Props> = ({timerMode}) => {
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.timerModeText}>
                {timerMode} Time {timerMode === 'Focus' ? "👌" : "😉"} 
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        alignItems : "center",
        width: '100%',
    },
    timerModeText:{
        fontSize : 40,
        fontWeight: '800',
        color: "#fff"
    }
})