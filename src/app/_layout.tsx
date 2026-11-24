import { Tabs } from 'expo-router';

export default function TabLayout() {
return (
<Tabs>
<Tabs.Screen
name="index"
options={{ title: 'Pregled' }}
/>
<Tabs.Screen
name="manage"
options={{ title: 'Upravljanje' }}
/>
</Tabs>
);
}
