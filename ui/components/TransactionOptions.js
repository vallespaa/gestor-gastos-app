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
      <View style={styles.left}>
        <DateSelector date={date} setDate={setDate} />
      </View>

      <View style={styles.center}>
        <NoteInput note={note} onChangeNote={onAddNote} />
      </View>

      <View style={styles.right}>
        <AccountSelector
          accounts={accounts}
          selectedAccount={selectedAccount}
          onSelect={setSelectedAccount}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightGray,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  left: {
    flex: 1,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
