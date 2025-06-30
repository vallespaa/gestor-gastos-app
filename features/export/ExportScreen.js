import { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as Sharing from 'expo-sharing';
import { exportToExcel } from './utils/ExportToExcel';
import { useTransactions } from '../../shared/context/TransactionsContext';
import { FONT_SIZES, SPACING } from '../../shared/styles/global';

export default function ExportScreen() {
	const { transactions } = useTransactions();
	const [loading, setLoading] = useState(false);

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
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	title: {
		fontSize: FONT_SIZES.xl,
		marginBottom: SPACING.md,
	},
});
