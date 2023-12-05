import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { uid } from 'uid';
import { z } from 'zod';
import { StackTypes } from '../../@types/navigationTypes';
import { colors } from '../../shared/themes/themes';
import { Background } from '../../shared/utils/images';
import { useDiaryStore } from '../../store/useDiaryStore';
import { useUserStore } from '../../store/useUserStore';

const schema = z
  .object({
    thoughts: z
      .string()
      .trim()
      .refine(data => data.trim().length > 3, {
        message: 'Thoughts must have at least 3 non-whitespace character',
      }),
  })
  .required();

type thoughtsSchemaData = z.infer<typeof schema>;

const Home = () => {
  const [currentDate, setCurrentDate] = useState('');

  const { removeName, name } = useUserStore();

  const { addCard, diaries, removeAll, removeCard } = useDiaryStore();

  const navigation = useNavigation<StackTypes>();

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<thoughtsSchemaData>({
    resolver: zodResolver(schema),
  });

  const handleRemove = (): void => {
    Toast.show({
      type: 'success',
      text1: 'User successfully logged out',
      topOffset: 60,
      visibilityTime: 2000,
    });
    removeName();
  };

  const onSubmit = (data: thoughtsSchemaData) => {
    const uuid = uid(10);
    addCard(uuid, data.thoughts);
    resetField('thoughts');
  };

  const handleRemoveAll = () => {
    removeAll();
    Toast.show({
      type: 'success',
      text1: 'Cleared all',
      topOffset: 60,
    });
  };

  useEffect(() => {
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    return setCurrentDate(`${day}-${month}-${year}`);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleRemove()}>
          <Ionicons
            name="log-out-outline"
            size={35}
            color={colors.support.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My personal Diary</Text>

        <Image source={Background} style={styles.image} />
      </View>

      <Text style={styles.title}>Hello {name}</Text>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="thoughts"
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              style={styles.input}
              placeholder="Any thoughts today?..."
              placeholderTextColor={colors.text.primary}
            />
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Ionicons
            name="add-outline"
            size={30}
            color={colors.support.primary}
          />
        </TouchableOpacity>
      </View>

      {diaries.length > 0 && (
        <TouchableOpacity onPress={handleRemoveAll}>
          <Text style={styles.clear}>Clear all</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={diaries}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.date}>{currentDate}</Text>
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('Detail', { id: item.id, text: item.text })
              }>
              <Image source={Background} style={styles.image} />
              <Text
                style={styles.cardText}
                lineBreakMode="clip"
                numberOfLines={3}>
                {item.text}
              </Text>

              <TouchableOpacity onPress={() => removeCard(item.id)}>
                <Ionicons
                  name="trash-outline"
                  color={colors.text.error}
                  size={30}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    gap: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    fontStyle: 'italic',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: colors.support.primary,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  inputContainer: {
    gap: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 55,
    width: '80%',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: colors.text.primary,
    borderWidth: 2,
    borderColor: colors.support.primary,
  },
  button: {
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    width: 55,
    backgroundColor: colors.support.secundary,
  },
  card: {
    height: 95,
    width: '100%',
    backgroundColor: colors.support.secundary,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
    marginVertical: 12,
  },
  cardText: {
    flex: 1,
    fontWeight: 'bold',
    color: colors.support.primary,
    paddingVertical: 12,
  },
  clear: {
    alignSelf: 'flex-end',
    fontSize: 18,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 16,
    color: colors.text.error,
  },
  date: {
    color: colors.text.primary,
  },
});

export default Home;
