import { useAccounts } from '../../../shared/context/AccountsContext';
import { View, Text, StyleSheet } from 'react-native';
import ThemedView from '../../components/ThemedView'

export default function AccountsScreen() {
  const { accounts } = useAccounts();

  return (
    <ThemedView>
      <Text>Página de Cuentas</Text>
    </ThemedView>
  );
}
