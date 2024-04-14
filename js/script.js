if (document.getElementById('menu')) {
    fetch('menu_superior.html').then(response => {
        return response.text();
    }).then(htmlContent => {
        document.getElementById('menu').innerHTML = htmlContent;
        window.scrollTo(0, 0);
    });
};

if (document.getElementById('menu_cli')) {
    fetch('menu_cliente.html').then(response => {
        return response.text();
    }).then(htmlContent => {
        document.getElementById('menu_cli').innerHTML = htmlContent;
        window.scrollTo(0, 0);
    });
};

if (document.getElementById('menu_admin')) {
    fetch('menu_admin.html').then(response => {
        return response.text();
    }).then(htmlContent => {
        document.getElementById('menu_admin').innerHTML = htmlContent;
        window.scrollTo(0, 0);
    });
};

//Duplica elementos
if (document.getElementById('mini_producto')) {
    var tarjeta = document.getElementById('mini_producto').outerHTML;
    var tarjetas = '';
    for (i = 0; i < 12; i++) {
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

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()