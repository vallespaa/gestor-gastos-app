import { createContext, useContext, useState, useEffect } from 'react';
import TransactionAsyncStorageRepository from '../../app/data/transactions/TransactionAsyncStorageRepository';
import TransferAsyncStorageRepository from '../../app/data/transfers/TransferAsyncStorageRepository';
import AdjustmentAsyncStorageRepository from '../../app/data/adjustments/AdjustmentAsyncStorageRepository';
import { getAllTransactions } from '../../app/application/getAllTransactions';
import { createTransaction } from '../../app/application/createTransaction';
import { deleteTransaction } from '../../app/application/deleteTransaction';
import { updateTransaction } from '../../app/application/updateTransaction';
import {
  getAllTransfers,
  getTransfersByAccount as getTransfersByAccountUseCase,
  createTransfer,
  deleteTransfer
} from '../../app/application/TransferUseCases'
import { getAllAdjustments } from '../../app/application/getAllAdjustments';
import { createAdjustment } from '../../app/application/createAdjustment';
import { deleteAdjustment } from '../../app/application/deleteAdjustment';

const FinancialContext = createContext();

const txRepo = new TransactionAsyncStorageRepository();
const tfRepo = new TransferAsyncStorageRepository();
const adjRepo = new AdjustmentAsyncStorageRepository();

export const FinancialProvider = ({ children }) => {
	const [transactions, setTransactions] = useState([]);
	const [transfers, setTransfers] = useState([]);
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

	// Cargar la transferencias desde AsyncStorage
  const loadTransfers = async () => {
    const all = await getAllTransfers(tfRepo);
    setTransfers(all);
  };

	// Cargar los ajustes desde AsyncStorage
  const loadAdjustments = async () => {
    const all = await getAllAdjustments(adjRepo);
    setAdjustments(all);
  };

  const loadAll = async () => {
    await Promise.all([loadTransactions(), loadTransfers(), loadAdjustments()]);
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

  // TRANSFERS

	// Agregar una nueva transferencia
	const addTransfer = async (transfer) => {
			await createTransfer(tfRepo, transfer);
      await loadTransfers();
	};

	// Eliminar una transferencia  
	const removeTransfer = async (id) => {
    await deleteTransfer(tfRepo, id);
    await loadTransfers();
	};

  // Obtener transferencias de una cuenta
  const getTransfersByAccount = async (accountId) => {
    if (!accountId) {
      return null;
    }
    return await getTransfersByAccountUseCase(accountId);
  }

  // ADJUSTMENTS

	// Agregar un nuevo ajuste
	const addAdjustment = async (adjustment) => {
			await createAdjustment(adjRepo, adjustment);
      await loadAdjustments();
	};

	// Eliminar un ajuste
	const removeAdjustment = async (id) => {
			await deleteAdjustment(adjRepo, id);
      await loadAdjustments();
	};

  // Obtener ajustes de una cuenta
  function getAdjustmentsByAccount(accountId) {
    if (!accountId) {
      return null;
    }
    return adjustments.filter(a => a.accountId === accountId) || [];
  }

  // BALANCE

  // Obtener balance de una cuenta
  const getAccountBalance = (accountId) => {
    const transTotal = transactions
      .filter(t => t.account === accountId)
      .reduce((acc, t) => {
      const amount = parseFloat(t.amount) || 0;
      return t.type === 'INGRESOS' ? acc + amount : acc - amount;
    }, 0);

    const adjTotal = adjustments
      .filter(a => a.accountId === accountId)
      .reduce((acc, a) => acc + a.amount, 0);

    const transferTotal = transfers
      .filter(tr => tr.fromAccountId === accountId || tr.toAccountId === accountId)
      .reduce((acc, tr) => {
        const amount = parseFloat(tr.amount) || 0;
        if (tr.fromAccountId === accountId) return acc - amount;
        if (tr.toAccountId === accountId) return acc + amount;
        return acc;
      }, 0);

    return transTotal + adjTotal + transferTotal;
  };

  // Obtener el balance total
  const totalBalance = transactions.reduce((acc, t) => {
    const amount = parseFloat(t.amount) || 0;
    return t.type === 'INGRESOS' ? acc + amount : acc - amount;
  }, 0) + adjustments.reduce((acc, a) => acc + a.amount, 0);

	return (
		<FinancialContext.Provider value={{
			transactions,
      transfers,
      adjustments,
      totalBalance,
			addTransaction,
			removeTransaction,
			editTransaction,
      addTransfer,
      removeTransfer,
      getTransfersByAccount,
      addAdjustment,
      removeAdjustment,
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
