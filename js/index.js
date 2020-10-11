window.confesiones = [];
tinymce.init({
  selector: '#texto-txt',
  height: 200,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'
  ],
  toolbar: 'undo redo | formatselect | ' +
  'bold italic backcolor | alignleft aligncenter ' +
  'alignright alignjustify | bullist numlist outdent indent | ' +
  'removeformat | help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});

window.eliminar = function(){
  let nroConfesion = this.nroConfesion;
  Swal.fire({
    title: '¿Desea descartar este comentario?',
    text: "Esta accion no se puede deshacer",
    icon: 'warningerror',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, descartar!',
    cancelButtonText:'No, me arrepentí'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Descartado!',
        'El comentario fue eliminado.',
        'success'
      )
    }
  });
  window.confesiones.splice(nroConfesion,1);
  window.cargarTabla();
};

window.cargarTabla = ()=>{
  const tabla = document.querySelector("#confesiones-table > tbody");
  tabla.innerHTML = "";
  for(let i=0; i < window.confesiones.length; ++i){
        let confesionActual = window.confesiones[i];
        let tr = document.createElement("tr");

        let tdNombre = document.createElement("td");
        let tdTexto = document.createElement("td");
        let tdCarrera = document.createElement("td");
        let tdAcciones = document.createElement("td");
        tdNombre.innerText = confesionActual.nombre;
        tdTexto.innerHTML = confesionActual.texto;
        tdCarrera.innerText = confesionActual.carrera;
        let boton = document.createElement("button");
        boton.classList.add("btn","btn-danger","btn-sm");
        boton.innerText = "Descartar comentario";
        boton.nroConfesion = i;
        boton.addEventListener('click', window.eliminar);
        tdAcciones.appendChild(boton);
        tr.appendChild(tdNombre);
        tr.appendChild(tdTexto);
        tr.appendChild(tdCarrera);
        tr.appendChild(tdAcciones);
        tabla.appendChild(tr);
  }
}
window.mostrarErrores = (errores)=>{
  let erroresDiv = document.querySelector("#errores-div");
  let ul = document.createElement("ul");
  ul.classList.add("alert","alert-warning");
  errores.forEach(e=>{
    let li = document.createElement("li");
    li.innerText = e;
    ul.appendChild(li);
  });
  erroresDiv.appendChild(ul);
};
const boton = document.querySelector("#ingresar-btn");

boton.addEventListener('click', ()=>{

  document.querySelector("#errores-div").innerHTML = "";
  let nombre = document.querySelector("#nombre-txt").value.trim;
  let texto = tinymce.get("#texto-txt").getContent();
  let carrera = document.querySelector("#carrera-select").value;

  let errores = [];

  if(nombre ===''){
    errores.push("Debe ingresar un nombre");
  }

  if(texto ===''){
    errores.push("Debe ingresar su confesión");
  }

  if(errores.length === 0){
    //crear la confesion
    let confesion = {};
    confesion.nombre = nombre;
    confesion.texto = texto;
    confesion.carrera = carrera;
    window.confesiones.push(confesion);
    window.cargarTabla();
  }else {

    //mostrar errores
    window.mostrarErrores(errores);
  }



});
