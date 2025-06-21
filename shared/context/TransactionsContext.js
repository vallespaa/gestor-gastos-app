import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'transactions';

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		loadTransactions();
	}, []);

	// Cargar las transacciones desde AsyncStorage
	const loadTransactions = async () => {
		try {
			const stored = await AsyncStorage.getItem(STORAGE_KEY);
			const parsed = stored ? JSON.parse(stored) : [];
			setTransactions(parsed);
		} catch (error) {
			console.error('Error al cargar transacción:', error);
		}
	};

	// Agregar una nueva transacción
	const addTransaction = async (transaction) => {
		try {
			const updatedTransactions = [...transactions, transaction];
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
			setTransactions(updatedTransactions);
		} catch (error) {
			console.log('Error al agregar transacción:', error);
		}
	};

	// Eliminar una transacción  
	const deleteTransaction = async (id) => {
		try {
			const updatedTransactions = transactions.filter(t => t.id !== id);
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
			setTransactions(updatedTransactions);
		} catch (error) {
			console.log('Error al eliminar transacción:', error);
		}
	};

	// Editar una transacción
	const editTransaction = async (updatedTransaction) => {
		try {
			const updatedTransactions = transactions.map(t =>
				t.id === updatedTransaction.id ? updatedTransaction : t
			);
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
			setTransactions(updatedTransactions);
		} catch (error) {
			console.log('Error al editar transacción:', error);
		}
	};

	return (
		<TransactionsContext.Provider value={{
			transactions,
			loadTransactions,
			addTransaction,
			deleteTransaction,
			editTransaction
		}}>
			{children}
		</TransactionsContext.Provider>
	);
};

export const useTransactions = () => {
	return useContext(TransactionsContext);
};
