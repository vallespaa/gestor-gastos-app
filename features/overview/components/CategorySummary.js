import { useState } from 'react'
import { useFilteredTransactions } from '../../../shared/hooks/useFilteredTransactions';
import { useExpenseSummary } from '../hooks/useExpenseSummary';
import PieChart from 'react-native-pie-chart';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { format, addDays, addWeeks, addMonths, addYears, startOfWeek, endOfWeek } from "date-fns";
import { es } from 'date-fns/locale';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../../shared/styles/global';

const screenWidth = Dimensions.get('window').width;

export default CategorySummary = ({ transactions, tab, period }) => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const filteredTransactions = useFilteredTransactions(transactions, tab, period, selectedDate);
	const { total, categories } = useExpenseSummary(filteredTransactions);

	const series = categories.map(category => {
		return {
			value: category.amount,
			color: category.color,
		};
	});

	const handlePrev = () => {
		if (period === 'DAY') setSelectedDate(prev => addDays(prev, -1));
		else if (period === 'WEEK') setSelectedDate(prev => addWeeks(prev, -1));
		else if (period === 'MONTH') setSelectedDate(prev => addMonths(prev, -1));
		else if (period === 'YEAR') setSelectedDate(prev => addYears(prev, -1));
	};

	const handleNext = () => {
		if (period === 'DAY') setSelectedDate(prev => addDays(prev, 1));
		else if (period === 'WEEK') setSelectedDate(prev => addWeeks(prev, 1));
		else if (period === 'MONTH') setSelectedDate(prev => addMonths(prev, 1));
		else if (period === 'YEAR') setSelectedDate(prev => addYears(prev, 1));
	};

	return (
		<View style={styles.container}>
			<View style={styles.periodRow}>
				<Pressable onPress={handlePrev} style={styles.arrowBtn}>
					<Text style={styles.arrowText}>{"<"}</Text>
				</Pressable>
				<PeriodTitle period={period} date={selectedDate} />
				<Pressable onPress={handleNext} style={styles.arrowBtn}>
					<Text style={styles.arrowText}>{">"}</Text>
				</Pressable>
			</View>
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

function PeriodTitle({ period, date }) {
	if (period === 'DAY') {
		return (
			<Text style={styles.periodText}>
				{format(date, 'EEEE, dd/MM/y', { locale: es })}
			</Text>
		);
	} else if (period === 'WEEK') {
		const start = startOfWeek(date, { locale: es, weekStartsOn: 1 });
		const end = endOfWeek(date, { locale: es, weekStartsOn: 1 });
		return (
			<Text style={styles.periodText}>
				{format(start, 'dd/MM/y')} - {format(end, 'dd/MM/y')}
			</Text>
		);
	} else if (period === 'MONTH') {
		return (
			<Text style={styles.periodText}>
				{format(date, 'MMMM y', { locale: es })}
			</Text>
		);
	} else if (period === 'YEAR') {
		return (
			<Text style={styles.periodText}>
				{format(date, 'y', { locale: es })}
			</Text>
		);
	}
	return null;
}

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
	periodRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: SPACING.md,
	},
	periodText: {
		fontSize: FONT_SIZES.lg,
		fontWeight: 'bold',
		color: COLORS.primary,
		textAlign: 'center',
		marginHorizontal: SPACING.md,
	},
	arrowBtn: {
		padding: 10,
	},
	arrowText: {
		fontSize: 24,
		color: COLORS.primary,
	},
});
