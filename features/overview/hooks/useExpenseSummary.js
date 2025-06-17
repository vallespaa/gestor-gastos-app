import { COLORS, FONT_SIZES } from '../../../shared/styles/global';

export const useExpenseSummary = (expenses, tab = null) => {
  const currentDate = new Date();

  const filteredData = expenses.filter(item => {
    const itemDate = new Date(item.date);
    const matchesDate = (
      itemDate.getMonth() === currentDate.getMonth() &&
      itemDate.getFullYear() === currentDate.getFullYear()
    );
    const matchesTab = tab ? item.type?.toUpperCase() === tab : true;
    return matchesDate && matchesTab;
  });

  const total = filteredData.reduce((acc, item) => acc + parseFloat(item.amount), 0);

  const categoryMap = {};
  filteredData.forEach(item => {
    categoryMap[item.category] = (categoryMap[item.category] || 0) + parseFloat(item.amount);
  });

  const categories = Object.entries(categoryMap).map(([category, amount], index) => ({
    name: category,
    amount,
    color: getColor(index),
    legendFontColor: COLORS.gray,
    legendFontSize: FONT_SIZES.sm,
  }));

  return {
    filteredData,
    total,
    categories
  };
};

// Asignar color a cada categoría
const getColor = (index) => {
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#F77825'];
  return colors[index % colors.length];
};