import { useMemo } from 'react';

export const useFilteredTransactions = (transactions, tab, period) => {
	const now = new Date();

	return useMemo(() => {
		return transactions.filter((item) => {
			const itemDate = new Date(item.date);
			const isCorrectType = item.type === tab;

			if (!isCorrectType) return false;

			if (period === 'DAY') {
				return itemDate.toDateString() === now.toDateString();
			} else if (period === 'WEEK') {
				const weekAgo = new Date(now);
				weekAgo.setDate(now.getDate() - 7);
				return itemDate >= weekAgo && itemDate <= now;
			} else if (period === 'MONTH') {
				return (
					itemDate.getMonth() === now.getMonth() &&
					itemDate.getFullYear() === now.getFullYear()
				);
			} else if (period === 'YEAR') {
				return itemDate.getFullYear() === now.getFullYear();
			}

			return false;
		});
	}, [transactions, tab, period]);
};
