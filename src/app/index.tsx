import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';


interface Activity {
  id: string;
  title: string;
  subject: string;
  date: string;
}

export default function HomeScreen() {
  const [activities, setActivities]= useState<Activity[]>([]);


  useFocusEffect(
    useCallback(() => {
      loadActivities();
    }, [])
  );

  const loadActivities=async () => {
    try {
      const storedData=await AsyncStorage.getItem('@school_activities');
      if (storedData) {
        setActivities(JSON.parse(storedData));
      }
    } catch(error) {
      console.error('Failed to load activities', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Pregled Solskih aktivnosti</Text>
      {activities.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Trenutno ni shranjenih aktivnosti.</Text>
          </View>
      ) : (
        <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => (
          <Animated.View entering={FadeInUp.delay(index * 100)} style={styles.card}>
            <View>

      <Text style={styles.activityTitle}>{item.title}</Text>
      <Text style={styles.activitySubject}>Predmet: {item.subject}</Text>
      <Text style={styles.activityDate}>Rok: {item.date}</Text>

      </View>
            </Animated.View>
        )}
        />
      )}
      </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  container: {flex:1,backgroundColor: '#f5f5f5', paddingHorizontal: 16, paddingTop: 40},
  headerTitle: {fontSize: 24, fontWeight: 'bold',marginBottom: 16, color: '#333'},
  
  card:{

    backgroundColor: '#fff',
    padding:16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 3,
  },

  activityTitle:{fontSize:18,fontWeight:'600',color:'#007AFF'},
  activitySubject:{fontSize:14,color:'#555',marginTop:4},
  activityDate:{fontSize: 12, color:'#888', marginTop: 2 },
  emptyContainer:{ flex: 1, justifyContent:'center', alignItems:'center' },
  emptyText:{ fontSize: 16, color:'#666' },
  });
 
