import { useExpenseSummary } from '../hooks/useExpenseSummary';
import PieChart from 'react-native-pie-chart';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../../shared/styles/global';

const screenWidth = Dimensions.get('window').width;

export default CategorySummary = ({ transactions }) => {
	const { total, categories } = useExpenseSummary(transactions);

	const series = categories.map(category => {
		return {
			value: category.amount,
			color: category.color,
		};
	});

	return (
		<View style={styles.container}>
			{series.length > 0 ? (
				<PieChart
					series={series}
					widthAndHeight={screenWidth - 120}
				/>
			) : (
				<Text style={styles.noDataText}>No hay datos para mostrar.</Text>
			)}

			<View style={styles.summary}>
				{categories.map((cat) => (
					<View key={cat.name} style={styles.summaryRow}>
						<Text style={styles.catName}>{cat.name}</Text>
						<View style={[styles.bar, { width: `${(cat.amount / total) * 100}%`, backgroundColor: cat.color }]} />
						<Text style={styles.catAmount}>{cat.amount.toFixed(2)}€</Text>
					</View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: SPACING.lg,
		alignItems: 'center',
		justifyContent: 'center',
	},
	noDataText: {
		marginTop: SPACING.md,
		fontSize: FONT_SIZES.md,
		color: COLORS.gray,
	},
	summary: {
		marginTop: SPACING.xl,
		width: '100%',
	},
	summaryRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: SPACING.md,
	},
	catName: {
		flex: 1,
		fontSize: FONT_SIZES.sm,
	},
	bar: {
		height: 10,
		borderRadius: BORDER_RADIUS.sm,
		marginHorizontal: SPACING.sm,
		flex: 2,
	},
	catAmount: {
		fontSize: FONT_SIZES.sm,
		flex: 1,
		textAlign: 'right',
	},
});
