import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, SPACING, BORDER_RADIUS } from '../../shared/styles/global';

export default function CategoryPicker({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => onCategoryChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona una categoría" value="" />
        {categories.map((cat) => (
          <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  picker: {
    height: SPACING.xl,
    width: '100%',
  },
});
