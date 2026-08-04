/* ==========================================
   UTE MAUÉS - SUPERVISÓRIO 3D
   CONTROLE DOS 60 GERADORES
========================================== */


const listaGeradores = document.getElementById("geradores");



/*
  Lista de códigos dos grupos.
  Pode ser alterada conforme a identificação real.
*/

const geradores = [

"550-0024R",
"550-0028R",
"550-0562",
"550-0589",
"550-0184",
"550-0590",
"550-0142",
"550-0597",
"550-0565",
"550-0176",
"550-0598",
"550-0591",
"550-0566",
"550-0027R",
"550-0471",
"550-0476",
"550-0601",
"550-0305",
"550-0599",
"550-0592",
"550-0593",
"550-0600",
"550-0581",
"550-0512R",
"550-0302R",
"360-0015",
"550-0366",
"550-0594",
"550-0241R",
"550-0367",
"550-0344R",
"550-0482",
"550-0209R",
"550-0596",
"550-0563",
"550-0517",
"550-0251R",
"550-0582",
"550-0025R",
"625-0038",
"550-0595",
"550-0515",
"550-0518",
"550-0609R",
"550-0321R",
"550-0515",
"550-0602",
"550-0518",
"625-0019",
"550-0297R",
"550-0715",
"550-0038R",
"550-0583",
"1808201",
"1808203",
"1808198",
"1808199",
"1808205",
"1808200",
"625-0017",
"550-KTA"

];





/* CRIA OS 60 CARTÕES */


geradores.forEach((codigo,index)=>{


let numero = index + 1;



let div = document.createElement("div");


div.className="gerador online";



div.innerHTML=`

<div class="codigo">
${codigo}
</div>


<div class="numero">
${numero.toString().padStart(2,'0')}
</div>


<div class="estado">

<div class="mini-led"></div>

<span>
ONLINE
</span>

</div>

`;





/*
Clique no gerador troca o estado:

1º clique = ONLINE
2º clique = ALARME
3º clique = OFFLINE

*/

let estado = 0;



div.addEventListener("click",()=>{


estado++;



if(estado>2){

estado=0;

}



if(estado===0){


div.className="gerador online";


div.querySelector(".estado span").innerHTML=
"ONLINE";


}



if(estado===1){


div.className="gerador alarmado";


div.querySelector(".estado span").innerHTML=
"ALARME";


}



if(estado===2){


div.className="gerador offline";


div.querySelector(".estado span").innerHTML=
"OFFLINE";


}



atualizarResumo();


});



listaGeradores.appendChild(div);



});









/* CONTADOR DO PAINEL */


function atualizarResumo(){


let online =
document.querySelectorAll(".online").length;



let alarm =
document.querySelectorAll(".alarmado").length;



let off =
document.querySelectorAll(".offline").length;



document.getElementById("online").innerHTML=
online;



document.getElementById("alarme").innerHTML=
alarm;



document.getElementById("parados").innerHTML=
off;



}







/* SIMULAÇÃO AUTOMÁTICA DE STATUS */


setInterval(()=>{


let lista =
document.querySelectorAll(".gerador");



let aleatorio =
Math.floor(Math.random()*lista.length);



let equipamento =
lista[aleatorio];



/*
Pequena simulação:
alguns equipamentos piscam como supervisório real
*/


if(Math.random() > 0.7){


equipamento.className="gerador alarmado";


equipamento.querySelector(".estado span").innerHTML=
"ALARME";


}
else{


equipamento.className="gerador online";


equipamento.querySelector(".estado span").innerHTML=
"ONLINE";


}



atualizarResumo();



},10000);






// inicia contadores

atualizarResumo();
