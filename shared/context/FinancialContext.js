import { createContext, useContext, useState, useEffect } from 'react';
import TransactionAsyncStorageRepository from '../../app/data/transactions/TransactionAsyncStorageRepository';
import AdjustmentAsyncStorageRepository from '../../app/data/adjustments/AdjustmentAsyncStorageRepository';
import { getAllTransactions } from '../../app/application/getAllTransactions';
import { createTransaction } from '../../app/application/createTransaction';
import { deleteTransaction } from '../../app/application/deleteTransaction';
import { updateTransaction } from '../../app/application/updateTransaction';
import { getAllAdjustments } from '../../app/application/getAllAdjustments';
import { createAdjustment } from '../../app/application/createAdjustment';

const FinancialContext = createContext();

const txRepo = new TransactionAsyncStorageRepository();
const adjRepo = new AdjustmentAsyncStorageRepository();

export const FinancialProvider = ({ children }) => {
	const [transactions, setTransactions] = useState([]);
  const [adjustments, setAdjustments] = useState([]);

	useEffect(() => {
		loadAll();
	}, []);

  // LOADERS

	// Cargar las transacciones desde AsyncStorage
	const loadTransactions = async () => {
    const all = await getAllTransactions(txRepo);
    setTransactions(all);
  };

	// Cargar los ajustes desde AsyncStorage
  const loadAdjustments = async () => {
    const all = await getAllAdjustments(adjRepo);
    setAdjustments(all);
  };

  const loadAll = async () => {
    await Promise.all([loadTransactions(), loadAdjustments()]);
  };

  // TRANSACTIONS

	// Agregar una nueva transacción
	const addTransaction = async (transaction) => {
			await createTransaction(txRepo, transaction);
      await loadTransactions();
	};

	// Eliminar una transacción  
	const removeTransaction = async (id) => {
    await deleteTransaction(txRepo, id);
    await loadTransactions();
	};

	// Editar una transacción
	const editTransaction = async (updatedTransaction) => {
    await updateTransaction(txRepo, updatedTransaction);
    await loadTransactions();
	};

  // ADJUSTMENTS

	// Agregar un nuevo ajuste
	const addAdjustment = async (adjustment) => {
			await createAdjustment(adjRepo, adjustment);
      await loadTransactions();
	};

  // Obtener ajustes de una cuenta
  function getAdjustmentsByAccount(accountId) {
    if (!accountId) {
      return null;
    }
    return adjustments.find(a => a.accountId === accountId) || null;
  }

  // BALANCE

  // Obtener balance de una cuenta
  const getAccountBalance = (accountId) => {
    const transTotal = transactions
      .filter(t => t.accountId === accountId)
      .reduce((acc, t) => acc + t.amount, 0);

    const adjTotal = adjustments
      .filter(a => a.accountId === accountId)
      .reduce((acc, a) => acc + a.amount, 0);

    return transTotal + adjTotal;
  };


	return (
		<FinancialContext.Provider value={{
			transactions,
      adjustments,
			addTransaction,
			removeTransaction,
			editTransaction,
      addAdjustment,
      getAdjustmentsByAccount,
      getAccountBalance
		}}>
			{children}
		</FinancialContext.Provider>
	);
};

export const useFinancial = () => {
	return useContext(FinancialContext);
};
