import { useFinancial } from '../../../../shared/context/FinancialContext';
import { formatRelativeDate } from '../utils/dateUtils';

export const useTransactions = () => {
  const { transactions, transfers, adjustments } = useFinancial();

  const getFormattedTransactions = () => {
    // Unificar todas las transacciones
    const unifiedTransactions = [
      ...transactions.map(t => ({ ...t, source: "transaction" })),
      ...adjustments.map(a => ({ ...a, source: "adjustment" })),
      ...transfers.map(tr => ({ ...tr, source: "transfer" })),
    ];

    // Ordenar por fecha descendente
    const sorted = unifiedTransactions.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Agrupar por fecha
    const grouped = sorted.reduce((acc, item) => {
      const dateKey = formatRelativeDate(new Date(item.date));
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    }, {});

    // Transformar al formato de SectionList
    return Object.keys(grouped).map(dateKey => ({
      title: dateKey,
      data: grouped[dateKey],
    }));
  };

  return {
    sections: getFormattedTransactions(),
  };
};