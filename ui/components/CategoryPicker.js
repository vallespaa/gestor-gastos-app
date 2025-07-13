import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, SPACING, BORDER_RADIUS } from '../../shared/styles/global';

export default CategoryPicker = ({ categories, selectedCategory, onCategoryChange }) => {
	return (
		<View style={styles.pickerContainer}>
			<Picker
				selectedValue={selectedCategory}
				onValueChange={(itemValue) => onCategoryChange(itemValue)}
				style={styles.picker}
			>
				<Picker.Item label="Selecciona una categoría" value="" />
				{categories.map(cat => (
					<Picker.Item key={cat} label={cat} value={cat} />
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
		marginBotton: SPACING.md
	},
	picker: {
		height: SPACING.xl,
		width: '100%',
	},
});