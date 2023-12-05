import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { StackTypes } from '../../@types/navigationTypes';
import { colors } from '../../shared/themes/themes';
import { Background } from '../../shared/utils/images';
import { useDiaryStore } from '../../store/useDiaryStore';

interface TypeParams extends RouteProp<ParamListBase> {
  params: {
    id: string;
    text: string;
  };
}

const Details = () => {
  const [modal, setModal] = useState(false);

  const { params } = useRoute<TypeParams>();
  const { removeCard } = useDiaryStore();

  const navigation = useNavigation<StackTypes>();

  const handleRemove = (id: string) => {
    removeCard(id);
    setModal(false);
    navigation.goBack();
    Toast.show({
      type: 'success',
      topOffset: 60,
      text1: 'Note deleted successfully',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-outline"
            size={35}
            color={colors.support.primary}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Details</Text>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Ionicons
            name="information-circle-outline"
            size={35}
            color={colors.support.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Image source={Background} style={styles.image} />

        <View style={styles.card}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.cardText}>{params.text}</Text>
          </ScrollView>
        </View>

        <Modal visible={modal} transparent animationType="fade">
          <View style={styles.modal}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Do you want to delete this information?
              </Text>
              <View style={styles.modalRow}>
                <TouchableOpacity
                  onPress={() => setModal(false)}
                  style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleRemove(params.id)}
                  style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
  body: {
    alignItems: 'center',
    gap: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: colors.text.primary,
  },
  image: {
    height: 200,
    width: 200,
    borderWidth: 2,
    borderRadius: 999,
    borderColor: colors.support.primary,
  },
  card: {
    height: '64%',
    width: '100%',
    backgroundColor: colors.support.secundary,
    borderRadius: 50,
    padding: 20,
    paddingTop: 35,
    alignItems: 'flex-start',
  },
  cardText: {
    fontSize: 26,
    fontWeight: '300',
    color: colors.support.primary,
    fontStyle: 'italic',
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: 300,
    width: '90%',
    backgroundColor: colors.background,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  modalText: {
    fontSize: 24,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  modalRow: {
    flexDirection: 'row',
    gap: 20,
  },
  modalButton: {
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.support.primary,
    borderRadius: 12,
  },
  modalButtonText: {
    fontSize: 18,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
});

export default Details;
