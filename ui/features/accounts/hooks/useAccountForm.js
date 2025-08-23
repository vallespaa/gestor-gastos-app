import { useState } from 'react';
import { Alert } from 'react-native';
import { useAccounts } from '../../../../shared/context/AccountsContext';
import { useFinancial } from '../../../../shared/context/FinancialContext';

export function useAccountForm(editingAccount, adjustment, navigation) {
  const { addAccount, editAccount, removeAccount } = useAccounts();
  const { transactions, addAdjustment, getAccountBalance } = useFinancial();

  const isEditing = !!editingAccount;
  const [accountName, setAccountName] = useState(editingAccount?.name || '');
  const [balance, setBalance] = useState(getAccountBalance(editingAccount?.id) || 0);

  console.log(getAccountBalance(0))

  const [isLoading, setIsLoading] = useState(false);
  
  const isFormValid = accountName.trim().length > 0;

  const createNewAccount = async () => {
    const newAccount = {
      id: Date.now(),
      name: accountName.trim()
    };

    const newAdjustment = {
      id: Date.now(),
      accountId: newAccount.id,
      amount: adjustment,
      date: Date.now()
    }

    await addAccount(newAccount);
    await addAdjustment(newAdjustment);
  };

  const updateExistingAccount = async () => {
    const updatedAccount = {
      ...editingAccount,
      name: accountName.trim()
    };

    await editAccount(updatedAccount);
  };

  const handleSave = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Por favor ingresa un nombre para la cuenta');
      return;
    }

    setIsLoading(true);
    
    try {
      if (isEditing) {
        await updateExistingAccount();
        Alert.alert(
          'Éxito', 
          'Cuenta actualizada correctamente',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        await createNewAccount();
        Alert.alert(
          'Éxito', 
          'Cuenta creada correctamente',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error', 
        isEditing ? 'No se pudo acualitzar la cuenta' : 'No se pudo crear la cuenta'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const isAccountInUse = transactions.some(
      (tx) => tx.accountId === editingAccount.id
    );

    if (isAccountInUse) {
      Alert.alert(
        'No se puede eliminar',
        'Esta cuenta tiene transacciones asociadas. Cámbialas de cuenta o elimínalas antes de eliminar esta cuenta.'
      );
      return;
    }

    setIsLoading(true);
    
    try {
      await removeAccount(editingAccount.id);
      
      Alert.alert(
        'Éxito', 
        'Cuenta eliminada correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    accountName,
    balance,
    isLoading,
    isEditing,
    isFormValid,
    
    setAccountName,
    setBalance,
    handleSave,
    handleDelete
  };
}