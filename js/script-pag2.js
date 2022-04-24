let acertos = 0; // quantidade de acertos do usuario
let respondido = 0; // quantas perguntas foram respondidas
let dadosQuizz; // recebe dados do quizz selecionado
let numeroPost = 0; //mostra o numero de perguntas 

//utilizado para randomizar as respostas 
function randOrd() {
    return (Math.round(Math.random()) - 0.5);
}

// funções para selecionar quizz

function selecionarQuizzGeral(response) {
    dadosQuizz = response.data;
    abrirQuizz();
}

function selecionarQuizzCriado(quizz) {
    dadosQuizz = quizz;
    abrirQuizz();
}


//abre o quizz selecionado randomiza as respostas 
function abrirQuizz() {

    document.querySelector(".conteudo-home").classList.add("escondido");
    document.querySelector(".conteudo-pag2").classList.remove("escondido");
    document.querySelector(".inferior").classList.remove("escondido");
    document.querySelector(".conteudo-pag2 .bannerPrincipal").innerHTML =
        `<p>${dadosQuizz.title}</p>`;

    document.querySelector(".conteudo-pag2 .bannerPrincipal").style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6) , rgb(0, 0, 0, 0.6)  ), url('${dadosQuizz.image}')`;
    renderizarQuizzSelecionado();
};

function renderizarQuizzSelecionado() {
    for (let i = 0; i < dadosQuizz.questions.length; i++) {
        let cont = 0;
        let resposta = [];
        let pergunta = {
            texto: dadosQuizz.questions[i].title,
            cor: dadosQuizz.questions[i].color,
        };

        document.querySelector(".conteudo-pag2").innerHTML +=
            `<div class="post" id="${i}">
                <div class="pergunta">${pergunta.texto}</div>
                <div class="alternativas"></div>
            </div>`
        ;

        while (cont < dadosQuizz.questions[i].answers.length) {
            resposta.push({
                texto: dadosQuizz.questions[i].answers[cont].text,
                imagem: dadosQuizz.questions[i].answers[cont].image,
                correto: dadosQuizz.questions[i].answers[cont].isCorrectAnswer
            });
            cont++
        };

        resposta.sort(randOrd);

        for (let x = 0; x < resposta.length; x++) {
            let post = document.querySelector(`.post:nth-child(${i + 2})`);

            post.querySelector(".pergunta").style.backgroundColor = `${pergunta.cor}`
            post.querySelector(".alternativas").innerHTML += `
            <div class="resposta"
            onclick="seleciona(this)" value="${resposta[x].correto}">
                <img src="${resposta[x].imagem}">
                <p>${resposta[x].texto}</p>
            </div>`
        };
    };

    window.scrollTo(0, 0);
};
//faz seleção da resposta inutilizando as outras 
function seleciona(element) {

    let alternativas = element.parentNode;
    let opcoes = alternativas.querySelectorAll(".resposta");
    for (let i = 0; i < opcoes.length; i++) {
        opcoes[i].onclick = '';
        opcoes[i].classList.add("deselecionado");
        opcoes[i].querySelector("p").style.color = "red";

        if (opcoes[i].getAttribute('value') == 'true') {
            opcoes[i].querySelector("p").style.color = "green";
        };
    };
    element.classList.remove("deselecionado");
    if (element.getAttribute('value') == 'true') {
        acertos++
    };

    respondido++
    let quantidadePost = document.getElementsByClassName("post")
    if (respondido === quantidadePost.length) {

        return setTimeout(fim, 2000);

    }
    setTimeout(scrollarAuto, 2000)
};

function scrollarAuto() {

    let post = document.getElementById(`${numeroPost + 1}`);
    post.scrollIntoView(false);
    numeroPost++
};
//aciona o ultino post com a mensagem certa e escrolla para o fim
function fim() {
    let porcentagem = 0;
    porcentagem = Math.floor(acertos * 100 / respondido);
    let niveis = dadosQuizz.levels;
    let quantidadePost = document.getElementsByClassName("post");
    let titulo = ''
    let text = ''
    let imagem;
    for (let i = 0; i < niveis.length; i++) {
        if (porcentagem >= niveis[i].minValue) {
            titulo = niveis[i].title;
            text = niveis[i].text;
            imagem = niveis[i].image
        }
    }

    document.querySelector(".conteudo-pag2").innerHTML += `
    <div class="post-final">
                <div class="qtAcertos">
                    <p>${porcentagem}% de acerto: ${titulo}</p>
                </div>
                <div class="mensagem">
                    <img src="${imagem}">
                    <h2>${text}</h2>
                </div>
            </div>
    `

    window.scrollTo(0, document.body.scrollHeight);

};
// voltar para o home da pagina
function voltaHome() {
    window.location.reload();
};

//reiniciar o quizz já selecionado
function reiniciar() {
    numeroPost = 0;
    respondido = 0;
    acertos = 0;
    document.querySelector(".conteudo-pag2").innerHTML = '';
    renderizarQuizzSelecionado();
};




