interface Produto {
    nome: string;
    preco: number;
    quantidade: number;
}

// Função para adicionar um produto ao estoque
function adicionarProdutoAoEstoque(novoProduto: Produto): void {
    // Suponha que aqui você salvaria o produto em algum lugar, como uma lista.
    console.log('Produto adicionado ao estoque:', novoProduto);
}

// Função para formatar as informações de um produto
function formatarProduto(produto: Produto): string {
    return `Nome: ${produto.nome}, Preço: R$ ${produto.preco.toFixed(2)}, Quantidade: ${produto.quantidade}`;
}

// Função para realizar cálculos matemáticos simples
function calcular(a: number, b: number, operacao: string): number {
    if (operacao === '+') {
        return a + b;
    } else if (operacao === '-') {
        return a - b;
    } else if (operacao === '*') {
        return a * b;
    } else if (operacao === '/') {
        if (b !== 0) {
            return a / b;
        } else {
            throw new Error('Divisão por zero não é permitida.');
        }
    } else {
        throw new Error('Operação matemática não suportada.');
    }
}

// Função para aplicar um filtro 
function aplicarFiltro(frase: string, filtro: string): string {
    if (frase.includes(filtro)) {
        return 'A frase contém o filtro.';
    } else {
        return 'A frase não contém o filtro.';
    }
}

