import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Linking  } from 'react-native';
import * as Sharing from 'expo-sharing';
import { importFromExcel } from './utils/ImportFromExcel';
import { exportToExcel } from './utils/ExportToExcel';
import { useTransactions } from '../../../shared/context/TransactionsContext';
import ThemedView from '../../components/ThemedView'
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { COLORS, FONT_SIZES, SPACING } from '../../../shared/styles/global';

export default function SettingsScreen() {
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

  const handleFeedback = () => {
    const email = Constants.expoConfig.extra?.feedbackEmail || 'fallback@example.com';
    const subject = 'Feedback sobre la app';
    const body = 'Hola, quería comentar...';
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailto);
  };

  return (
    <ThemedView>
      <Text style={styles.sectionTitle}>IMPORTAR Y EXPORTAR</Text>

      <Pressable style={styles.item} onPress={handleImport} disabled={loading}>
        <Ionicons name="download-outline" size={24} color={COLORS.black} style={styles.icon} />
        <Text style={styles.itemText}>Importar datos en Formato Excel</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={handleExport} disabled={loading}>
        <Ionicons name="push-outline" size={24} color={COLORS.black} style={styles.icon} />
        <Text style={styles.itemText}>Exportar datos en Formato Excel</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>CONTACTO</Text>

      <Pressable style={styles.item} onPress={handleFeedback}>
        <Ionicons name="chatbox-outline" size={24} color={COLORS.black} style={styles.icon} />
        <Text style={styles.itemText}>Enviar Feedback</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Versión de la app:</Text>
        <Text style={styles.footerText}>{Constants.expoConfig.version}</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.gray,
    fontWeight: '600',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    fontSize: FONT_SIZES.sm,
    letterSpacing: 0.5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  icon: {
    marginRight: SPACING.md,
  },
  itemText: {
    fontSize: FONT_SIZES.md,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  footerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
  },
});
