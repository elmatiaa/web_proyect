$(document).ready(function() {
  // Agregar método de validación para RUT chileno
  $.validator.addMethod("rutChileno", function(value, element) {
    // Validar que el RUT tenga el formato correcto (8 o 9 dígitos + guión + dígito verificador)
    var rutPattern = /^\d{7,8}-[\dK]$/;
    if (!rutPattern.test(value)) {
        return false;
    }
    // Validar el dígito verificador
    var rutSinGuion = value.replace("-", "");
    var rut = rutSinGuion.slice(0, -1);
    var dv = rutSinGuion.slice(-1);
    var factor = 2;
    var sum = 0;
    for (var i = rut.length - 1; i >= 0; i--) {
        sum += parseInt(rut.charAt(i)) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }
    var dvCalculado = 11 - (sum % 11);
    dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();
    return dv === dvCalculado;
  }, "El RUT no es válido (escriba sin puntos y con guión)");

  if(document.getElementById('rut')){
    document.getElementById('rut').addEventListener('keyup', function(e) {
      e.target.value = e.target.value.toUpperCase();
    });
  }
  
  
  //---CORREO ELECTRONICO
  $.validator.addMethod("emailCompleto", function(value, element) {
    // Expresión regular para validar correo electrónico
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;
    // Validar correo electrónico con la expresión regular
    return regex.test(value);
  }, 'Ingrese un correo válido');
  
  $.validator.addMethod("soloLetras", function(value, element) {
    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
  }, "Sólo se permiten letras y espacios en blanco.");
  
  //validacion de categorias
  $.validator.addMethod("categoriaSeleccionada", function(value, element) {
    return value != null && value != "";
  }, "Seleccione una categoría");
  
  // Agregar regla de validación para los radio buttons
  $.validator.addMethod("radioRequired", function(value, element) {
    var $form = $(element).closest("form");
    var name = $(element).attr("name");
    var $radio = $form.find("[name='" + name + "']");
    return $radio.is(":checked");
  }, "Por favor seleccionar una opción");
  

  
  $("#formulario-registro").validate({
    rules: {
      rut: {
        required: true,
        rutChileno: true,
      },
      nombres: {
        required: true,
        minlength: 3,
        soloLetras: true,
      },
      apellidos: {
        required: true,
        minlength: 3,
        soloLetras: true,
      },
      correo: {
        required: true,
        emailCompleto: true,
      },
      direccion: {
        required: true,
        minlength: 8,
      },
      password: {
        required: true,
        minlength: 5,
        maxlength: 15,
      },
      password2: {
        required: true,
        minlength: 5,
        maxlength: 15,
        equalTo: "#password",
      },
    }, // --> FIN DE REGLAS
    messages: {
      rut: {
        required: "El rut es un campo obligatorio",
        rutChileno: "El formato del rut no es válido",
      },
      nombres: {
        required: "El nombre es un campo obligatorio",
        minlength: "Mínimo 3 caracteres",
        soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
      },
      apellidos: { 
        required: "El apellido es un campo obligatorio",
        minlength: "Mínimo 3 caracteres",
        soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
      },
      correo: {
        required: "El email es un campo requerido",
        email: "El email no cumple el formato de un correo",
      },
      direccion: {
        required: "La dirección es un campo obligatorio",
        minlength: "Mínimo 8 caracteres",
      },
      password: {
        required: "La contraseña es un campo requerido",
        minlength: "La contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
      },
      password2: {
        required: "Repetir contraseña es un campo requerido",
        minlength: "Repetir contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "Repetir contraseña debe tener un máximo de 15 caracteres",
        equalTo: "Debe repetir la contraseña escrita anteriormente",
      },
    },
  });
  
  $("#formulario-usuario").validate({
    rules: {
      identificador: {
        required: true,
        soloNumeros: true,
      },
      rol: {
        required: true,
        radioRequired: true,
      },
      rut: {
        required: true,
        rutChileno: true,
      },
      nombres: {
        required: true,
        minlength: 3,
        soloLetras: true,
      },
      apellidos: {
        required: true,
        minlength: 3,
        soloLetras: true
      },
      correo: {
        required: true,
        emailCompleto: true,
      },
      direccion: {
        required: true,
        minlength: 8,
      },
    },
    messages: {
      identificador: {
        required: "El campo ID es obligatorio",
        soloNumeros: "El campo solo puede tener numeros",
      },
      rol: {
        required: "Por favor, seleccione una opción",
      },
      rut: {
        required: "El rut es un campo obligatorio",
        rutChileno: "El formato del rut no es válido",
      },
      nombres: {
        required: "El nombre es un campo obligatorio",
        minlength: "Mínimo 3 caracteres",
        soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
      },
      apellidos: { 
        required: "El apellido es un campo obligatorio",
        minlength: "Mínimo 3 caracteres",
        soloLetras: "El apellido sólo puede contener letras y espacios en blanco",
      },
      correo: {
        required: "El email es un campo requerido",
        email: "El email no cumple el formato de un correo",
      },
      direccion: {
        required: "La dirección es un campo obligatorio",
        minlength: "Mínimo 8 caracteres",
      },
    },
  });
  $("#formulario-ingreso").validate({
    rules: {
      cuenta: {
        required: true,
        emailCompleto: true,
      },
      password: {
        required: true,
        minlength: 5,
        maxlength: 15,
      },
    },
    messages: {
      cuenta: {
        required: "El email es un campo obligactorio",
        email: "El email no cumple el formato de un correo",
      },
      password: {
        required: "La contraseña es un campo requerido",
        minlength: "La contraseña debe tener un mínimo de 5 caracteres",
        maxlength: "La contraseña debe tener un máximo de 15 caracteres",
      },
    },
  });

  $("#formulario-producto").validate({
    rules: {
      id_producto: {
        required: true,
        min:1,
        number:true,
      },
      categoria: {
        required: true,
        categoriaSeleccionada: true,
      },
      nombre_producto: {
        required: true,
        minlength: 2,
      },
      descripcion_producto: {
        required: true,
        minlength: 4,
      },
      precio_producto: {
        required: true,
        min:0,
        number:true,
      },
      descu_producto: {
        required: true,
        min: 0,
        max: 100,
        number:true,
      },
      descu_oferta: {
        required: true,
        min: 0,
        max: 100,
        number:true,
      },
    },
    messages: {
      id_producto: {
        required: "El campo ID es obligatorio",
      },
      categoria: {
        required: "El campo categoría es obligatorio",
        categoriaSeleccionada: "Se debe seleccionar una categoría",
      }, 
      nombre_producto: {
        required: "El nombre es un campo obligatorio",
        minlength: "Mínimo 2 caracteres",
      },
      descripcion_producto: {
        required: "La descripción es un campo obligatorio",
        minlength: "Minimo 4 carateres",
      },
      precio_producto: {
        required: "El precio del producto es un campo obligatorio",
        min: "Minimo 1 caracteres",
        number:"El campo solo acepta numeros",
      }, 
      descu_producto:{
        required: "El descuento del producto es un campo obligatorio",
        min: "Minimo 1 caracteres",
        max: "Maximo numero 100",
        number:"El campo solo acepta numeros",
      },
      descu_oferta: {
        required: "El descuento por oferta es un campo obligatorio",
        min: "Minimo 1 numero",
        max: "Maximo numero 100",
        number:"El campo solo acepta numeros",
      },
    },
  });
  
  $("#formulario-bodega").validate({
    rules:{
      categoria: {
        required: true,
        categoriaSeleccionada: true,
      },
      juego: {
        required: true,
        categoriaSeleccionada: true,
      },
      cantidad:{
        required: true,
        min: 1,
        number:true,
      },
    },
    messages:{
      categoria: {
        required: "El campo categoría es obligatorio",
        categoriaSeleccionada: "Se debe seleccionar una categoría",
      }, 
      juego: {
        required: "El campo nombre es obligatorio",
        categoriaSeleccionada: "Se debe seleccionar un nombre",
      }, 
      cantidad:{
        required: "La cantidad es un campo obligatorio",
        min: "minimo 1 caracter",
        number: "Solo se puede ingresar numeros",
      },
    },
  });

});