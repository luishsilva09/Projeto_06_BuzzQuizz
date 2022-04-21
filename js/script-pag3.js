let imagemInvalida;

// funcoes de redirecionamento entre páginas

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

// manipulacao da entrada de informacoes dadas pelo usuario
function validarUrlImagem(url) {
    const img = new Image();
    img.src = url;

    img.onload = function () {
        imagemInvalida = false;
    }

    img.onerror = function () {
        imagemInvalida = true;
    }
}

function pegarInformacoesIniciais() {
    const tituloQuiz = document.querySelector(".informacoes-iniciais .titulo").value;
    const urlImagem = document.querySelector(".informacoes-iniciais .url-img").value;
    const qtdPerguntas = Number(document.querySelector(".informacoes-iniciais .qtd-perguntas").value);
    const qtdNiveis = Number(document.querySelector(".informacoes-iniciais .qtd-niveis").value);

    validarUrlImagem(urlImagem);

    const promisseImagem = axios.get(urlImagem);

    promisseImagem.then(
        setTimeout(

            function () {
                console.log("Bete")
            if(tituloQuiz.length < 20 || tituloQuiz.length > 65) {
                alert("O título do quizz deve ter entre 20 e 65 caracateres");
            } else if(imagemInvalida) {
                alert("A URL da imagem é inválida");
                document.querySelector(".informacoes-iniciais .url-img").value = "";
            } else if(qtdPerguntas < 3 || isNaN(qtdPerguntas)) {
                alert("A quantidade de perguntas deve ser maior ou igual a 3")
                document.querySelector(".informacoes-iniciais .qtd-perguntas").value = "";
            } else if(qtdNiveis < 2 || isNaN(qtdNiveis)) {
                alert("A quantidade de níveis deve ser maior ou igual a 2");
                document.querySelector(".informacoes-iniciais .qtd-niveis").value = "";
            } else {
                document.querySelector(".informacoes-iniciais .titulo").value = "";
                document.querySelector(".informacoes-iniciais .url-img").value = "";
                document.querySelector(".informacoes-iniciais .qtd-perguntas").value = "";
                document.querySelector(".informacoes-iniciais .qtd-niveis").value = "";

                direcionarCadastroPerguntas();
            }
        }, 400)
    );

}
