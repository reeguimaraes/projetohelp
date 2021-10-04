var ocorrencia;
// CRIA UMA FUNÇÃO QUE RETORNA UM OBJETO, E SALVA EM UMA VARIAVEL
function newChamado (assunto, departamento, message) {
    ocorrencia = {
        assunto: assunto,
        departamento: departamento,
        message: message,
    }
}
// PEGA A DIV A QUAL VAI SER INSERIDO AS OCORRENCIAS
var divChamado = document.getElementById("chamado-aberto");

var btNewchamado = document.getElementById("criar-chamado");

//  NO BOTÃO DO MODAL DE OCORRENCIAS ONDE VAI SER INSERIDO AS OCORRENCIAS, ADICIONAR A FUNÇÃO AABAIXO
btNewchamado.addEventListener("click", inserirChamadosComPromise);

// CRIANDO FUNÇÃO SOMENTE PARA A EXECUÇÃO DA OUTRO FUNÇÃO COM PROMISE
function inserirChamadosComPromise(){
    verificaCamposChamados().then(() => {
        inserirChamadosComPromise();
    }).catch(() => {
        alert("Preencha todos os campos");
    })
}
// FUNÇÃO COM PROMISE PARA VERIFICAR OS CAMPOS DO MODAL SE ESTÃO PREENCHIDOS
function verificaCamposChamados() {
    let assunto = document.getElementById("assunto").value;
    let departamento = document.getElementById("departamento").value;
    let message = document.getElementById("message");
    let valueDepartamento = departamento.options[departamento.selectedIndex].value;

    let promise = new Promise(function  (resolve, reject) {

        if(assunto !== "" && departamento !== "" && valueDepartamento !== "" && message !== ""){
            resolve();
        }
        else{
            reject();
        }
    })
    return promise;
}
// INSERE A OCORRENCIA TANTO NA TELA QUANTO NO BANCO
function inserirChamados() {
    let assunto = document.getElementById("assunto").value;
    let departamento = document.getElementById("departamento").value;
    let message = document.getElementById("message");
    let valueDepartamento = departamento.options[departamento.selectedIndex].text;
 
    // CHAMA A FUNÇÃO QUE RETORNA UM OBJETO E PASSA AS VARIAVEIS QUE FORAM PASSADAS NOS INPUTS A CIMA
    newChamado(assunto, departamento, message);
    
    // SALVA O OBJETO DENTRO DE UM ARRAY NO BANCO
    db.collection("chamados").doc(uid).update({
        chamados: firebase.firestore.FieldValue.arrayUnion(chamados),

    }).then(() => {
        // DEPOIS DE TER SALVO, ADICIONA NO MODAL AS OCORRENCIAS
        divOcorrencia.innerHTML += ` 
        <div class="chamado-aberto">
        <a href="#" title="Ver os detalhes">
          <h4>Protocolo #: ${assunto}</h4>
          <p>${departamento}
          <p>${message}</p>
        </a>
     <hr>
        `;

     // LIMPA OS INPUT
     document.getElementById("motivo").value = "";
     document.getElementById("data").value = "";
     tipo.options.selectedIndex = "0";

    }).catch( err => {
        console.log(err, "Deu erro");
    })  

   

}