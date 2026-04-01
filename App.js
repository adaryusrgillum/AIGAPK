import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import MainTabs from './src/navigation/MainTabs';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';

function AppGate() {
  const { user, initializing } = useAuth();
  const [bootComplete, setBootComplete] = useState(false);

  if (!bootComplete || initializing) {
    return <LoadingScreen onComplete={() => setBootComplete(true)} />;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppGate />
    </AuthProvider>
  );
}
