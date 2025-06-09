import react from 'react';
import { PieChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../../shared/styles/global';

const screenWidth = Dimensions.get('window').width;

export const CategoryPieChart = ({ categories }) => {

  return (
    <View style={styles.container}>
      {categories.length > 0 ? (
        <PieChart
          data={categories}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundColor: COLORS.white,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <Text style={styles.noDataText}>No hay datos para mostrar.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
  },
});
