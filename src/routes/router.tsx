import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Initial from '../screens/Initial';
import Home from '../screens/home';
import { useUserStore } from '../store/useUserStore';

const Stack = createNativeStackNavigator();

const router = () => {
  const { name } = useUserStore();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {name.length === 0 ? (
        <Stack.Screen name="Initial" component={Initial} />
      ) : (
        <Stack.Screen name="Home" component={Home} />
      )}
    </Stack.Navigator>
  );
};

export default router;
