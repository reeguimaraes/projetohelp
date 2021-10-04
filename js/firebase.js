function dadosChamados() {
        
  let departamento = document.getElementById('departamento').value;
  let assunto = document.getElementById('assunto').value;
  let message = document.getElementById('message').value;


  let departamentoV,assuntov,messagev;

}
function Update(type,val) {
  if(type=="departamento") departamentoV=val;
  else if(type=="assunto") assuntov=val;
  else if(type=="message") messagev=val;
}
  const firebaseConfig = {
apiKey: "AIzaSyCIVN0vpyKvOD_8PXkTwRGmgjS5bnNKSTs",
authDomain: "cloud-f3ef6.firebaseapp.com",
projectId: "cloud-f3ef6",
storageBucket: "cloud-f3ef6.appspot.com",
messagingSenderId: "950725135501",
appId: "1:950725135501:web:56b5c4a6aa62d4afdd66c4"
};


firebase.initializeApp(firebaseConfig);
let cloudDB = firebase.firestore();

function Add_Doc_withAutoID(){
let Departamento = document.getElementById('departamento').value;
let Assunto = document.getElementById('assunto').value;
let Message = document.getElementById('message').value;
cloudDB.collection("Chamados").add(
  {
    Departamento: `${Departamento}`,
      Assunto: `${Assunto}`,
      Message: `${Message}`
  }

)
.then(function (docRef){
  console.log("Document written with iD", docRef.id);
  document.getElementById('assuntoChamado').innerHTML = `${Assunto}`;
  
}).catch(function(error){
  console.error("Error Adding document", error);
  
});
}


document.getElementById('insertBtn').onclick=function(){
Add_Doc_withAutoID();
}