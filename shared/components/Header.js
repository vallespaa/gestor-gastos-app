import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../styles/global';

export default Header = ({ amount, title }) => {
	return (
		<View style={styles.container}>
			{amount !== undefined && (
				<Text style={styles.amount}>{amount}€</Text>
			)}
			{title && <Text style={styles.title}>{title}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: SPACING.md,
		alignItems: 'center',
		backgroundColor: COLORS.white,
	},
	amount: {
		fontSize: FONT_SIZES.xxl,
		fontWeight: 'bold',
	},
	title: {
		fontSize: FONT_SIZES.xl,
		fontWeight: 'bold',
		manginTop: SPACING.sm,
	},
});
