//Definição da estrutura de dados
interface Data {
  title: string;
  value: string;
}

//Leitura e formatação dos dados em csv 
//Importa bibliotecas
import fs from 'fs';
import csv from 'csv-parser';
  
//Definindo função assíncrona que recebe uma string com o caminho para o arquivo a ser lido
// Promise<Data[]> indica que a função retorna um array de objetos
const readCSV = async (filePath: string): Promise<Data[]> => {
    return new Promise((resolve, reject) => {
        const results: Data[] = [];
        // Abaixo cria um fluxo de leitura do arquivo CSV especificado pelo caminho filePath
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data: Data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

// Função usada para escrever no csv
//Imprtando funções da biblioteca csv-writer
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

// Def de função assincrona
const writeCSV = async (filePath: string, data: Data[]): Promise<void> => {
  const csvWriter = createCsvWriter({
    path: filePath,
    // Define as colunas a serem incluídas
    header: [
      { id: 'title', title: 'TÍTULO' },
      { id: 'value', title: 'VALOR' },
    ],
  });

  return csvWriter.writeRecords(data);
};

// Def função assincrona
const main = async () => {
  // Boa prática para garantir dados coerentes
  try {
    const data = await readCSV('caminho/para/seu/input.csv');
    console.log('Dados lidos:', data);
    //Reescreve os dados em outro arquivo
    await writeCSV('caminho/para/seu/output.csv', data);
    console.log('Dados escritos em output.csv');
  } catch (error) {
    console.error('Erro:', error);
  }
};

main();