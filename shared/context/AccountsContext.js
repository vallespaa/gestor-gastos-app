import { createContext, useContext, useState, useEffect } from 'react';
import AccountAsyncStorageRepository from '../../app/data/accounts/AccountAsyncStorageRepository';
import { getAllAccounts } from '../../app/application/getAllAccounts';
import { createAccount } from '../../app/application/createAccount';
import { deleteAccount } from '../../app/application/deleteAccount';
import { updateAccount } from '../../app/application/updateAccount';

const AccountsContext = createContext();

const repository = new AccountAsyncStorageRepository();

export const AccountsProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    loadAccounts();
  }, []);

  function getAccountById(id) {
    if (!id) {
      return null;
    }
    return accounts.find((c) => c.id === id) || null;
  }

  // Cargar las cuentas desde AsyncStorage
  const loadAccounts = async () => {
    const all = await getAllAccounts(repository);
    setAccounts(all);
  };

  // Agregar una nueva cuenta
  const addAccount = async (account) => {
    await createAccount(repository, account);
    await loadAccounts();
  };

  // Eliminar una cuenta
  const removeAccount = async (id) => {
    await deleteAccount(repository, id);
    await loadAccounts();
  };

  // Editar una cuenta
  const editAccount = async (updatedAccount) => {
    await updateAccount(repository, updatedAccount);
    await loadAccounts();
  };

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        getAccountById,
        addAccount,
        removeAccount,
        editAccount,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};

export const useAccounts = () => {
  return useContext(AccountsContext);
};
