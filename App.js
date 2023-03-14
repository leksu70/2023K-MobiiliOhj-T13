import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

/*
Object {
  "contactType": "person",
  "firstName": "Matti",
  "id": "2E6585FF-C8F0-4A6E-91DF-828280C8462F",
  "imageAvailable": false,
  "lastName": "Koponen",
  "name": "Matti Koponen",
  "phoneNumbers": Array [
    Object {
      "countryCode": "fi",
      "digits": "+358451140000",
      "id": "1AAD1177-3204-4C2E-AE8E-817911832ED7",
      "label": "mobile",
      "number": "+358451140000",
    },
  ],
}
*/
export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      });

      if (data.length > 0) {
        setContacts(data);
        console.log(data[0]);
        console.log(contacts.length);
      }
    }
  }

  
  return (

    <View style={styles.container} >
      <Text style={{ fontWeight: 'bold' }}>Currently available contacts: { contacts.length }</Text>
      <FlatList style={ styles.flatlist }
        keyExtractor={ item => item.id.toString() }
        data={ contacts }
        renderItem={({ item }) => 
          <View>
            <Text style={ styles.listname } >{ item.name } 
            <Text style={ styles.listphone }>     { item.phoneNumbers ? item.phoneNumbers[0].number : "" }</Text>
            </Text></View>
        }
      />
      <Button title="Get contacts" onPress={ getContacts } />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20, // Näyttää iPhonessa paremmalta paddingin kanssa.
    paddingTop: 45,
  },
  flatlist: {
    flex: 1,
  },
  listname: {
    fontWeight: 'bold',
  },
  listphone: {
    fontWeight: 'normal',
  },
});
