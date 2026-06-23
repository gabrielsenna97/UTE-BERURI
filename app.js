let ugdAtual = 0;

const banco =
JSON.parse(localStorage.getItem("anomalias")) || [];

function abrir(numero){

ugdAtual = numero;

tituloUGD.innerText =
"UGD " + numero;

modal.style.display = "flex";

}

function fechar(){
modal.style.display = "none";
}

function salvar(){

const ocorrencia = {

ugd:ugdAtual,
os:os.value,
titulo:titulo.value,
descricao:descricao.value,
categoria:categoria.value,
prioridade:prioridade.value,
status:status.value,
responsavel:responsavel.value,
data:new Date().toLocaleString("pt-BR")

};

banco.push(ocorrencia);

localStorage.setItem(
"anomalias",
JSON.stringify(banco)
);

renderizar();

fechar();

}

function renderizar(){

historico.innerHTML = "";

let abertas = 0;
let andamento = 0;
let concluidas = 0;
let criticas = 0;

banco.forEach(item=>{

historico.innerHTML += `
<tr>
<td>${item.ugd}</td>
<td>${item.os}</td>
<td>${item.titulo}</td>
<td>${item.status}</td>
<td>${item.prioridade}</td>
<td>${item.responsavel}</td>
<td>${item.data}</td>
</tr>
`;

if(item.status==="Aberto") abertas++;
if(item.status==="Em Andamento") andamento++;
if(item.status==="Concluído") concluidas++;
if(item.prioridade==="Crítica") criticas++;

});

total.innerText = banco.length;
abertas.innerText = abertas;
andamento.innerText = andamento;
concluidas.innerText = concluidas;
criticas.innerText = criticas;

}

setInterval(()=>{

hora.innerText =
new Date().toLocaleString("pt-BR");

},1000);

renderizar();
