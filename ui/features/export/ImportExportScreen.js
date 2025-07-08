import { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Header from '../../components/Header';
import * as Sharing from 'expo-sharing';
import { importFromExcel } from './utils/ImportFromExcel';
import { exportToExcel } from './utils/ExportToExcel';
import { useTransactions } from '../../../shared/context/TransactionsContext';
import { FONT_SIZES, SPACING, COLORS } from '../../../shared/styles/global';

export default function ExportScreen() {
	const { transactions, addTransaction } = useTransactions();
	const [loading, setLoading] = useState(false);

	const handleImport = async () => {
		setLoading(true);
		try {
			const jsonData = await importFromExcel(addTransaction);

			Alert.alert('Importación exitosa', `${jsonData.length} transacciones importadas`);
		} catch (error) {
			console.error('Error al importar:', error);
			Alert.alert('Error', 'No se pudo importar el archivo');
		} finally {
			setLoading(false);
		}
	}

	const handleExport = async () => {
		setLoading(true);
		try {
			const filePath = await exportToExcel(transactions);

			Alert.alert('Exportación exitosa', `Archivo guardado en:\n${filePath}`);

			if (await Sharing.isAvailableAsync()) {
				await Sharing.shareAsync(filePath);
			} else {
				Alert.alert('Compartir no disponible', 'No se puede compartir este archivo en este dispositivo.');
			}
		} catch (error) {
			console.error('Error al exportar:', error);
			Alert.alert('Error', 'No se pudo exportar el archivo.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Header title={"Importar / Exportar"} />
			<Text style={styles.title}>Importar Transacciones</Text>
			<Button
				title={loading ? 'Importando...' : 'Importar desde Excel'}
				onPress={handleImport}
				disabled={loading}
			/>
			<Text style={styles.title}>Exportar Transacciones</Text>
			<Button
				title={loading ? 'Exportando...' : 'Exportar a Excel'}
				onPress={handleExport}
				disabled={loading}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: SPACING.md,
		backgroundColor: COLORS.white
	},
	title: {
		fontSize: FONT_SIZES.xl,
		marginBottom: SPACING.md,
	},
});
