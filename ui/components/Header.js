import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING } from '../styles/global';

const Drawer = createDrawerNavigator();

export default Header = ({ amount, title }) => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Pressable onPress={() => navigation.openDrawer()} style={styles.menuButton}>
				<Ionicons name="menu" size={24} color={COLORS.black} />
			</Pressable>
			<View style={styles.centerContent}>
				{amount !== undefined && (
					<Text style={styles.amount}>{amount}€</Text>
				)}
				{title && <Text style={styles.title}>{title}</Text>}
			</View>
			<View style={styles.menuButton} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: SPACING.md,
		backgroundColor: COLORS.white,
		justifyContent: 'space-between',
	},
	menuButton: {
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	centerContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
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
