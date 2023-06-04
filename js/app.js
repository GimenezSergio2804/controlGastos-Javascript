const ingresos = [];
const egresos = [];


// ********************************************** CARGA DE TODO ***************************************************************

let cargarApp = ()=>{
    cargarLocalStorageIngresos();
    cargarLocalStorageEgresos();
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

// =============================================== TOTAL INGRESOS =============================================================

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

// =============================================== TOTAL EGRESOS =============================================================

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

// =============================================== HEADER PRESUPUESTO =============================================================

let cargarCabecero = ()=>{

    let presupuesto = totalIngresos() - totalEgresos();
//    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentaje());
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

// =============================================== FORMATO MONEDA Y PORCENTAJE =============================================================

const formatoMoneda = (valor)=>{
    return valor.toLocaleString('es-AR',{style:'currency', currency:'ARS', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('es-AR',{style:'percent', minimumFractionDigits:2});
}

// con esta funcion evito el error de NAN si ambos datos estan en cero. ya que no se pueden dividir
const porcentaje = () =>{
    if(totalEgresos() === 0 && totalIngresos() === 0){
        return 0;
    }else {
        return (totalEgresos()/totalIngresos())
    }
}
// =============================================== INGRESOS =============================================================


const cargarLocalStorageIngresos = ()=>{
    if(localStorage.getItem('Ingresos')){
    // traigo la data del local storage si es que tiene
    const arrayLocalStorageIngresos = JSON.parse(localStorage.getItem('Ingresos'));
    // recorro al array y pusheo los objetos a mi array de ingresos local
    for(let i = 0 ; i < arrayLocalStorageIngresos.length ; i++ ){
 
        ingresos.push(new Ingreso(arrayLocalStorageIngresos[i]._descripcion, arrayLocalStorageIngresos[i]._valor));
    }
    } else {
        console.log("Nada guardado en el localStorage : INGRESOS")
    }
}

const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="trash-outline"
                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
    
}

const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
    localStorage.removeItem('Ingresos')
    if(ingresos != ''){
        localStorage.setItem('Ingresos', JSON.stringify(Ingresos));
        iziToast.show({
            title: 'Hey',
            message: 'What would you like to add?'
        });
    } else {
        console.log("Eliminado Ultimo elemento de Ingresos");
    }
    
}

// =============================================== EGRESOS =============================================================

const cargarLocalStorageEgresos = ()=>{
    if(localStorage.getItem('Egresos')){
    // traigo la data del local storage si es que tiene
    const arrayLocalStorageEgresos = JSON.parse(localStorage.getItem('Egresos'));
    // recorro al array y pusheo los objetos a mi array de ingresos local
    for(let i = 0 ; i < arrayLocalStorageEgresos.length ; i++ ){
 
        egresos.push(new Egreso(arrayLocalStorageEgresos[i]._descripcion, arrayLocalStorageEgresos[i]._valor));
    }
    } else {
        console.log("Nada guardado en el localStorage : EGRESOS")
    }
}

const cargarEgresos = ()=>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="trash-outline"
                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHTML;
}

const eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex( egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
    localStorage.removeItem('Egresos')
    if(egresos != ''){
        localStorage.setItem('Egresos', JSON.stringify(Egresos));
    } else {
        console.log("Eliminado Ultimo elemento de Egresos");
    }

}

// =============================================== AGREGAR DATOS NUEVOS =============================================================

let agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
            localStorage.setItem('Ingresos', JSON.stringify(ingresos));
            cargarCabecero();
            cargarIngresos();
            localStorage.removeItem('Ingresos')
            localStorage.setItem('Ingresos', JSON.stringify(ingresos));
            // esto mas adelante lo puedo poner en una funcion para achicar codigo
            forma['descripcion'].value = '';
            forma['valor'].value = '';
        }
        else if(tipo.value === 'egreso'){
            egresos.push( new Egreso(descripcion.value, +valor.value));
            localStorage.setItem('Egresos', JSON.stringify(egresos));
            cargarCabecero();
            cargarEgresos();
            localStorage.removeItem('Egresos')
            localStorage.setItem('Egresos', JSON.stringify(egresos));
            // esto mas adelante lo puedo poner en una funcion para achicar codigo
            forma['descripcion'].value = '';
            forma['valor'].value = '';
        }
    }
}