let imagemInvalida;
let qtdPerguntas;
let qtdNiveis;
let quizz = {
    title: "",
	image: "",
	questions: "",
    levels: "",
};
let questoes = [];
let id;
let listaIds = [];
// funcoes de estilo

function selecionarPerguntaCadastro(containerPergunta) {
    document.querySelector(".cadastro-perguntas .selecionada").classList.remove("selecionada");
    containerPergunta.classList.add("selecionada");
}

function selecionarNivelCadastro(containerNivel) {
    document.querySelector(".cadastro-niveis .selecionada").classList.remove("selecionada");
    containerNivel.classList.add("selecionada");
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

function direcionarExibicaoQuizz() {
    document.querySelector(".cadastro-sucesso").classList.add("escondido");
    document.querySelector(".cadastro-quizz").classList.add("escondido");
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

function renderizarTelaSucesso() {
    
    document.querySelector(".cadastro-quizz .cadastro-sucesso").innerHTML = "<h3>Seu quizz está pronto!</h3>";
    
    document.querySelector(".cadastro-quizz .cadastro-sucesso").innerHTML += `
        <div style="background-image: url('${quizz.image}')" class="quizz-imagem" onclick="visualizarQuizzCriado()>
            <div class="filtro-escuro">
                <h4>${quizz.title}</h4>
            </div>
        </div>
    `
    document.querySelector(".cadastro-sucesso").innerHTML += `
        <button onclick="visualizarQuizzCriado()">Acessar Quizz</button>
        <button onclick="direcionarCadastroParaHome()">Voltar para home</button>
    `

    console.log(quizz);
}

function adicionaCadastroNiveisHTML() {
    
    document.querySelector(".cadastro-quizz .cadastro-niveis").innerHTML = "<h3>Agora, decida os níveis</h3>";

    for(let i = 0; i < qtdNiveis; i++) {
        document.querySelector(".cadastro-quizz .cadastro-niveis").innerHTML += `
            <div class="cadastro-nivel" onclick="selecionarNivelCadastro(this)">
            <div class="topo-nivel">
            <h4>Nível ${i + 1}</h4>
            <img class="invisivel" src="./imagens/Vector.svg" alt="icone-papel-lapis">
            </div>
            <div class="nivel">
            <input type="text" placeholder="Título do nível" class="titulo-nivel">
            <input type="text" placeholder="% de acerto mínimo" class="porcentagem-acerto">
            <input type="text" placeholder="URL da imagem do nível" class="img-nivel">
            <input type="text" placeholder="Descrição do nível" class="descricao-nivel">
            </div>
            </div>
            `
    }
    
    document.querySelector(".cadastro-niveis .cadastro-nivel").classList.add("selecionada");
    document.querySelector(".cadastro-niveis").innerHTML += `
    <button onclick="coletarDadosNiveis()">Finalizar Quizz</button>
    `
}

function adicionaCadastroPerguntasHTML() {
    
    document.querySelector(".cadastro-quizz .cadastro-perguntas").innerHTML = "<h3>Crie suas perguntas</h3>";
    
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
    
    document.querySelector(".cadastro-perguntas .cadastro-pergunta").classList.add("selecionada");
    document.querySelector(".cadastro-perguntas").innerHTML += `
    <button onclick="coletarDadosPerguntas()">Prosseguir para criar níveis</button>
    `
}

function coletarDadosIniciais() {
    const tituloQuiz = document.querySelector(".informacoes-iniciais .titulo").value.split(" ").filter(palavra => palavra !== "");
    const tituloQuizFormatado = tituloQuiz.join(" ");
    const urlImagem = document.querySelector(".informacoes-iniciais .url-img").value;
    qtdPerguntas = Number(document.querySelector(".informacoes-iniciais .qtd-perguntas").value);
    qtdNiveis = Number(document.querySelector(".informacoes-iniciais .qtd-niveis").value);
    
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
            quizz.title = tituloQuizFormatado;
            quizz.image = urlImagem;
            
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
    let timeouts = [];

    for(let i = 0; i < qtdPerguntas; i++) {
        let respostas = [];
        
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
        
        
        timeouts.push(setTimeout(function () {
            let excluirTimeouts = true;

            if(textoPerguntaFormatado.length < 20) {
                alert("O texto da pergunta deve ter pelo menos 20 caracteres");

            } else if(corPergunta.length !== 7 || !(veificaCorHexadecimal(corPergunta))) {
                alert("Cor hexadecimal inválida, insira no formato: #AAAAAA e sendo uma cor válida");

            } else if(repostaCerta.length <= 0) {
                alert("A resposta certa é obrigatória");

            } else if(imagemInvalida) {
                alert("Uma ou mais URL's é(são) inválida(s)");

            } else if(qtdRespostasVazias > 2) {
                alert("Deve haver pelo menos uma resposta incorreta");

            } else {
                excluirTimeouts = false;

                respostas.push({
                    text: repostaCerta,
                    image: imgRepostaCerta,
                    isCorrectAnswer: true,
                });

                for(let i = 0; i < respostasErradas.length; i++) {
                    if((respostasErradas[i].value).length > 0) {
                        respostas.push({
                            text: respostasErradas[i].value,
                            image: imgRespostasErradas[i].value,
                            isCorrectAnswer: false,
                        });
                    }
                }

                questoes.push({
                    title: textoPerguntaFormatado,
                    color: corPergunta,
                    answers: respostas,
                });
            }
            
            if(excluirTimeouts) {
                for(let i = 0; i < timeouts.length; i++) {
                    clearTimeout(timeouts[i]);
                }
            }

            if((i + 1) === qtdPerguntas) {
                quizz.questions = questoes;

                adicionaCadastroNiveisHTML();
                direcionarCadastroNiveis();
            }

        }, 300 * imgRespostasErradas.length));
    }
}

function coletarDadosNiveis() {
    const containersNiveis = document.querySelectorAll(".cadastro-niveis .cadastro-nivel");
    let porcentagemMaiorZero = 0;
    qtdNiveis = containersNiveis.length;
    const porcentagensNiveis = [];
    const niveis = [];
    
    for(let i = 0; i < containersNiveis.length; i++) {
        const containerNivel = containersNiveis[i].querySelector(".nivel");
        
        const tituloNivel = containerNivel.querySelector(".titulo-nivel").value.split(" ").filter(palavra => palavra !== "");
        const tituloNivelFormatado = tituloNivel.join(" ");
        const porcentagemAcerto = parseInt(containerNivel.querySelector(".porcentagem-acerto").value.replace("%", "")); 
        const imgUrlNivel = containerNivel.querySelector(".img-nivel").value;
        const descricaoNivel = containerNivel.querySelector(".descricao-nivel").value.split(" ").filter(palavra => palavra !== "");
        const descricaoNivelFormatada = descricaoNivel.join(" ");
        
        carregarUrlImagem(imgUrlNivel);

        if(porcentagemAcerto !== 0) {
            porcentagemMaiorZero++;
        }

        setTimeout(function () {
            if(tituloNivelFormatado.length < 10) {
                alert("O título do nível deve ter pelo menos 10 caracteres");
            } else if(porcentagemAcerto < 0 || porcentagemAcerto > 100 || isNaN(porcentagemAcerto)) {
                alert("A porcentagem de acerto deve ser um valor entre 0 e 100");
            } else if(imagemInvalida) {
                alert("A URL da imagem é inválida");
            } else if(descricaoNivelFormatada.length < 30) {
                alert("A descrição do nível deve ter pelo menos 30 caracteres");
            } else if(porcentagemMaiorZero === qtdNiveis) {
                alert("Deve haver pelo menos um nível onde a porcentagem de acertos é 0");
            } else if(porcentagensNiveis.indexOf(porcentagemAcerto) !== -1) {
                alert("A porcentagem de níves diferentes não podem ser iguais");
            } else {
                porcentagensNiveis.push(porcentagemAcerto)

                niveis.push({
                    title: tituloNivelFormatado,
                    image: imgUrlNivel,
                    text: descricaoNivelFormatada,
                    minValue: porcentagemAcerto,
                });

            }

            if((i + 1) === qtdNiveis) {

                quizz.levels = niveis;

                const promisse = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", quizz);

                promisse.catch(function (err) {
                    console.log(`Erro no envio do quizz, status: ${err.response.status}`);
                });

                promisse.then(function (response) {
                    
                    const storageIds = localStorage.getItem("listaIds");

                    if(storageIds !== null) {
                        listaIds = JSON.parse(storageIds);
                    }

                    if(response.data !== null) {
                        listaIds.push(response.data.id);
                    }

                    localStorage.removeItem("listaIds");

                    const listaSerializada = JSON.stringify(listaIds);
                    localStorage.setItem("listaIds", listaSerializada);

                    renderizarTelaSucesso();
                    direcionarSucessoCadastro();
                });

            }
        }, 400 * (qtdNiveis));

    }

}

function visualizarQuizzCriado() {
    direcionarExibicaoQuizz();
    selecionarQuizzCriado(quizz);
}