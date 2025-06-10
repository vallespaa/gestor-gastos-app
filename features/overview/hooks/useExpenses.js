import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONT_SIZES } from '../../../shared/styles/global';

export const useExpenses = (tab) => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);

  const getColor = (index) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#F77825'];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const stored = await AsyncStorage.getItem('expenses');
        const parsed = stored ? JSON.parse(stored) : [];
        const currentDate = new Date();

        const filtered = parsed.filter(item => {
          const itemDate = new Date(item.date);
          return (
            itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() === currentDate.getFullYear() &&
            item.type && item.type.toUpperCase() === tab 
          );
        });

        const totalAmount = filtered.reduce((acc, item) => acc + parseFloat(item.amount), 0);
        setTotal(totalAmount);

        const categoryMap = {};
        filtered.forEach(item => {
          categoryMap[item.category] = (categoryMap[item.category] || 0) + item.amount;
        });

        const chartData = Object.entries(categoryMap).map(([category, amount], index) => ({
          name: category,
          amount,
          color: getColor(index),
          legendFontColor: COLORS.gray,
          legendFontSize: FONT_SIZES.sm,
        }));

        setCategories(chartData);
        setExpenses(parsed);
      } catch (error) {
        console.log('Error al cargar gastos:', error);
      }
    };

    fetchExpenses();
  }, [tab]);

  return {
    expenses,
    total,
    categories
   };
};
