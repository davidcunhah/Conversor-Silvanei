// Selecionando os elementos do DOM
const inputValor = document.getElementById('valor');
const selectTipo = document.getElementById('tipo-conversao');
const btnConverter = document.getElementById('btn-converter');
const textoResultado = document.getElementById('resultado-texto');

// Função principal de conversão
function realizarConversao() {
    const valor = parseFloat(inputValor.value);
    const tipo = selectTipo.value;

    // Validação de dados de entrada exigida no trabalho
    if (isNaN(valor)) {
        textoResultado.textContent = "Erro: Por favor, insira um número válido!";
        textoResultado.style.color = "red";
        return;
    }

    textoResultado.style.color = "#333"; // Reseta a cor de erro
    let resultadoCalculado = 0;
    let mensagemFinal = "";

    // Estrutura lógica limpa
    if (tipo === 'c-to-f') {
        resultadoCalculado = (valor * 9/5) + 32;
        mensagemFinal = `${valor} °C equivalem a ${resultadoCalculado.toFixed(2)} °F`;
    } else if (tipo === 'km-to-mi') {
        resultadoCalculado = valor * 0.621371;
        mensagemFinal = `${valor} km equivalem a ${resultadoCalculado.toFixed(2)} milhas`;
    }

    // Manipulação dinâmica do DOM
    textoResultado.textContent = mensagemFinal;
}

// Escuta de eventos
btnConverter.addEventListener('click', realizarConversao);