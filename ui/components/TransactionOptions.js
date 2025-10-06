import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../shared/styles/global';
import DateSelector from './DateSelector';
import NoteInput from './NoteInput';
import AccountSelector from './AccountSelector';

export default function TransactionOptions({
  date,
  setDate,
  selectedAccount,
  setSelectedAccount,
  note,
  onAddNote,
  accounts,
}) {
  return (
    <View style={styles.container}>
      <DateSelector date={date} setDate={setDate} />
      <NoteInput note={note} onChangeNote={onAddNote} />
      <AccountSelector
        accounts={accounts}
        selectedAccount={selectedAccount}
        onSelect={setSelectedAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
});
