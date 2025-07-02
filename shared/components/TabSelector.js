import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../styles/global';

export default function TabSelector({ tab, setTab }) {
	return (
		<View style={styles.tabContainer}>
			<Pressable
				style={({ pressed }) => [
					styles.tab, tab === 'GASTOS' && styles.tabActive,
					pressed && styles.pressed
				]}
				onPress={() => setTab('GASTOS')}
			>
				<Text style={tab === 'GASTOS' ? styles.tabTextActive : styles.tabText}>GASTOS</Text>
			</Pressable>
			<Pressable
				style={({ pressed }) => [
					styles.tab,
					tab === 'INGRESOS' && styles.tabActive,
					pressed && styles.pressed
				]}
				onPress={() => setTab('INGRESOS')}
			>
				<Text style={tab === 'INGRESOS' ? styles.tabTextActive : styles.tabText}>INGRESOS</Text>
			</Pressable>
		</View >
	);
}

const styles = StyleSheet.create({
	tabContainer: {
		flexDirection: 'row',
		borderRadius: BORDER_RADIUS.md,
		overflow: 'hidden',
	},
	tab: {
		flex: 1,
		paddingVertical: SPACING.sm,
		backgroundColor: COLORS.lightGray,
		alignItems: 'center',
	},
	tabActive: {
		backgroundColor: COLORS.primary,
	},
	tabText: {
		color: COLORS.black,
		fontWeight: 'bold',
	},
	tabTextActive: {
		color: COLORS.white,
		fontWeight: 'bold',
	},
	pressed: {
		opacity: 0.5,
	},
});