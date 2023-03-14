import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [currentContact, setCurrentContact] = useState({});
  const [contacts, setContacts] = useState([]);

  useEffect( () => {
    ( async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers]
        });

        if (data.length > 0) {
          setCurrentContact(data[0]);
          console.log(data[0]);
          setContacts(data);
          console.log("contacts: " + contacts[0]);
        }
      }
    })()}, []);

  return (

    <View style={styles.container} >
      <Text>Current contact:</Text>
      <Text>{ currentContact.name }</Text>
      <Text>{ contacts[0].name }</Text>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

