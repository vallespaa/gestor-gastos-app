import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  // Cargar los gastos desde AsyncStorage
  const loadExpenses = async () => {
    try {
      const stored = await AsyncStorage.getItem('expenses');
      const parsed = stored ? JSON.parse(stored) : [];
      setExpenses(parsed);
    } catch (error) {
      console.error('Error al cargar gastos:', error);
    }
  };
  
  // Agregar un nuevo gasto
  const addExpense = async (expense) => {
    try {
      const updatedExpenses = [...expenses, expense];
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      setExpenses(updatedExpenses);
    } catch (error) {
      console.log('Error al agregar gasto:', error);
    }
  };

  // Eliminar un gasto  
  const deleteExpense = async (id) => {
    try {
      const updatedExpenses = expenses.filter(expense => expense.id !== id);
      await AsyncStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      setExpenses(updatedExpenses);
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
    } catch (error) {
      console.log('Error al editar gasto:', error);
    }
  };

  return {
    expenses,
    loadExpenses,
    addExpense,
    deleteExpense,
    editExpense,
   };
};
