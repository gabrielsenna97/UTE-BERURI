// ===============================
// UTE MAUÉS - Gestão de Ocorrências
// app.js
// ===============================

const mapa = document.getElementById("mapa");
const modal = document.getElementById("modal");
const tituloUGD = document.getElementById("tituloUGD");

const campoData = document.getElementById("data");
const campoColaborador = document.getElementById("colaborador");
const campoOcorrencia = document.getElementById("ocorrencia");
const historico = document.getElementById("historico");

let ugdAtual = "";

//======================
// Cria as 60 UGD
//======================

for(let i=1;i<=60;i++){

    const div = document.createElement("div");

    div.className="ugd operando";

    div.innerHTML="UGD "+String(i).padStart(2,"0");

    div.onclick=()=>abrirModal(i);

    mapa.appendChild(div);

}

//======================
// Abrir Modal
//======================

function abrirModal(numero){

    ugdAtual="UGD "+String(numero).padStart(2,"0");

    tituloUGD.innerHTML=ugdAtual;

    campoData.value=new Date().toISOString().substring(0,10);

    campoColaborador.value="";

    campoOcorrencia.value="";

    carregarHistorico();

    modal.style.display="flex";

}

//======================

function fecharModal(){

    modal.style.display="none";

}

//======================
// Salvar Registro
//======================

function salvarRegistro(){

    if(campoColaborador.value==""){

        alert("Informe o colaborador.");

        return;

    }

    if(campoOcorrencia.value==""){

        alert("Informe a ocorrência.");

        return;

    }

    let banco=JSON.parse(localStorage.getItem("ocorrencias")) || {};

    if(!banco[ugdAtual]){

        banco[ugdAtual]=[];

    }

    banco[ugdAtual].push({

        data:campoData.value,

        colaborador:campoColaborador.value,

        ocorrencia:campoOcorrencia.value

    });

    localStorage.setItem("ocorrencias",JSON.stringify(banco));

    carregarHistorico();

    campoOcorrencia.value="";

}

//======================
// Histórico
//======================

function carregarHistorico(){

    let banco=JSON.parse(localStorage.getItem("ocorrencias")) || {};

    historico.innerHTML="";

    if(!banco[ugdAtual] || banco[ugdAtual].length==0){

        historico.innerHTML="<p>Nenhum registro.</p>";

        return;

    }

    banco[ugdAtual].forEach((item,index)=>{

        historico.innerHTML+=`

        <div class="registro">

        <strong>${item.data}</strong><br><br>

        <b>${item.colaborador}</b>

        <p>${item.ocorrencia}</p>

        <button onclick="excluirRegistro(${index})">

        Excluir

        </button>

        </div>

        `;

    });

}

//======================
// Excluir Registro
//======================

function excluirRegistro(index){

    if(!confirm("Excluir registro?")) return;

    let banco=JSON.parse(localStorage.getItem("ocorrencias")) || {};

    banco[ugdAtual].splice(index,1);

    localStorage.setItem("ocorrencias",JSON.stringify(banco));

    carregarHistorico();

}

//======================
// Pesquisa
//======================

function pesquisarUGD(){

    const texto=document.getElementById("pesquisa").value.toUpperCase();

    const lista=document.querySelectorAll(".ugd");

    lista.forEach(item=>{

        if(item.innerHTML.toUpperCase().includes(texto)){

            item.style.display="block";

        }else{

            item.style.display="none";

        }

    });

}

//======================
// Fecha Modal clicando fora
//======================

window.onclick=function(event){

    if(event.target==modal){

        fecharModal();

    }

}
