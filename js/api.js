$(document).ready(function () {
    $.get('http://fakestoreapi.com/products', function (data) {
        $('#fila_ropa').empty();
        $.each(data, function (i, item) {
            var fila = `
            <div class="col p-2 col-sm_12 col-md-6 col-lg-4 col-xl-3">
                <div class="card pt-3 " style="width: 18rem;">
                    <img src="${item.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <span class="index_stock">${item.description}</span>
                        </li>
                        <li class="list-group-item">
                            <span class="index_stock">Color: ${item.color}</span>
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

