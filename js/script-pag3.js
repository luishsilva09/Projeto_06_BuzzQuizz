let imagemInvalida;
let qtdPerguntas;
// funcoes de estilo

function selecionarPerguntaCadastro(containerPergunta) {
    document.querySelector(".cadastro-perguntas .selecionada").classList.remove("selecionada");
    containerPergunta.classList.add("selecionada");
}

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
function carregarUrlImagem(url) {
    const img = new Image();
    img.src = url;
    
    img.onload = function () {
        imagemInvalida = false;
    }
    
    img.onerror = function () {
        imagemInvalida = true;
    }
}

function adicionaCadastroPerguntasHTML() {

    document.querySelector(".cadastro-quizz .cadastro-perguntas").innerHTML = "";

    for(let i = 0; i < qtdPerguntas; i++) {
        document.querySelector(".cadastro-quizz .cadastro-perguntas").innerHTML += `
        <div class="cadastro-pergunta" onclick="selecionarPerguntaCadastro(this)">
            <div class="topo-pergunta">
                <h4>Pergunta ${i + 1}</h4>
                <img src="./imagens/Vector.svg" alt="icone-papel-lapis">
            </div>
            <div class="perguntas-respostas">
                <input type="text" class="pergunta" placeholder="Texto da pergunta">
                <input type="text" class= "cor-pergunta" placeholder="Cor de fundo da pergunta">

                <h4>Resposta Correta</h4>
                <input type="text" class="resposta-certa" placeholder="Texto da resposta">
                <input type="text" class="imagem-resposta-certa" placeholder="URL da imagem">

                <h4>Respostas Incorretas</h4>
                <div class="resposta-incorreta">
                    <input type="text" placeholder="Resposta incorreta 1">
                    <input type="text" placeholder="URL da imagem 1">
                </div>
                <div class="resposta-incorreta">
                    <input type="text" placeholder="Resposta incorreta 2">
                    <input type="text" placeholder="URL da imagem 2">
                </div>
                <div class="resposta-incorreta">
                    <input type="text" placeholder="Resposta incorreta 3">
                    <input type="text" placeholder="URL da imagem 3">
                </div>
            </div>
        </div>
        `
    }

    document.querySelector(".cadastro-perguntas .cadastro-pergunta:first-child").classList.add("selecionada");
    document.querySelector(".cadastro-perguntas").innerHTML += `
        <button onclick="coletarDadosPerguntas()">Prosseguir para criar níveis</button>
        `
}

function coletarDadosIniciais() {
    const tituloQuiz = document.querySelector(".informacoes-iniciais .titulo").value.split(" ").filter(palavra => palavra !== "");
    const tituloQuizFormatado = tituloQuiz.join(" ");
    const urlImagem = document.querySelector(".informacoes-iniciais .url-img").value;
    qtdPerguntas = Number(document.querySelector(".informacoes-iniciais .qtd-perguntas").value);
    const qtdNiveis = Number(document.querySelector(".informacoes-iniciais .qtd-niveis").value);

    carregarUrlImagem(urlImagem);

    setTimeout(function () {

        if(tituloQuizFormatado.length < 20 || tituloQuizFormatado.length > 65) {
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

            adicionaCadastroPerguntasHTML();
            direcionarCadastroPerguntas();
        }
    }, 400);
}

function coletarDadosPerguntas() {
    const perguntas = document.querySelectorAll(".cadastro-quizz .cadastro-pergunta");
    let preenchidoCorretamente;

    for(let i = 0; i < qtdPerguntas; i++) {
        setTimeout(function () {
            preenchidoCorretamente = false;
            const containerPerguntasRespostas = perguntas[i].querySelector(".perguntas-respostas");
    
            const textoPergunta = containerPerguntasRespostas.querySelector(".pergunta").value.split(" ").filter(palavra => palavra !== "");
            const textoPerguntaFormatado = textoPergunta.join(" ");
            const corPergunta = containerPerguntasRespostas.querySelector(".cor-pergunta").value;
        
            const repostaCerta = containerPerguntasRespostas.querySelector(".resposta-certa").value;
            const imgRepostaCerta = containerPerguntasRespostas.querySelector(".imagem-resposta-certa").value;
            
            const respostasErradas = containerPerguntasRespostas.querySelectorAll(".resposta-incorreta :first-child");
            const imgRespostasErradas = containerPerguntasRespostas.querySelectorAll(".resposta-incorreta :last-child");
            
            const veificaCorHexadecimal = texto => /^#[0-9A-F]{6}$/i.test(texto);
            
            carregarUrlImagem(imgRepostaCerta);
            
            let qtdRespostasVazias = 0;
            
            for(let i = 0; i < imgRespostasErradas.length; i++) {
                if(respostasErradas[i].value.length > 0 && respostasErradas[i].value.trim() !== "") {
                    carregarUrlImagem(imgRespostasErradas[i].value);
        
                } else {
                    qtdRespostasVazias++;
                }
            }
            // colocar um clearTimeout para parar execuções em fila
            
            
            setTimeout(function () {
                if(textoPerguntaFormatado.length < 20) {
                    alert("O texto da pergunta deve ter pelo menos 20 caracteres");
                    i = qtdPerguntas + 1;
                } else if(corPergunta.length !== 7 || !(veificaCorHexadecimal(corPergunta))) {
                    alert("Cor hexadecimal inválida, insira no formato: #AAAAAA e sendo uma cor válida");
                    i = qtdPerguntas + 1;
                } else if(repostaCerta.length <= 0) {
                    alert("A resposta certa é obrigatória");
                    i = qtdPerguntas + 1;
                } else if(imagemInvalida) {
                    alert("Uma ou mais URL's é(são) inválida(s)");
                    i = qtdPerguntas + 1;
                } else if(qtdRespostasVazias > 2) {
                    alert("Deve haver pelo menos uma resposta incorreta");
                    i = qtdPerguntas + 1;
                } else {
                    preenchidoCorretamente = true;
                }
    
            }, 200 * (imgRespostasErradas.length + 1));
        }, 260 * (qtdPerguntas * 3 + 1));
    }

    setTimeout(function () {
        console.log(preenchidoCorretamente);
        if(preenchidoCorretamente) {
            direcionarCadastroNiveis();

        }
    }, 400 * (qtdPerguntas * 3 + 1))

}