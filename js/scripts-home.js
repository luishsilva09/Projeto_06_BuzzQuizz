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


buscarDados()