
function randOrd() {
    return (Math.round(Math.random()) - 0.5);
}
//abre o quizz selecionado randomiza as respostas 
function abrirQuizz(response) {
    let dadosQuizz = response.data;
    document.querySelector(".conteudo-home").classList.add("escondido");
    document.querySelector(".conteudo-pag2").classList.remove("escondido");

    document.querySelector(".conteudo-pag2 .bannerPrincipal").innerHTML =
        `<p>${dadosQuizz.title}</p>`

    document.querySelector(".conteudo-pag2 .bannerPrincipal").style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6) , rgb(0, 0, 0, 0.6)  ), url('${dadosQuizz.image}')`


    for (let i = 0; i < dadosQuizz.questions.length; i++) {
        let cont = 0;
        let resposta = [];
        let pergunta = {
            texto: dadosQuizz.questions[i].title,
            cor: dadosQuizz.questions[i].color,
        }
        
        document.querySelector(".conteudo-pag2").innerHTML +=
            `<div class="post" id="${i}">
            <div class="pergunta">${pergunta.texto}</div>
            <div class="alternativas"></div>
            
        </div> `
        while (cont < dadosQuizz.questions[i].answers.length) {
            resposta.push({
                texto: dadosQuizz.questions[i].answers[cont].text,
                imagem: dadosQuizz.questions[i].answers[cont].image,
                correto:dadosQuizz.questions[i].answers[cont].isCorrectAnswer
            });
            cont++
        }
        resposta.sort(randOrd) 
        for (let x = 0; x < resposta.length; x++) {
            let post = document.getElementById(i);
            post.querySelector(".pergunta").style.backgroundColor =`${pergunta.cor}`
            post.querySelector(".alternativas").innerHTML += `
            <div class="resposta "
            onclick="seleciona(this)" value="${resposta[x].correto}">
                <img src="${resposta[x].imagem}">
                <p class="break">${resposta[x].texto}</p>
            </div>`
        }
    }
}
function seleciona(element){
    let alternativa = element.parentNode
    let test =alternativa.querySelectorAll(".resposta")
    for(let i = 0; i < test.length;i++){
        test[i].classList.add("deselecionado")
    }
    element.classList.remove("deselecionado")
    console.log()
    if(element.getAttribute('value') === 'true'){
        alert("acertou")
    }

}



