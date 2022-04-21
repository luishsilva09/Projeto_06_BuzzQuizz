function direcionarCadastroPerguntas() {
    document.querySelector(".cadastro-inicial").classList.add("escondido");
    document.querySelector(".cadastro-perguntas").classList.remove("escondido");
}

function direcionarCadastroNiveis() {
    document.querySelector(".cadastro-perguntas").classList.add("escondido");
    document.querySelector(".cadastro-niveis").classList.remove("escondido");
}

function direcionarSucessoCadastro() {
    document.querySelector(".cadastro-niveis").classList.add("escondido");
    document.querySelector(".cadastro-sucesso").classList.remove("escondido");
}

function direcionarCadastroParaHome() {
    document.querySelector(".cadastro-sucesso").classList.add("escondido");
    document.querySelector(".cadastro-quizz").classList.add("escondido");
    document.querySelector(".conteudo-home").classList.remove("escondido");
}