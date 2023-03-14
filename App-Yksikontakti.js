import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

/*
Object {
  "contactType": "person",
  "firstName": "Ville",
  "id": "2E6585FF-C8F0-4A6E-91DF-828280C8462F",
  "imageAvailable": false,
  "lastName": "Koponen",
  "name": "Ville Koponen",
  "phoneNumbers": Array [
    Object {
      "countryCode": "fi",
      "digits": "+358451145979",
      "id": "1AAD1177-3204-4C2E-AE8E-817911832ED7",
      "label": "mobile",
      "number": "+358451145979",
    },
  ],
}
*/
export default function App() {
  const [currentContact, setCurrentContact] = useState({});
  //const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      });

      if (data.length > 0) {
        setCurrentContact(data[0]);
        console.log(data[0]);
        console.log(data);
      }
    }
  }

  
  return (

    <View style={styles.container} >
      <Text>Current contact:</Text>
      <Text>{ currentContact.name }</Text>
      <Text>{ currentContact.phoneNumbers[0].number }</Text>
      <Button title="Get contact" onPress={ getContacts } />
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

