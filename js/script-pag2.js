let acertos = 0;
let respondido = 0;
let dadosQuizz;
function randOrd() {
    return (Math.round(Math.random()) - 0.5);
}
//abre o quizz selecionado randomiza as respostas 
function abrirQuizz(response) {
    
    dadosQuizz = response.data;
    document.querySelector(".conteudo-home").classList.add("escondido");
    document.querySelector(".conteudo-pag2").classList.remove("escondido");
    document.querySelector(".inferior").classList.remove("escondido")
    document.querySelector(".conteudo-pag2 .bannerPrincipal").innerHTML =
        `<p>${dadosQuizz.title}</p>`;

    document.querySelector(".conteudo-pag2 .bannerPrincipal").style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6) , rgb(0, 0, 0, 0.6)  ), url('${dadosQuizz.image}')`;


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
            
        </div> `;
        while (cont < dadosQuizz.questions[i].answers.length) {
            resposta.push({
                texto: dadosQuizz.questions[i].answers[cont].text,
                imagem: dadosQuizz.questions[i].answers[cont].image,
                correto:dadosQuizz.questions[i].answers[cont].isCorrectAnswer
            });
            cont++
        };
        resposta.sort(randOrd) 
        for (let x = 0; x < resposta.length; x++) {
            let post = document.getElementById(i);
            post.querySelector(".pergunta").style.backgroundColor =`${pergunta.cor}`
            post.querySelector(".alternativas").innerHTML += `
            <div class="resposta "
            onclick="seleciona(this)" value="${resposta[x].correto}">
                <img src="${resposta[x].imagem}">
                <p>${resposta[x].texto}</p>
            </div>`
        };
    };
   
    window.scrollTo(0, 0);
};
function seleciona(element){
    
    let alternativas = element.parentNode;
    let opcoes =alternativas.querySelectorAll(".resposta");
    for(let i = 0; i < opcoes.length;i++){
        opcoes[i].onclick = '';
        opcoes[i].classList.add("deselecionado");
        opcoes[i].querySelector("p").style.color ="red";

        if(opcoes[i].getAttribute('value')== 'true'){
            opcoes[i].querySelector("p").style.color ="green";
        };
    };
    element.classList.remove("deselecionado");
    if(element.getAttribute('value') == 'true'){
        acertos++
    };
    setTimeout(scrollarAuto, 2000)
    respondido++
    let quantidadePost = document.getElementsByClassName("post")
    if(respondido === quantidadePost.length){
        setTimeout(fim , 2000);
    }
};

let i = 0;
function scrollarAuto(){
    
    let post = document.getElementById(`${i+1}`);
    post.scrollIntoView(false);
    i++
};
function fim(){
    let porcentagem = Math.floor( acertos*100/respondido);
    let niveis = dadosQuizz.levels;
    let quantidadePost = document.getElementsByClassName("post");

    document.querySelector(".conteudo-pag2").innerHTML +=`
    <div class="post-final">
                <div class="qtAcertos">
                    <p>${porcentagem}% de acerto: ${niveis[0].title}</p>
                </div>
                <div class="mensagem">
                    <img src="./imagens/teste.jpg">
                    <h2>parabesn</h2>
                </div>
            </div>
    `
    window.scrollTo(0,document.body.scrollHeight);
    console.log((porcentagem))
    
    console.log(nivel);
};

function voltaHome(){
    window.scrollTo(0, 0)
    document.querySelector(".conteudo-pag2").innerHTML = `<div class='bannerPrincipal'>
    </div>`
    document.querySelector(".conteudo-home").classList.remove("escondido");
    document.querySelector(".conteudo-pag2").classList.add("escondido");
    document.querySelector(".inferior").classList.add("escondido")
};




