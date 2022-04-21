//buscar os dados no servidor usando o servidor da t4
function buscarDados() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

    promise.then(renderizarQuizz);
};
//rederizar os quizzes para o usuario
function renderizarQuizz(response) {
    let dados = response.data;
    console.log(dados);
    for (let i = 0; i < dados.length; i++) {
        document.querySelector(".quizzes .listaQuizz").innerHTML +=
            `<div class="quizzBanner" onclick="selecionarQuizz(this)" id="${dados[i].id}">
            <div class="gradiente"></div>
            <img src="${dados[i].image}">
            <h3>${dados[i].title}</h3>
        </div>`;

    };
};
//fazer a seleção de qul o quizz quer
function selecionarQuizz(element) {
    let id = element.getAttribute('id');
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    promise.then(abrirQuizz);

    console.log(id)
};

//abre o quizz selecionado
function abrirQuizz(response) {
    let dadosQuizz = response.data;
    document.querySelector(".conteudo-home").classList.add("escondido");
    document.querySelector(".conteudo-pag2").classList.remove("escondido");
    for (let i = 0; i < dadosQuizz.questions.length; i++) { 
        document.querySelector(".conteudo-pag2").innerHTML +=
        `<div class="post">
            <div class="pergunta">${dadosQuizz.questions[i].title}</div>
            <div class="alternativas">
                
            </div>
        </div>
        `
    } 
    console.log(dadosQuizz.questions.length)
    console.log(dadosQuizz)
};
buscarDados()