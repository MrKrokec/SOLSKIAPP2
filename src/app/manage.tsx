import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, TextInput, TouchableOpacity, View,
  FlatList, SafeAreaView,Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

interface Activity {
  id:string;
  title:string;
  subject:string;
  date:string;
}

export default function ManageScreen() {
  const[title,setTitle]=useState('');
  const[subject,setSubject]=useState('');
  const[date,setDate]=useState('');
  const[activities,setActivities]=useState<Activity[]>([]);
  const[errorMsg, setErrorMsg]=useState('');

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities=async () => {
    try {
      const storedData=await AsyncStorage.getItem('@school_activities');
      if(storedData) setActivities(JSON.parse(storedData));
    }catch (error) {
      console.error(error);
    }
  };

  const saveActivitiesObject=async(newActivities:Activity[]) => {
    try {
      await AsyncStorage.setItem('@school_activities',JSON.stringify(newActivities));
      setActivities(newActivities);
    }catch (error) {
      console.error(error);
    }
  };

  const handleAddActivity=() => {
    if (!title.trim() || !subject.trim() || !date.trim()) {
      setErrorMsg('Vsa polja morajo biti izpolnjena');
      return;
    }
    setErrorMsg('');

    const newActivity: Activity={
      id: Date.now().toString(),
      title,
      subject,
      date,
    };

    const updated=[newActivity, ...activities];
    saveActivitiesObject(updated);

    setTitle('');
    setSubject('');
    setDate('');
    Alert.alert('Uspeh', 'Aktivnost je bila uspesno dodana');
  };

  const handleDelete= (id.string) => {
    const updated= activities.filter((item) => item.id !== id);
    saveActivitiesObject(updated);
  };

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.headerTitle}>Upravljanje Aktivnosti</Text>

      <View style={styles.form}>
        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
        
        <TextInput
          style={styles.input}
          placeholder="Naziv aktivnosti"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Predmet"
          placeholderTextColor="#888"
          value={subject}
          onChangeText={setSubject}
        />
        <TextInput
          style={styles.input}
          placeholder="Rok oddaje"
          placeholderTextColor="#888"
          value={date}
          onChangeText={setDate}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddActivity}>

          <Text style={styles.addButtonText}>Dodaj Aktivnost</Text>

        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>Seznam za brisanje:</Text>
      <FlatList

        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.rowItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowSub}>{item.subject} - {item.date}</Text>
            </View>
            
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash-outline" size={22} color="#ff3b30" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 16, paddingTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  form: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 6, marginBottom: 10, backgroundColor: '#fafafa' },
  error: { color: '#ff3b30', marginBottom: 8, fontSize: 14 },
  addButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 6, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  subHeader: { fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#333' },
  rowItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 6, alignItems: 'center', marginBottom: 8 },
  rowTitle: { fontSize: 16, fontWeight: '500', color: '#333' },
  rowSub: { fontSize: 12, color: '#666' },
});