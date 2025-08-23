import { useState} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../../../../shared/styles/global';

export default function BalanceInput({ value, onChangeText, onChangeDifference, isEditing }) {
  const [previousBalance] = useState(value || 0);

  const handleChangeText = (text) => {
    if (!text) {
      onChangeText(0);
      onChangeDifference(0 - previousBalance);
      return;
    }

    let formatted = text.replace(/[^0-9.,+-]/g, '');
    formatted = formatted.replace(/^([+-]?)(.*)$/, (m, sign, rest) => sign + rest.replace(/[+-]/g, ''));
    formatted = formatted.replace(/,/g, '.');

    onChangeText(formatted || 0);

    // Calculamos diferencia con el anterior
    const diff = parseFloat(formatted) - previousBalance;
    onChangeDifference(diff);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Balance {isEditing ? 'actual' : 'inicial'}
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>€</Text>
        <TextInput
          style={styles.input}
          value={value?.toString() || ''}
          onChangeText={handleChangeText}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor={COLORS.gray}
          maxLength={15}
        />
      </View>
      <Text style={styles.helperText}>
        {isEditing 
          ? 'Actualiza el balance actual de tu cuenta'
          : 'Ingresa el balance inicial (opcional)'
        }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
  },
  currencySymbol: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray,
    marginRight: SPACING.xs,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.black,
    paddingVertical: SPACING.sm,
  },
  helperText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray,
    marginTop: SPACING.xs,
  },
});