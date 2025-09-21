import { useCategories } from '../../../../shared/context/CategoriesContext';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import * as DocumentPicker from 'expo-document-picker';
import { v4 as uuid } from 'uuid';

export const importFromExcel = async (addTransaction) => {
  const { categories } = useCategories();

  const result = await DocumentPicker.getDocumentAsync({
    type: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ],
    copyToCacheDirectory: true,
  });

  if (result.canceled) return;

  const fileUri = result.assets[0].uri;
  const fileData = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const workbook = XLSX.read(fileData, { type: 'base64' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    Alert.alert('Importación fallida', 'El archivo está vacío o mal formado.');
    return;
  }

  let importCount = 0;

  for (const item of jsonData) {
    if (item.amount && item.category && item.date && item.type) {
      const matchedCategory = categories.find(
        (cat) =>
          cat.name.toLowerCase() === String(item.category).toLowerCase() &&
          cat.type.toLowerCase() === String(item.type).toLowerCase(),
      );

      await addTransaction({
        id: uuid(),
        amount: Number(item.amount),
        category: matchedCategory.id,
        date: new Date(item.date).toISOString(),
        type: matchedCategory.type,
        note: item.note || '',
      });

      importCount++;
    }
  }

  return jsonData;
};
