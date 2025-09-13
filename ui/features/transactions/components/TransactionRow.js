import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../../../shared/styles/global';

export default function TransactionRow({ transaction, category, onPress }) {
  return (
    <Pressable
      onPress={() => onPress(transaction)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
        <Ionicons name={category.icon} size={20} color="white" />
      </View>
      <Text style={styles.label}>{category.name}</Text>
      <Text style={[styles.amount, { color: transaction.type === 'GASTOS' ? COLORS.error : COLORS.success }]}>
        {transaction.type === 'GASTOS' ? '-' : ''}{transaction.amount.toFixed(2)}€
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  label: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    fontWeight: "bold"
  },
  amount: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.5,
  },
});