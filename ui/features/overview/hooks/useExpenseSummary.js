import { useCategories } from '../../../../shared/context/CategoriesContext';
import { COLORS, FONT_SIZES } from '../../../../shared/styles/global';

export const useExpenseSummary = (expenses) => {
  const { getCategoryById } = useCategories();

  let total = 0;
  const categorySummary = new Map();

  expenses.forEach((item) => {
    const amount = parseFloat(item.amount) || 0;
    total += amount;

    const categoryId = item.category;
    const category = getCategoryById(categoryId);

    const categoryKey = categoryId || 'uncategorized';

    if (categorySummary.has(categoryKey)) {
      categorySummary.get(categoryKey).amount += amount;
    } else {
      categorySummary.set(categoryKey, {
        name: category?.name || 'Sin categoría',
        amount: amount,
        color: category?.color || COLORS.gray,
      });
    }
  });

  const categories = Array.from(categorySummary.values())
    .map((categoryData) => ({
      ...categoryData,
      legendFontColor: COLORS.gray,
      legendFontSize: FONT_SIZES.sm,
    }))
    .sort((a, b) => b.amount - a.amount);

  return {
    total,
    categories,
  };
};
