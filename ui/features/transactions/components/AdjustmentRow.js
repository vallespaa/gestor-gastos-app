import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../../../shared/styles/global';

export default function AdjustmentRow({ adjustment, account }) {
  return (
    <View style={styles.row}>
      <View style={[styles.iconContainer, { backgroundColor: COLORS.white }]}>
        <Ionicons name="pencil-outline" size={24} color={COLORS.black} />
      </View>
      <Text style={styles.label}>{account.name}</Text>
      <Text
        style={[
          styles.amount,
          { color: adjustment.amount < 0 ? COLORS.error : COLORS.success },
        ]}
      >
        {adjustment.amount.toFixed(2)}€
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
  amount: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});
