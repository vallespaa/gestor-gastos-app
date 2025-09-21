import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';

export const exportToExcel = async (transactions) => {
  const worksheet = XLSX.utils.json_to_sheet(transactions);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

  const excelData = XLSX.write(workbook, {
    type: 'base64',
    bookType: 'xlsx',
  });

  const fileName = `transactions_${new Date().toISOString().slice(0, 10)}.xlsx`;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

  await FileSystem.writeAsStringAsync(filePath, excelData, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return filePath;
};
