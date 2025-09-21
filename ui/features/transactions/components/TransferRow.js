import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../../../shared/styles/global';

export default function TransferRow({ transfer, fromAccount, toAccount }) {
  return (
    <View style={styles.row}>
      <View style={[styles.iconContainer, { backgroundColor: COLORS.white }]}>
        <Ionicons
          name="swap-horizontal-outline"
          size={20}
          color={COLORS.black}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.subText}>{toAccount.name}</Text>
        <Text style={styles.label}>↳ {fromAccount.name}</Text>
      </View>
      <Text style={[styles.amount, { color: COLORS.black }]}>
        {transfer.amount.toFixed(2)}€
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  label: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: FONT_SIZES.md - 2,
    color: COLORS.gray,
  },
  amount: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
