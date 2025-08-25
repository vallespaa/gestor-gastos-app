import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ThemedView from '../../components/ThemedView';
import AccountCard from './components/AccountCard';
import AccountNameInput from './components/AccountNameInput';
import BalanceInput from './components/BalanceInput';
import { useAccountForm } from './hooks/useAccountForm';
import { useAccountFormHeader } from './hooks/useAccountFormHeader';
import { COLORS, FONT_SIZES, SPACING } from '../../../shared/styles/global';

export default function AccountFormScreen({ navigation, route }) {
  const editingAccount = route?.params?.account;
  const [adjustment, setAdjustment] = useState(0);
  
  const {
    accountName,
    balance,
    isLoading,
    isEditing,
    isFormValid,
    setAccountName,
    setBalance,
    handleSave,
    handleDelete,
  } = useAccountForm(editingAccount, adjustment, navigation);

  useAccountFormHeader({
    navigation,
    isEditing,
    isFormValid,
    isLoading,
    onSave: handleSave,
    onDelete: handleDelete,
  });

  return (
    <ThemedView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.previewSection}>
          <Text style={styles.sectionTitle}>Vista previa</Text>
          <AccountCard 
            account={{ name: accountName || 'Nombre de cuenta' }}
            balance={balance || 0}
          />
        </View>

        <View style={styles.formSection}>
          <AccountNameInput 
            value={accountName}
            onChangeText={setAccountName}
            maxLength={30}
          />
          
          <BalanceInput 
            value={balance}
            onChangeText={setBalance}
            onChangeDifference={setAdjustment}
            isEditing={isEditing}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.md,
  },
  previewSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  formSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
});
