import { Modal, View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';

type ModalConfigProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    
    customFocusTime: string;
    setCustomFocusTime: (visible: string) => void;

    customBreakTime: string;
    setCustomBreakTime: (visible: string) => void;

    applyCustomTimes: () => void;
    

}

export const ModalConfig:React.FC<ModalConfigProps> = ({
    modalVisible,
    setModalVisible,
    customFocusTime,
    setCustomFocusTime,
    customBreakTime,
    setCustomBreakTime,
    applyCustomTimes,
})=> {
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() =>
            setModalVisible(false)}
            >
        <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
                <Text style={styles.modalHeaderText}>Set Your Custom Timer</Text>
                <TextInput
                placeholder='Focus Time (minutes)'
                keyboardType='numeric'
                value={customFocusTime}
                onChangeText={setCustomFocusTime}
                style={styles.inputField}
                />
                <TextInput
                placeholder='Break Time (minutes)'
                keyboardType='numeric'
                value={customBreakTime}
                onChangeText={setCustomBreakTime}
                style={styles.inputField}
                />
                <View style={styles.buttonContainer}>
                <Pressable
                //style={[styles.button, styles.buttonOpen]}
                onPress={applyCustomTimes}
                >
                <Text> Apply</Text>
                </Pressable>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={()=> setModalVisible(false)}
                >
                <Text> Cancel</Text>
                </Pressable>
            </View>
            </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText:{
        fontSize : 40,
        fontWeight: '800',
        color: 'white',
      },
      modalHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
      },
      inputField: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      modalTextButton: {
        marginBottom: 15,
        textAlign: 'center',
      },
});