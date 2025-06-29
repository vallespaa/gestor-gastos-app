import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING } from '../styles/global';

export default Header = ({ amount, title }) => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Pressable
				style={({ pressed }) => [
					styles.menuButton,
					pressed && styles.pressed
				]}
				onPress={() => navigation.openDrawer()}
			>
				<Ionicons name="menu" size={24} color={COLORS.black} />
			</Pressable>
			{
				amount !== undefined && (
					<Text style={styles.amount}>{amount}€</Text>
				)
			}
			{title && <Text style={styles.title}>{title}</Text>}
		</View >
	);
};

const styles = StyleSheet.create({
	container: {
		padding: SPACING.md,
		alignItems: 'center',
		backgroundColor: COLORS.white,
	},
	menuButton: {
		position: 'absolute',
		left: SPACING.md,
		top: SPACING.md,
	},
	amount: {
		fontSize: FONT_SIZES.xxl,
		fontWeight: 'bold',
	},
	title: {
		fontSize: FONT_SIZES.xl,
		fontWeight: 'bold',
		marginTop: SPACING.sm,
	},
});
