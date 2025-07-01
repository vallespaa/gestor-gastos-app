import { useMemo } from 'react';

export const useFilteredTransactions = (transactions, tab, period, date) => {
	return useMemo(() => {
		return transactions.filter((item) => {
			const itemDate = new Date(item.date);
			const isCorrectType = item.type === tab;

			if (!isCorrectType) return false;

			if (period === 'DAY') {
				return itemDate.toDateString() === date.toDateString();
			} else if (period === 'WEEK') {
				const weekAgo = new Date(date);
				weekAgo.setDate(date.getDate() - 7);
				return itemDate >= weekAgo && itemDate <= date;
			} else if (period === 'MONTH') {
				return (
					itemDate.getMonth() === date.getMonth() &&
					itemDate.getFullYear() === date.getFullYear()
				);
			} else if (period === 'YEAR') {
				return itemDate.getFullYear() === date.getFullYear();
			}

			return false;
		});
	}, [transactions, tab, period, date]);
};
