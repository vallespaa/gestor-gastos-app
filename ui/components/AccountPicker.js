import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, SPACING, BORDER_RADIUS } from '../../shared/styles/global';

export default function AccountPicker({
  accounts,
  selectedAccount,
  onAccountChange,
}) {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedAccount}
        onValueChange={(itemValue) => onAccountChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona una cuenta" value="" />
        {accounts.map((account) => (
          <Picker.Item
            key={account.id}
            label={account.name}
            value={account.id}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  picker: {
    height: 48,
    width: '100%',
  },
});
