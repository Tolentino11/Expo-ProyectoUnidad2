import React, { useState,useContext } from 'react';
import {auth,database} from '../../firebase';
import HomeList from './HomeList';
import {CustomInput,DeleteButton} from '../../components/showdetail';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

export default function HomeScreen() {
  const { user } = useContext(AuthenticatedUserContext);
  const [title, setTitle] = useState('');

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const additem = () => {
    const todoRef = database.ref('Todo/'+user.uid);
    const item = {
      title,
      completa: false,
      uid: user.uid,
    };

    todoRef.push(item);
  };
  return (
    <View style={styles.container}>
     
    <CustomInput onChange={handleOnChange} placeholder="Nueva nota" value={title} />
    
      <TouchableOpacity style={styles.button} onPress={additem}>
        <Text style={styles.buttonText}>Insertar nota</Text>
      </TouchableOpacity>
      
      <HomeList />
    </View>
    
    );
    
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "14%",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});