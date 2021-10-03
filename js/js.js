var validos = () => {
    if (document.getElementById("name").value == "") return false;
    if (document.getElementById("cpf").value == "") return false;
    if (document.getElementById("celular").value == "") return false;
    if (document.getElementById("cep").value == "") return false;
    if (document.getElementById("logradouro").value == "") return false;
    if (document.getElementById("bairro").value == "") return false;
    if (document.getElementById("localidade").value == "") return false;
    if (document.getElementById("numero").value == "") return false;
    if (document.getElementById("complemento").value == "") return false;
    if (document.getElementById("uf").value == "") return false;
  };
  
  var verify_form = () => {
    if (validos() == false) {
      alert("Dados incompletos");
      return;
    }
}

function mascaraMutuario(o, f) {
  v_obj = o;
  v_fun = f;
  setTimeout("execmascara()", 1);
}

function execmascara() {
  v_obj.value = v_fun(v_obj.value);
}

function cpfCnpj(v) {
  //Remove tudo o que não é dígito
  v = v.replace(/\D/g, "");

  if (v.length <= 13) {
    //CPF

    //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2");

    //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d)/, "$1.$2");

    //Coloca um hífen entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    //CNPJ

    //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");

    //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");

    //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");

    //Coloca um hífen depois do bloco de quatro dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
  }

  return v;
}

function mask(o, f) {
  setTimeout(function () {
    var v = mphone(o.value);
    if (v != o.value) {
      o.value = v;
    }
  }, 1);
}

function mphone(v) {
  var r = v.replace(/\D/g, "");
  r = r.replace(/^0/, "");
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (r.length > 5) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    r = r.replace(/^(\d*)/, "($1");
  }
  return r;
}

//Chama a função pesquisarCep quando o campo CEP perde o foco
//Acessa a API VIACEP e recebe o valor pesquisado na varial end

var carrega_form = (end) => {
  if (end.erro){
    alert("CEP não existe");
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
  } else {
    document.getElementById("logradouro").value = end.logradouro;
    document.getElementById("bairro").value = end.bairro;
    document.getElementById("localidade").value = end.localidade;
    document.getElementById("uf").value = end.uf;
    document.getElementById("numero").focus();
  }
};

var pesquisacep = async () => {
  let cep = document.getElementById("cep").value;
  let url = `http://viacep.com.br/ws/${cep}/json`;
  let dados = await fetch(url);
  let end = await dados.json();
  carrega_form(end);
};

document.getElementById('cep').addEventListener("focusout", pesquisacep);

//criar o JSON

function criar_json() {  

    var obj_form = {
        cep: "",
        endereco: "",
        numero: 0,
        bairro: "",
        localidade: "",
        uf: ""
    }

    obj_form.cep = document.getElementById('cep').value;
    obj_form.endereco = document.getElementById('logradouro').value;
    obj_form.numero = document.getElementById('numero').value;
    obj_form.bairro = document.getElementById('bairro').value;
    obj_form.localidade = document.getElementById('localidade').value;
    obj_form.uf = document.getElementById('uf').value;

    var json = JSON.stringify(obj_form);

    document.write("<h1>Dados em Json</h1>");
    document.write(json);
    

}

function verificar () {
    if(validos() != false) {
        criar_json();
    }else {
        alert("Dados incompletos")
        return;
    }
}



