import { useState } from 'react';
import { Pressable, TextInput, View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZES,
} from '../../shared/styles/global';

export default function NoteInput({ note, onChangeNote }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => setShowModal(true)}
      >
        <MaterialIcons name="create" size={24} color={COLORS.black} />
      </Pressable>

      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        onSwipeComplete={() => setShowModal(false)}
        swipeDirection="down"
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
        propagateSwipe
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Escribe una nota</Text>
          <TextInput
            style={styles.input}
            placeholder="Notas"
            placeholderTextColor={COLORS.gray}
            onChangeText={onChangeNote}
            multiline
            textAlignVertical="top"
          />
          <Pressable
            style={styles.closeButton}
            onPress={() => setShowModal(false)}
          >
            <Text style={styles.closeButtonText}>
              {note.trim() ? 'Guardar' : 'Cerrar'}
            </Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: { opacity: 0.5 },
  modal: { justifyContent: 'flex-end', margin: 0 },
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
  },
  modalTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  input: {
    color: COLORS.black,
    minHeight: 80,
    maxHeight: 200,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.md,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.md,
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    textAlign: 'center',
  },
});
