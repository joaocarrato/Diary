import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { z } from 'zod';
import { colors } from '../../shared/themes/themes';
import { Background } from '../../shared/utils/images';
import { useUserStore } from '../../store/useUserStore';

const schema = z.object({
  user: z.string().min(3, 'User must have at least 3 characters').trim(),
});

type userSchemaData = z.infer<typeof schema>;

const Initial = () => {
  const [user, setUser] = useState('');

  const { name, addName, removeName } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<userSchemaData>({
    resolver: zodResolver(schema),
  });

  const handleAdd = (data: userSchemaData) => {
    addName(data.user);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.keyboardContainer}
      scrollEnabled={false}>
      <View style={styles.container}>
        <Image source={Background} style={styles.image} />
        <Text style={styles.title}>
          Unleash Your Thoughts, Capture Your Moments. Your Personal Diary,
          Always by Your Side.
        </Text>
        
        <Controller
          control={control}
          name="user"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Enter with your name..."
              placeholderTextColor={colors.text.primary}
              style={styles.input}
            />
          )}
        />
        {errors && <Text style={styles.error}>{errors.user?.message}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleAdd)}>
          <Text style={styles.textButton}>Enter</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: '25%',
  },
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
    color: colors.text.error,
  },
});

export default Initial;
