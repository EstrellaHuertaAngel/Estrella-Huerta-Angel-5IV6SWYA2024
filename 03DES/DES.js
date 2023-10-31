function camposVacios(){
    var clave = document.getElementById("clave").value;

    if(clave == ""){
        alert("La clave no puede estar vacia");
    }
}

function longitudClaveCifrar(){
    camposVacios();
    var clave = document.getElementById("clave").value;

    if(clave.length < 8){
        alert("La clave debe contener 8 caracteres exclusivamente");
    }else{
        cifrado();
    }
}

function longitudClaveDescifrar(){
    camposVacios();
    var clave = document.getElementById("clave").value;

    if(clave.length < 8){
        alert("La clave debe contener 8 caracteres exclusivamente");
    }else{
        descifrado();
    }
}

function cifrado() {
    const archivoInput = document.getElementById("file");
    const file = archivoInput.files[0];
    const fileName = archivoInput.files[0].name.split('.')[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const mensaje = e.target.result;
            const clave = document.getElementById("clave").value;
            console.log("Clave:", clave);
            console.log("Nombre del archivo:", fileName);
            console.log("Contenido del archivo:", mensaje);


            
            const mensajeCifrado = CryptoJS.DES.encrypt(mensaje, clave).toString();
            

            
            const blob = new Blob([mensajeCifrado.toString()], { type: "text/plain" });

            const blobURL = URL.createObjectURL(blob);

            
            const a = document.createElement("a");
            a.href = blobURL;
            const archivoCifradoName = fileName + "_cifrado.txt";
            a.download = archivoCifradoName; 
            a.style.display = "none";

            
            document.body.appendChild(a);

           
            a.click();

            
            document.body.removeChild(a);

            
            URL.revokeObjectURL(blobURL);
        };
        reader.readAsText(file);
    } else {
        alert("Por favor, seleccione un archivo txt");
    }
}

function descifrado() {
    const archivoInput = document.getElementById("file");
    const file = archivoInput.files[0];
    const fileName = archivoInput.files[0].name.split('.')[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const mensaje = e.target.result;
            const clave = document.getElementById("clave").value;
            const textArea = document.getElementById("texto_descifrado");
            console.log("Clave:", clave);
            console.log("Nombre del archivo:", fileName);
            console.log("Contenido del archivo:", mensaje);


            
            const mensajeDescifrado = CryptoJS.DES.decrypt(mensaje, clave).toString();
            
            
            console.log("Mensaje descifrado:", mensajeDescifrado);

            
            let ascii = '';
            for (let i = 0; i < mensajeDescifrado.length; i += 2) {
                const hexPair = mensajeDescifrado.substr(i, 2);
                const decimalValue = parseInt(hexPair, 16);
                ascii += String.fromCharCode(decimalValue);
            }

            textArea.value = ascii;
        };
        reader.readAsText(file);
    } else {
        alert("Por favor, seleccione un archivo txt");
    }
}


function generarEnlace() {
    const inputElement = document.getElementById("newfile");
    const linkDescargaTextarea = document.getElementById("link_descarga");
    
    if (inputElement.files.length > 0) {
        const file = inputElement.files[0];
        
        // Crear un Blob con el archivo
        const blob = new Blob([file], { type: file.type });
        
        // Crear un objeto URL para el Blob
        const blobURL = URL.createObjectURL(blob);
        
        // Crear un enlace de descarga
        const enlaceDescarga = document.createElement("a");
        enlaceDescarga.href = blobURL;
        enlaceDescarga.download = file.name;
        enlaceDescarga.textContent = "Descargar Archivo";
        
        // Mostrar el enlace en el textarea
        linkDescargaTextarea.value = enlaceDescarga.href;
    } else {
        alert("Por favor, selecciona un archivo");
    }
}

