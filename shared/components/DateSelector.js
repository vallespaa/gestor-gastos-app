import { useState } from "react";
import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FONT_SIZES, SPACING } from '../styles/global';

export default DateSelector = ({ date, setDate }) => {
	const [show, setShow] = useState(false);

	if (!date || !(date instanceof Date)) {
		date = new Date();
	}

	return (
		<View>
			<Pressable
				onPress={() => setShow(true)}
				style={({ pressed }) => ({
					opacity: pressed ? 0.2 : 1,
				})}
			>
				<Text style={styles.dateText}>Fecha: {date.toDateString()}</Text>
			</Pressable>

			{
				show && (
					<DateTimePicker
						value={date}
						mode="date"
						display={Platform.OS === 'ios' ? 'spinner' : 'default'}
						onChange={(e, selectedDate) => {
							setShow(false);
							if (selectedDate) setDate(selectedDate);
						}}
					/>
				)
			}
		</View >
	);
}

const styles = StyleSheet.create({
	dateText: {
		marginBottom: SPACING.sm,
		color: COLORS.black,
		fontSize: FONT_SIZES.md
	}
});
