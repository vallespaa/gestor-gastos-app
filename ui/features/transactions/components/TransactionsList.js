import { useState } from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";
import { useCategories } from "../../../../shared/context/CategoriesContext";
import { useAccounts } from "../../../../shared/context/AccountsContext";
import TransactionDetailModal from "./TransactionDetailModal";
import TransactionRow from "./TransactionRow";
import TransferRow from "./TransferRow";
import AdjustmentRow from "./AdjustmentRow";
import { COLORS, FONT_SIZES, SPACING } from '../../../../shared/styles/global';

export default function TransactionsList({ sections }) {
  const { getCategoryById } = useCategories();
  const { getAccountById } = useAccounts();

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => {
    switch (item.source) {
      case "transaction":
        const category = getCategoryById(item.category);
        return (
          <TransactionRow
            transaction={item}
            category={category}
            onPress={handlePress}
          />
        );

      case "transfer":
        const fromAccount = getAccountById(item.fromAccountId);
        const toAccount = getAccountById(item.toAccountId);
        return (
          <TransferRow
            transfer={item}
            fromAccount={fromAccount}
            toAccount={toAccount}
          />
        );

      case "adjustment":
        const account = getAccountById(item.accountId);
        return (
          <AdjustmentRow
            adjustment={item}
            account={account}
          />
        );
      
      default:
        return null;
    }
  };
  
  return (
    <View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay transacciones registradas.</Text>}
      />

      <TransactionDetailModal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedTransaction(null);
        }}  
        transaction={selectedTransaction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: SPACING.md
  },
  empty: {
    textAlign: 'center',
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.gray
  },
});