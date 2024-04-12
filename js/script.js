if (document.getElementById('menu')) {
    fetch('menu_superior.html').then(response => {
        return response.text();
    }).then(htmlContent => {
        document.getElementById('menu').innerHTML = htmlContent;
        window.scrollTo(0, 0);
    });
};

//Duplica elementos
if (document.getElementById('mini_producto')) {
    var tarjeta = document.getElementById('mini_producto').outerHTML;
    var tarjetas = '';
    for (i = 0; i < 10; i++) {
        tarjetas = tarjetas + tarjeta;
    }
    document.getElementById('mini_producto').outerHTML = tarjetas;
}

if (document.getElementById('pie')) {
    fetch('pie_pagina.html').then(response => {
        return response.text();
    }).then(htmlContent => {
        document.getElementById('pie').innerHTML = htmlContent;
        window.scrollTo(0, 0);
    });
};