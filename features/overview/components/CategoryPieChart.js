import PieChart from 'react-native-pie-chart';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../../../shared/styles/global';

const screenWidth = Dimensions.get('window').width;

export default CategoryPieChart = ({ categories }) => {
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
});
