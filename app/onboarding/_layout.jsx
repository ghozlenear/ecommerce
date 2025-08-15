import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Onboarding",
          gestureEnabled: true ,
          fullScreenGestureEnabled: true
        }} 
      />
      <Stack.Screen 
        name="page2" 
        options={{ 
          title: "Onboarding Page 2",
          gestureEnabled: true ,
          fullScreenGestureEnabled: true
        }} 
      />
      <Stack.Screen 
        name="page3" 
        options={{ 
          title: "Onboarding Page 3",
          gestureEnabled: true,
          fullScreenGestureEnabled: true
        }} 
      />
    </Stack>
  );
}
