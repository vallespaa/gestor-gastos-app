import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONT_SIZES } from '../styles/global';

export const useExpenses = (tab) => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);

  // Cargar los gastos desde AsyncStorage
  const loadExpenses = async () => {
    try {
      const stored = await AsyncStorage.getItem('expenses');
      const parsed = stored ? JSON.parse(stored) : [];
      setExpenses(parsed);
      await refreshData(parsed);
    } catch (error) {
      console.error('Error al cargar gastos:', error);
    }
  }
  
  // Eliminar un gasto  
  const deleteExpense = async (id) => {
    try {
      const updatedExpenses = expenses.filter(expense => expense.id !== id);
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      setExpenses(updatedExpenses);
      await refreshData(updatedExpenses);
    } catch (error) {
      console.log('Error al eliminar gasto:', error);
    }
  };

  // Editar un gasto
  const editExpense = async (updatedExpense) => {
    try {
      const updatedExpenses = expenses.map(expense => 
        expense.id === updatedExpense.id ? updatedExpense : expense
      );
      
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      setExpenses(updatedExpenses);
      await refreshData(updatedExpenses);
    } catch (error) {
      console.log('Error al editar gasto:', error);
    }
  };
  
  // Recargar el total y las categorías
  const refreshData = async (data) => {
    const currentDate = new Date();

    const filtered = data.filter(item => {
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
  }

  // Asignar color a cada categoría
  const getColor = (index) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#F77825'];
    return colors[index % colors.length];
  };

  useEffect(() => {
    loadExpenses();
  }, [tab]);

  return {
    expenses,
    total,
    categories,
    loadExpenses,
    deleteExpense,
    editExpense,
   };
};
