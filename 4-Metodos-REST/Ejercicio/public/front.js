fetch('/personas').then((res)=>res.json()).then((data)=>{
    data.forEach(persona => {
        document.getElementById('lista').innerHTML += `<div><p>${persona.nombre} ${persona.apellido}</p><p>${persona.edad}</p></div>`
    });
})

