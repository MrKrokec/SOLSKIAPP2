import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

type Activity = {
id: string;
title: string;
date: string;
subject: string;
};

export default function HomeScreen() {
const [activities, setActivities] = useState<Activity[]>([]);


useFocusEffect(
React.useCallback(() => {
loadActivities();
}, [])
);

const loadActivities = async () => {
try {
const storedData = await AsyncStorage.getItem('@school_activities');
if (storedData !== null) {
setActivities(JSON.parse(storedData));
}
} catch (error) {
console.error('Napaka pri nalaganju:', error);
}
};

return (
<SafeAreaView style={styles.container}>
<Text style={styles.headerTitle}>Pregled šolskih aktivnosti</Text>

{activities.length === 0 ? (
<View style={styles.emptyContainer}>
<Text style={styles.emptyText}>Trenutno ni shranjenih aktivnosti.</Text>
</View>
) : (
<FlatList
data={activities}
keyExtractor={(item, index) => index.toString()}
renderItem={({ item }) => (
<View style={styles.card}>
<Text style={styles.activityTitle}>{item.title}</Text>
<Text style={styles.activitySubject}>Predmet: {item.subject}</Text>
<Text style={styles.activityDate}>Rok: {item.date}</Text>
</View>
)}
/>
)}
</SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#f5f5f5',
paddingHorizontal: 16,
paddingTop: 40,
},

headerTitle: {
fontSize: 22,
fontWeight: 'bold',
marginBottom: 16,
color: '#333',
},

card: {
backgroundColor: '#fff',
padding: 16,
borderRadius: 8,
marginBottom: 12,
},

activityTitle: {
fontSize: 18,
fontWeight: 'bold',
color: '#007AFF',
},

activitySubject: {
fontSize: 14,
color: '#555',
marginTop: 4,
},

activityDate: {
fontSize: 12,
color: '#888',
marginTop: 2,
},

emptyContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},

emptyText: {
fontSize: 16,
color: '#666',
},

});
