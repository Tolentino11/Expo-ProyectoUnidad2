import React, { useState, useEffect,useContext } from 'react';
import  { database } from '../../firebase';
import Items from './Home';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeList() {
    const { user } = useContext(AuthenticatedUserContext);
  const [Lista, setLista] = useState();

  useEffect(() => {
    const todoRef = database.ref('Todo/'+user.uid);
    todoRef.on('value', (snapshot) => {
      const items = snapshot.val();
      const Lista = [];
      for (let id in items) {
        Lista.push({ id, ...items[id] });
      }
      setLista(Lista);
    });
  }, []);

  return (
    <div>
    <ScrollView>
      {Lista
        ? Lista.map((item, index) => <Items item={item} key={index} />)
        : ''}
        </ScrollView>
    </div>
  );
}