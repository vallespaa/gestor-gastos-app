import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../../../shared/styles/global';

export default function CategoryNameInput({ value, onChangeText, maxLength = 20 }) {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder="Ingresa el nombre de la categoría"
        placeholderTextColor={COLORS.gray}
        maxLength={maxLength}
      />
      <Text style={styles.charCount}>{value.length}/{maxLength}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  charCount: {
    textAlign: 'right',
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
  },
});