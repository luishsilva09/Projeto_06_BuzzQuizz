window.scrollTo(0, 0) // carregar pagina no topo

let meusQuizzId =[1];
let dados = [];
// funções de direcionamento

function direcionarCriacaoQuizz() {
    document.querySelector(".conteudo-home").classList.add("escondido");
    document.querySelector(".cadastro-quizz").classList.remove("escondido");
    document.querySelector(".cadastro-inicial").classList.remove("escondido");
};

//buscar os dados no servidor usando o servidor da t4
function buscarDados() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');

    promise.then(renderizarQuizz);
};
//rederizar os quizzes para o usuario
function renderizarQuizz(response) {
    dados = response.data;

    for (let i = 0; i < dados.length; i++) {
        document.querySelector(".quizzes .listaQuizz").innerHTML +=
            `<div class="quizzBanner" onclick="selecionarQuizz(this)" id="${dados[i].id}">
                <div class="gradiente"></div>
                <img src="${dados[i].image}">
                <h3>${dados[i].title}</h3>
            </div>
        `;

    }

    meuQuizz();
};
//fazer a seleção de qul o quizz quer
function selecionarQuizz(element) {
    let id = element.getAttribute('id');
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`);
    promise.then(selecionarQuizzGeral);
};

function home(){
    window.location.reload();
};

function meuQuizz(){
    if (meusQuizzId != ''){
        document.querySelector(".conteudo-home .criarQuizz").classList.add("escondido")
        document.querySelector(".conteudo-home .meusQuizz ").classList.remove("escondido")
        for(let i = 0; i < meusQuizzId.length;i++){
            let meu = meusQuizzId[i]
            const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${meu}`);
            promise.then(renderizarMeusQuizz)
            
        };
        
    };
};

function renderizarMeusQuizz(response){
    let dadosMeu =[];
    dadosMeu = response.data
    document.querySelector(".meusQuizz .listaQuizz").innerHTML +=
    `<div class="quizzBanner" onclick="selecionarQuizz(this)" id="${dadosMeu.id}">
    <div class="gradiente"></div>
    <img src="${dadosMeu.image}">
    <h3>${dadosMeu.title}</h3>
</div>`;

};

buscarDados();