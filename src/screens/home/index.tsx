import React, { useState } from 'react';
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
import { uid } from 'uid';
import { IDiaryCard } from '../../@types/interface';
import { colors } from '../../shared/themes/themes';
import { Background } from '../../shared/utils/images';
import { useDiaryStore } from '../../store/useDiaryStore';
import { useUserStore } from '../../store/useUserStore';

const Home = () => {
  const { removeName, name } = useUserStore();
  const [input, setInput] = useState('');
  const [personalDiary, setPersonalDiary] = useState<Array<IDiaryCard>>([]);

  const { addCard, diaries, removeAll } = useDiaryStore();

  const handleRemove = (): void => {
    Toast.show({
      type: 'success',
      text1: 'Usuario deslogado com sucesso',
      topOffset: 60,
    });
    removeName();
  };

  const addThoughts = (text: string) => {
    if (input.length !== 0) {
      // setPersonalDiary([...personalDiary, { id: uid(10), text: text }]);
      const uuid = uid(10);
      addCard(uuid, text);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Campo não pode ser vázio.',
        topOffset: 60,
      });
    }
  };

  console.log(diaries);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleRemove()}>
          <Text>Sair</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My personal Diary</Text>

        <Image source={Background} style={styles.image} />
      </View>

      <Text style={styles.title}>Hello {name}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Any thoughts today?..."
          placeholderTextColor={colors.text.primary}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => addThoughts(input)}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {diaries.length > 0 && (
        <TouchableOpacity onPress={removeAll}>
          <Text style={styles.clear}>Clear all</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={diaries}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={Background} style={styles.image} />
            <Text
              style={styles.cardText}
              lineBreakMode="clip"
              numberOfLines={3}>
              {item.text}
            </Text>
          </TouchableOpacity>
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
  buttonText: {
    fontSize: 18,
    color: colors.support.primary,
    fontWeight: 'bold',
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
});

export default Home;
