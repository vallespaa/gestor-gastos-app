import { COLORS, FONT_SIZES } from '../../../../shared/styles/global';
import { useCategories } from '../../../../shared/context/CategoriesContext';

export const useExpenseSummary = (expenses) => {
  const { getCategoryById } = useCategories();  
  const total = expenses.reduce((acc, item) => acc + parseFloat(item.amount), 0);

	const categoryMap = {};
	expenses.forEach(item => {
		categoryMap[item.category] = (categoryMap[item.category] || 0) + parseFloat(item.amount);
	});

  const categories = Object.keys(categoryMap).map(catId => {
    const category = getCategoryById(catId);
    return {
      name: category.name,
      amount: categoryMap[catId],
      color: getColor(Object.keys(categoryMap).indexOf(catId)),
      legendFontColor: COLORS.gray,
      legendFontSize: FONT_SIZES.sm,
    };
  });

	return {
		total,
		categories
	};
};

// Asignar color a cada categoría
const getColor = (index) => {
	const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#F77825'];
	return colors[index % colors.length];
};