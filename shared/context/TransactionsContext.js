import { createContext, useContext, useState, useEffect } from 'react';
import TransactionAsyncStorageRepository from '../../app/data/transactions/TransactionAsyncStorageRepository';
import { getAllTransactions } from '../../app/application/getAllTransactions';
import { createTransaction } from '../../app/application/createTransaction';
import { deleteTransaction } from '../../app/application/deleteTransaction';
import { updateTransaction } from '../../app/application/updateTransaction';

const TransactionsContext = createContext();

const repository = new TransactionAsyncStorageRepository();

export const TransactionsProvider = ({ children }) => {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		loadTransactions();
	}, []);

	// Cargar las transacciones desde AsyncStorage
	const loadTransactions = async () => {
    const all = await getAllTransactions(repository);
    setTransactions(all);
  };

	// Agregar una nueva transacción
	const addTransaction = async (transaction) => {
			await createTransaction(repository, transaction);
      await loadTransactions();
	};

	// Eliminar una transacción  
	const removeTransaction = async (id) => {
    await deleteTransaction(repository, id);
    await loadTransactions();
	};

	// Editar una transacción
	const editTransaction = async (updatedTransaction) => {
    await updateTransaction(repository, updatedTransaction);
    await loadTransactions();
	};

	return (
		<TransactionsContext.Provider value={{
			transactions,
			loadTransactions,
			addTransaction,
			removeTransaction,
			editTransaction
		}}>
			{children}
		</TransactionsContext.Provider>
	);
};

export const useTransactions = () => {
	return useContext(TransactionsContext);
};
