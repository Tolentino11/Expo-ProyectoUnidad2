import React,{useContext} from 'react';
import {auth,database} from '../../firebase';
import {CustomInput,CompleteItem,DeleteItem} from '../../components/showdetail';
import { StyleSheet } from "react-native";
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import './HomeStyle.css';
export default function Home({ item }) {
    const { user } = useContext(AuthenticatedUserContext);
  const deleteItem = () => {
    const todoRef = database.ref('Todo/'+user.uid).child(item.id);
    todoRef.remove();
  };
  const completeItem = () => {
    const todoRef = database.ref('Todo/'+user.uid).child(item.id);
    todoRef.update({
      completa: !item.completa,
    });
  };
  return (
    <div>
      <h3 className={item.completa ? 'complete' : ''}  >{item.title}</h3>
      <CompleteItem onPress={completeItem}>
        <Ionicons name='checkmark-circle-outline' size={20}  />
      </CompleteItem>
      <DeleteItem onPress={deleteItem}>
        <Ionicons name='close-circle-outline' size={20}  />
      </DeleteItem>
    </div>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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