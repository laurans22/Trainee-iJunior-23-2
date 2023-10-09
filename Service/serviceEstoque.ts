import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

interface Data {
    id: number;
    nome: string;
    peso: number;
    valor: number;
    quantidade: number;
  }

// Função assíncrona para adicionar um novo item ao estoque
const adicionarItemAoEstoque = async (novoItem: Data): Promise<void> => {
    try {
        // Estrutura das colunas do arquivo
        const csvWriter = createCsvWriter({
            path: 'estoque.csv',
            header: [
                { id: 'nome', title: 'NOME' },
                { id: 'peso', title: 'PESO' },
                { id: 'valor', title: 'VALOR' },
                { id: 'quantidade', title: 'QUANTIDADE' },
            ],
            append: true, // Adiciona ao arquivo existente, se houver
        });

        // Escreve o novo item no arquivo CSV
        await csvWriter.writeRecords([novoItem]);
        //Se tudo der certo.
        console.log('Item adicionado ao estoque com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar o item ao estoque:', error);
    }
};

// Função assíncrona para recuperar um item do estoque pelo ID
const recuperarItemPorId = async (id: number): Promise<Data | null> => {
    try {
        const data: Data[] = await lerArquivoCSV();
        const itemEncontrado = data.find((item) => item.id === id);
        if (itemEncontrado) {
            console.log('Item encontrado:', itemEncontrado);
            return itemEncontrado;
        } else {
            console.log('Item não encontrado.');
            return null;
        }
    } catch (error) {
        console.error('Erro ao recuperar o item pelo ID:', error);
        return null;
    }
};
function lerArquivoCSV(): Data[] | PromiseLike<Data[]> {
    throw new Error('Function not implemented.');
}

// Função assíncrona para limpar o arquivo CSV (estoque.csv)
const limparArquivoCSV = async (): Promise<void> => {
    try {
        await fs.promises.writeFile('estoque.csv', ''); // Limpa o arquivo
        console.log('Arquivo CSV limpo com sucesso.');
    } catch (error) {
        console.error('Erro ao limpar o arquivo CSV:', error);
    }
};

// Função assíncrona para remover um item pelo ID do estoque
const removerItemDoEstoquePorId = async (id: number): Promise<void> => {
    try {
        let data: Data[] = await lerArquivoCSV();
        const itemIndex = data.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
            data.splice(itemIndex, 1); // Remove o item do array
            await limparArquivoCSV(); // Limpa o arquivo CSV
            // Reescreve os dados no arquivo CSV, agora com o array completo após a remoção
            for (const item of data) {
                await adicionarItemAoEstoque(item);
            }
            console.log('Item removido com sucesso.');
        } else {
            console.log('Item não encontrado no estoque.');
        }
    } catch (error) {
        console.error('Erro ao remover o item do estoque:', error);
    }
};

// Função assíncrona para listar todos os itens do estoque
const listarItensDoEstoque = async (): Promise<void> => {
    try {
        const data: Data[] = await lerArquivoCSV();
        console.log('Itens no estoque:', data);
    } catch (error) {
        console.error('Erro ao listar os itens do estoque:', error);
    }
};