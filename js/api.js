$(document).ready(function () {
    // Función para recortar el texto a tres líneas y agregar "Leer más..."
    function recortarDescripcion(descripcion, longitudMaxima) {
        // Verificar si la longitud de la descripción es mayor que la longitud máxima permitida
        if (descripcion.length > longitudMaxima) {
            // Recortar la descripción a la longitud máxima y añadir "..."
            var descripcionRecortada = descripcion.substring(0, longitudMaxima) + "...";
            // Devolver la descripción recortada con un enlace de "Leer más..."
            return `${descripcionRecortada} <a href="#" class="leer-mas">Leer más...</a>`;
        } else {
            // Si la descripción no es más larga que la longitud máxima, devolver la descripción sin cambios
            return descripcion;
        }
    }

    $.get('http://fakestoreapi.com/products', function (data) {
        $('#fila_ropa').empty();
        $.each(data, function (i, item) {
            // Recortar la descripción a tres líneas y agregar "Leer más..."
            var descripcionRecortada = recortarDescripcion(item.description, 100); 
            var fila = `
            <div class="col p-2 col-sm_12 col-md-6 col-lg-4 col-xl-3">
                <div class="card pt-3 " style="width: 18rem;">
                    <img src="${item.image}" class="card-img-top" alt="..." style="max-width: 50%; height: 200px; margin: 0 auto;">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <span class="index_stock">${descripcionRecortada}</span>
                        </li>
                        <li class="list-group-item">
                            <span class="index_stock">Categoría: ${item.category}</span>
                        </li>
                        <li class="list-group-item">
                            <span class="index_stock">Precio: $ ${item.price}</span>
                        </li>
                    </ul>
                </div>
            </div>`;
            $('#fila_ropa').append(fila);
        });
    });
});
