import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return(
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF', headerShown: false}}>
      <Tabs.Screen 
      name="index"
      options={{
        title: 'Pregled',
        tabBarIcon: ({color, focused}) => (
          <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color as string} />
        ),
      }}
      />
        <Tabs.Screen
        name='manage'
        options={{
          title: 'Upravljanje',
          tabBarIcon: ({color, focused}) => (
            <Ionicons name={focused ? 'create' : 'create-outline'} size={24} color={color as string} />
          ),
        }}
        />
        </Tabs>
  ); 
}