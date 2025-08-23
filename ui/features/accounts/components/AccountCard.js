import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../../../shared/styles/global';

export default function AccountCard({ account, balance }) {
  const { name } = account;
  const balanceColor = balance >= 0 ? COLORS.success : COLORS.error;

  return (
    <View style={styles.card}>
      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        {name}
      </Text>
      <Text style={[styles.balance, { color: balanceColor }]}>
        {Number(balance).toFixed(2)} €
      </Text>
    </View>
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
});
