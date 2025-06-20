import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../styles/global';

const PERIODS = [
	{ key: 'DAY', label: 'd' },
	{ key: 'WEEK', label: 'w' },
	{ key: 'MONTH', label: 'm' },
	{ key: 'YEAR', label: 'y' },
];

export default function PeriodTabs({ period, setPeriod }) {
	return (
		<View style={styles.tabContainer}>
			{PERIODS.map(({ key, label }) => (
				<TouchableOpacity
					key={key}
					style={[styles.tab, period === key && styles.tabActive]}
					onPress={() => setPeriod(key)}
				>
					<Text style={period === key ? styles.tabTextActive : styles.tabText}>
						{label}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	tabContainer: {
		flexDirection: 'row',
		marginBottom: SPACING.md,
		borderRadius: BORDER_RADIUS.lg,
		overflow: 'hidden',
	},
	tab: {
		flex: 1,
		paddingVertical: SPACING.sm,
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.lightGray,
		alignItems: 'center',
	},
	tabActive: {
		backgroundColor: COLORS.primary,
	},
	tabText: {
		color: COLORS.black,
		fontWeight: 'bold',
		fontSize: FONT_SIZES.sm,
	},
	tabTextActive: {
		color: COLORS.white,
		fontWeight: 'bold',
	},
});