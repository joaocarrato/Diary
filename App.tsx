import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import Router from './src/routes/router';
import { colors } from './src/shared/themes/themes';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.background} />
      <SafeAreaView style={styles.container}>
        <Router />
      </SafeAreaView>
      <Toast />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});

export default App;
