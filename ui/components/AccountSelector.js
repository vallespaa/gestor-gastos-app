import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Pressable,
  Modal,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZES,
} from '../../shared/styles/global';

export default function AccountSelector({
  accounts,
  selectedAccount,
  onSelect,
}) {
  const insets = useSafeAreaInsets();

  const [showModal, setShowModal] = useState(false);

  const handleSelect = (id) => {
    onSelect(id);
    setShowModal(false);
  };

  const getAccountName = (id) =>
    accounts?.find((a) => a.id === id)?.name || 'Predeterminada';

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.accountItem,
        pressed && { opacity: 0.5 },
        item.id === selectedAccount && styles.accountSelected,
      ]}
      onPress={() => handleSelect(item.id)}
    >
      <MaterialIcons name="credit-card" size={24} color={COLORS.black} />
      <Text style={styles.accountName}>{item.name}</Text>
    </Pressable>
  );

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.accountText} numberOfLines={1} ellipsizeMode="tail">
          {getAccountName(selectedAccount)}
        </Text>
        <MaterialIcons
          name="account-balance-wallet"
          size={22}
          color={COLORS.black}
        />
      </Pressable>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setShowModal(false)}
        />
        <View style={[styles.modalContainer, { bottom: insets.bottom }]}>
          <Text style={styles.modalTitle}>Selecciona una cuenta</Text>
          <FlatList
            data={accounts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={<Text>No hay cuentas disponibles</Text>}
          />
          <Pressable
            style={styles.closeButton}
            onPress={() => setShowModal(false)}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 130,
  },
  accountText: {
    marginRight: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.black,
    flexShrink: 1,
    maxWidth: 100,
  },
  pressed: { opacity: 0.5 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    position: 'absolute',
    width: '100%',
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
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  accountSelected: {
    backgroundColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.md,
  },
  accountName: { marginLeft: SPACING.md, fontSize: FONT_SIZES.md },
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
