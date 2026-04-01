import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainTabs from './src/navigation/MainTabs';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [session, setSession] = useState(null);

  if (!bootComplete) {
    return <LoadingScreen onComplete={() => setBootComplete(true)} />;
  }

  if (!session) {
    return <LoginScreen onLogin={setSession} />;
  }

  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}
