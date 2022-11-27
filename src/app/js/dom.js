const newRecordSection = document.querySelector('#new-record-section');
const urlInput = document.querySelector('#url-input')
const camaraSelect = document.querySelector('#camara-select')
const selectEspecie = document.querySelector('#select-especie')
const dateRecordInput = document.querySelector('#input-date-record')
const timeRecordInput = document.querySelector('#input-time-record')
const sexoSelect = document.querySelector('#select-sexo')
const selectEdad = document.querySelector('#select-edad')
const checkboxGroupActividades = document.querySelector("#checkbox-group-actividades")
const inputCantidad = document.querySelector('#input-cantidad')
const selectClima = document.querySelector('#select-clima')
const inputTemperatura = document.querySelector('#input-temperatura')
const selectLuna = document.querySelector('#select-luna')
const checkboxGroupHumanos = document.querySelector('#checkbox-group-humanos')
const textareaObservaciones = document.querySelector('#textarea-observaciones')
const buttonNuevo = document.querySelector('#button-nuevo')
const nav = document.querySelector('#nav')
const buttonCerrarNuevo = document.querySelector("#button-cerrar-nuevo")
const buttonAgregarRegistro = document.querySelector("#button-agregar-registro")
const sectionMessages = document.querySelector('#section-messages')
const background = document.querySelector('#background')
const messageContent = document.querySelector('#message-content')
const buttonCerrarMessage = document.querySelector('#button-cerrar-message')

let ventanaAbierta

buttonNuevo.addEventListener('click', function() {
    traerAlFrente(newRecordSection)
    buttonAgregarRegistro.classList.remove('hidden')
})
buttonCerrarNuevo.addEventListener('click', function() {
    llevarAlFondo(newRecordSection)
    buttonAgregarRegistro.classList.add('hidden')
})

buttonCerrarMessage.addEventListener('click', function () {
    cerrarMensaje()
})

const mostrarMensaje = function (content, element) {
    ventanaAbierta = element
    aplicarBlur(element)
    messageContent.innerHTML = content
    traerAlFrente(sectionMessages)
}

const cerrarMensaje = function () {
    sectionMessages.classList.add('hidden')
    quitarBlur(ventanaAbierta)
    messageContent.innerHTML = ""
}

const traerAlFrente = function (element) {
    element.classList.remove('hidden')
    aplicarBlur()
    quitarBlur(element)
}

const llevarAlFondo = function (element) {
    element.classList.add('hidden')
    quitarBlur()
}

const aplicarBlur = function (element='All') {
    if(element === 'All') {
        let sections = Array.from(background.children)
        sections.forEach(section => {
            section.classList.add('blur')
        })
    } else {
        element.classList.add('blur')
    }
}

const quitarBlur = function (element='All') {
    if(element === 'All') {
        let sections = Array.from(background.children)
        sections.forEach(section => {
            section.classList.remove('blur')
        })
    } else {
        element.classList.remove('blur')
    }
}

const rellenarSelectCamaras = function (camaras) {
    let contenido = null
    
    camaras.forEach((camara) => {
        contenido = camara.nombre + " - " + camara.sendero
        camaraSelect.innerHTML += `
        <option value="${camara.id}">${contenido}</option>
        `
    });
    console.log("%c\tSe relleno el select de camaras", "color: #1ac888")
}

const rellenarSelectEspecies = function (especies) {
    let contenido = null;
    especies.forEach((especie) => {
        contenido =
            especie.genero + " - " + especie.especie + " - " + especie.comun;
        selectEspecie.innerHTML += `
            <option value="${especie.id}">${contenido}</option>
            `;
    });
    console.log("%c\tSe relleno el select de especies", "color: #1ac888");
};

const rellenarCheckBoxGroupActividades = function (actividades) {
    let name = null
    let contenido = null
    actividades.forEach(actividad => {
        name = "actividad" + actividad.id
        contenido = actividad.emoticon + " " + actividad.actividad
        checkboxGroupActividades.innerHTML += `
        <label for="${name}"><input type="checkbox" name="${name}" id="${name}" value="${actividad.id}">${contenido}</label>
        `
    })
    console.log("%c\tSe relleno el checkBoxGroup de actividades", "color: #1ac888")
}

const capturarCheckBoxSeleccionados = function(element) {
    let selecionados = []
    let labels = Array.from(element.children)
    labels.forEach(label => {
        if(label.firstChild.checked) {
            selecionados.push(label.lastChild.textContent)
        }
    })
    return selecionados
}
//! Tiene potencial
const crearAlerta = function (element, mensaje, tipo = "error") {
    let padre = element.parentNode
    let divAlert = document.createElement('div')
    divAlert.classList.add('alert')
    divAlert.classList.add(`alert-${tipo}`)
    divAlert.innerHTML = mensaje

    padre.insertBefore(divAlert, padre.firstChild)
}

const lanzarMensaje = function (mensaje, tipo='error') {
    sectionRecordMessages.classList.remove('hidden')
    sectionRecordMessages.classList.add(`alert-${tipo}`)
    sectionRecordMessages.innerHTML = mensaje
}

module.exports = {
    "rellenarSelectCamaras": rellenarSelectCamaras,
    "rellenarSelectEspecies": rellenarSelectEspecies,
    "rellenarCheckBoxGroupActividades": rellenarCheckBoxGroupActividades,
    "aplicarBlur":aplicarBlur,
    "quitarBlur": quitarBlur,
    "capturarCheckBoxSeleccionados": capturarCheckBoxSeleccionados,
    "crearAlerta": crearAlerta,
    "mostrarMensaje": mostrarMensaje,
    "section": {
        "newRecordSection": newRecordSection,
        "nav": nav,
    },
    "input": {
        "url": urlInput,
        "date": dateRecordInput,
        "time": timeRecordInput,
        "cantidad": inputCantidad,
        "temperatura": inputTemperatura,
        "observaciones": textareaObservaciones
    },
    "select": {
        "camara": camaraSelect,
        "sexo": sexoSelect,
        "edad": selectEdad,
        "clima": selectClima,
        "luna": selectLuna,
        "especie": selectEspecie
    },
    "checkbox": {
        "actividades": checkboxGroupActividades,
        "humanos": checkboxGroupHumanos
    },
    "button": {
        "agregarRegistro":buttonAgregarRegistro
    }
}