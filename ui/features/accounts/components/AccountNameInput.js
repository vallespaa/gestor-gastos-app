import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../../../../shared/styles/global';

export default function AccountNameInput({ value, onChangeText, maxLength = 30 }) {
  const remainingChars = maxLength - (value?.length || 0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la cuenta</Text>
      <TextInput
        style={[
          styles.input,
          value && value.length > 0 && styles.inputWithText
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Ej: Cuenta corriente, Ahorros..."
        placeholderTextColor={COLORS.gray}
        maxLength={maxLength}
        autoCapitalize="words"
        returnKeyType="done"
      />
      <View style={styles.footer}>
        <Text style={styles.helperText}>
          Elige un nombre descriptivo para tu cuenta
        </Text>
        <Text style={[
          styles.charCounter,
          remainingChars < 5 && styles.charCounterWarning
        ]}>
          {remainingChars}/{maxLength}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.black,
  },
  inputWithText: {
    borderColor: COLORS.primary, // Cambia color cuando hay texto
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  helperText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray,
    flex: 1,
  },
  charCounter: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray,
  },
  charCounterWarning: {
    color: COLORS.warning, // Color cuando quedan pocos caracteres
  },
});