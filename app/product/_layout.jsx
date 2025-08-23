import { Stack } from 'expo-router';

export default function ProductLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="[id]" 
        options={{ 
          title: "product",
          gestureEnabled: true ,
          fullScreenGestureEnabled: true,
        }} 
      />
      </Stack>
       );
    }