import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { colors } from '../../shared/themes/themes';
import { Background } from '../../shared/utils/images';
import { useUserStore } from '../../store/useUserStore';

const Initial = () => {
  const [user, setUser] = useState('');

  const { name, addName, removeName } = useUserStore();

  const handleAdd = (name: string) => {
    if (user.length !== 0) {
      return (
        addName(name),
        Toast.show({
          type: 'success',
          text1: 'User logged in successfully',
          topOffset: 80,
          visibilityTime: 2000,
        })
      );
    } else {
      return Toast.show({
        type: 'error',
        text1: 'Invalid User',
        topOffset: 80,
        visibilityTime: 2000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Background} style={styles.image} />
      <Text style={styles.title}>
        Unleash Your Thoughts, Capture Your Moments. Your Personal Diary, Always
        by Your Side.
      </Text>

      <TextInput
        value={user}
        onChangeText={setUser}
        placeholder="Enter with your name..."
        placeholderTextColor={colors.text.primary}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={() => handleAdd(user)}>
        <Text style={styles.textButton}>Enter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: colors.background,
  },
  image: { height: 300, width: 300 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 55,
    width: '95%',
    borderWidth: 1,
    borderColor: colors.support.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: colors.text.primary,
  },
  button: {
    height: 55,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.support.secundary,
    borderRadius: 12,
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.support.primary,
  },
  error: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.error,
  },
});

export default Initial;
