  import { createContext, useContext, useState, useEffect } from 'react';
  import StaticAccountsRepository from '../../app/data/accounts/StaticAccountsRepository';
  import { getAll } from '../../app/application/getAllAccounts';

  const AccountsContext = createContext();

  const repository = new StaticAccountsRepository();

  export const AccountsProvider = ({ children }) => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
      loadAccounts();
    }, []);

    const loadAccounts = async () => {
      const all = await getAll(repository);
      setAccounts(all);
    };

    function getAccountById(id) {
      if (!id) {
        return null;
      }
      return accounts.find(c => c.id === id) || null;
    }

    return (
      <AccountsContext.Provider value={{
        accounts,
        getAccountById
      }}>
        {children}
      </AccountsContext.Provider>
    );
  };

  export const useAccounts = () => {
    return useContext(AccountsContext);
  };
