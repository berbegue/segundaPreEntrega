console.log('Pre-entrega 2 en funcionamiento');

let ingreso=0
let plazo=0
let TNA=0
let monto=0;
let Credito=[];
let Credito1=[];
let info=0;
let C=0;
let nuevop=0;
let Datos={};
let flag1 = true;
const boton = document.querySelector('#boton')
const inputs=document.querySelectorAll('input');
inputs.forEach( input=>{
    input.onfocus=()=>{
        input.previousElementSibling.classList.add('top');
        input.previousElementSibling.classList.add('focus');
        input.parentNode.classList.add('focus');
    }
    input.onblur=()=>{
        input.value = input.value.trim();
        if(input.value.trim().length==0){
        input.previousElementSibling.classList.remove('top');
        }
        input.previousElementSibling.classList.remove('focus');
        input.parentNode.classList.remove('focus');
    }
});
function calculoCredito(TNA,ingreso,plazo){
    let j=TNA/12;
    C=(monto*j*(1+j)**plazo)/((1+j)**plazo-1);
    let Tp=0;
    let tpi=0;
    let Si=0;
    let ip=0;
    let Si0=monto;
    const in3= document.getElementById('name');
    const in4= document.getElementById('lastname');
    const in5= document.getElementById('dni');
    const in6= document.getElementById('email');
    const in7= document.getElementById('phoneNum');
    const in8= document.getElementById('dateOfBirth');
    nom = in3.value ;
    ape = in4.value ;
    dni = in5.value ;
    email = in6.value ;
    tel = in7.value ;
    nac = in8.value ;
    Datos={Nombre: nom, Apellido: ape, DNI: dni, email: email, Telefono: tel, FechaNac: nac};
    
    for(i=1;i<=plazo;i++){
        tpi=C-Si0*j-Si*j;    
        Tp=Tp+tpi;    
        Si=monto-Tp;
        ip=C-tpi;
        Si0=0
        Credito.push({Periodo:  i.toFixed(0), Capital:  tpi.toFixed(2) , Interes:  ip.toFixed(2), Saldo: Si.toFixed(2)});

    }
}
function visualizar(elemento){
    Swal.fire({
        icon: 'success',
        text: 'TENEMOS TU CREDITO Nos pondremos en contacto para brindarte mas información',
        showConfirmButton: true,
     });
        let data = document.createElement('p')
        data.innerText=`Señor ${Datos1["Nombre"] + ' ' + Datos1["Apellido"]} tiene un credito preaprobado de $${monto}` 
        document.body.append(data)
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);  
        document.body.appendChild(table);
        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Periodo";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Capitál";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Interes";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Saldo";
        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        thead.appendChild(row_1); 
        Credito1.forEach(e => {
        let fila = document.createElement('tr');
        let fila_col1 = document.createElement('td');
        fila_col1.innerHTML = e.Periodo;
        let fila_col2 = document.createElement('td');
        fila_col2.innerHTML = `$${e.Capital}`;
        let fila_col3 = document.createElement('td');
        fila_col3.innerHTML =`$${e.Interes}`;
        let fila_col4 = document.createElement('td');
        fila_col4.innerHTML = `$${e.Saldo}`;
        fila.appendChild(fila_col1);
        fila.appendChild(fila_col2);
        fila.appendChild(fila_col3);
        fila.appendChild(fila_col4);
        tbody.appendChild(fila);
})
        
} 
  
function guardar (Credito,Datos){
    localStorage.setItem("Credito1",JSON.stringify(Credito));
    localStorage.setItem("Datos1",JSON.stringify(Datos));
    }
function extraer (){
    Credito1 = JSON.parse(localStorage.getItem("Credito1"))
    Datos1 = JSON.parse(localStorage.getItem("Datos1"))
    console.log(Datos1);
    }  

    function ejecucion (){
        localStorage.clear
        const in1= document.getElementById('ingreso');
        ingreso = in1.value ;
        const in2= document.getElementById('plazo') ;
        plazo = parseInt(in2.value) ;
        monto=(ingreso*.2*plazo);
        TNA=10000/(ingreso/plazo);
        calculoCredito(TNA,monto,plazo);
        guardar(Credito,Datos);  
        extraer();
        Credito=[];
    }



boton.addEventListener('click', ()=>{ 
    ejecucion();
    flag1 ? visualizar('Saldo') : Swal.fire({
                                            icon: 'error',
                                            text: 'PRESIONA RESET PARA INGRESAR VALORES',
                                            showConfirmButton: false,
                                            timer: 1500
                                         });
    flag1 = false;
   
})
boton2.addEventListener('click', ()=>{ 
    location.reload();       
})