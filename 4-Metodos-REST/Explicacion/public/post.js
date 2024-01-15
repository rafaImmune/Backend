function peticion(){

    fetch('/hola', {
        method: "PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            nombre: document.getElementById("nombrePUT").value
        })


    })
}