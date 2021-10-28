// seleccionando los elementos globales para trabajar

const AreaArrastre = document.querySelector(".area-arrastrar")
 AreaTexto = AreaArrastre.querySelector('p')
 button = AreaArrastre.querySelector('button')
 input = AreaArrastre.querySelector('input')
let archivo;

// si el usuario hace click en el boton, tambien lo hara en el input
button.onclick = ()=>{
  input.click()
}

input.addEventListener('change', function(){
  archivo = this.files[0]
  AreaArrastre.classList.add('activa')
  mostrarArchivo();
})


// si el usuario pasa el archivo sobre el área
AreaArrastre.addEventListener("dragover", (event)=>{
  event.preventDefault()
  AreaArrastre.classList.add('activa')
  AreaTexto.textContent ="Suelte para subir archivo"
});

// si el usuario se sale del area
AreaArrastre.addEventListener("dragleave", ()=>{
  AreaArrastre.classList.remove('activa')
  AreaTexto.textContent ="Arrastrar y soltar para cargar archivo"
});
// si el usuario suelta el archivo en el area
AreaArrastre.addEventListener("drop", (event)=>{

  event.preventDefault()
  archivo = event.dataTransfer.files[0] // esto se usa para cargar el archivo 
  mostrarArchivo();
});

function mostrarArchivo (){
  // validar la extension del archivo
  let ExtensionValida = [ 'image/jpeg','image/jpg','image/png']
  let TipoArchivo = archivo.type

  if (ExtensionValida.includes(TipoArchivo)){
    let lecturaArchivo = new FileReader(); // creacion de un objeto que lee el archivo

    lecturaArchivo.onload = ()=>{
      let URLArchivo = lecturaArchivo.result; //pasamos el archivo a la variable urlArchivo
      
      let etiquetaImagen = `<img src="${URLArchivo}"> </img>`;
      AreaArrastre.innerHTML = etiquetaImagen; //se usa para agregar la imagen
    }
    lecturaArchivo.readAsDataURL(archivo) //me devuelve una url con los datos leidos del archivo

  }else{
    alert('Archivo no valido')
    AreaArrastre.classList.remove('activa')
  }
}