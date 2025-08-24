import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../../../shared/styles/global';

export default function AccountCard({ account, balance, onPress }) {
  const { name } = account;
  const balanceColor = balance >= 0 ? COLORS.success : COLORS.error;

  return (
    <Pressable
      style={({ pressed }) => [
        pressed && styles.pressed
      ]}
      onPress={() => onPress?.(category)}
    >
      <View style={styles.card}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={[styles.balance, { color: balanceColor }]}>
          {Number(balance).toFixed(2)} €
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.lightGray,
    width: '100%',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '400',
  },
  balance: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});
