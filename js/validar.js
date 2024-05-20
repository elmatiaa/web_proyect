$(document).ready(function() {
  // -- VERIFICACION RUT
  $.validator.addMethod("rutChileno", function(value, element) {
    // Eliminar puntos y guión del RUT
    value = value.replace(/[.-]/g, "");
    // Validar que el RUT tenga 8 o 9 dígitos
    if (value.length < 8 || value.length > 9) {
      return false;
    }
    // Validar que el último dígito sea un número o una 'K'
    var validChars = "0123456789K";
    var lastChar = value.charAt(value.length - 1).toUpperCase();
    if (validChars.indexOf(lastChar) == -1) {
      return false;
    }
    // Calcular el dígito verificador
    var rut = parseInt(value.slice(0, -1), 10);
    var factor = 2;
    var sum = 0;
    var digit;
    while (rut > 0) {
      digit = rut % 10;
      sum += digit * factor;
      rut = Math.floor(rut / 10);
      factor = factor === 7 ? 2 : factor + 1;
    }
    var dv = 11 - (sum % 11);
    dv = dv === 11 ? "0" : dv === 10 ? "K" : dv.toString();
    // Validar que el dígito verificador sea correcto
    return dv === lastChar;
  }, "Por favor ingrese un RUT válido."); 

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


  $.validator.addMethod("soloNumeros", function(value, element) {
    return this.optional(element) || /^[0-9]+$/.test(value);
  }, "Por favor ingrese solo números.");

//validacion de combobox
  $.validator.addMethod("categoriaSeleccionada", function(value, element) {
    return value != null && value != "";
  }, "Seleccione una categoría");
  
// Agregar regla de validación para los radio buttons
  $.validator.addMethod("radioRequired", function(value, element) {
    var $form = $(element).closest("form");
    var name = $(element).attr("name");
    var $radio = $form.find("[name='" + name + "']");
    return $radio.is(":checked");
  }, "Please select one option");


  // $.validator.addMethod("validateCategory", function(value, element) {
  //   return value !== 'Seleccione categoria';
  // });

  // // Agregar reglas de validación personalizadas para el nombre
  // $.validator.addMethod("validateName", function(value, element) {
  //   return value !== 'Seleccione Nombre';
  // });

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
      },
      password2: {
        required: true,
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
        required: "El apellidos es un campo obligatorio",
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
        required: "La contraseña es una campo obligatorio",
        minlength: "Mínimo 5 caracteres",
      },
      password2: {
        required: "Repita la contraseña anterior",
        equalTo: "Debe ser igual al campo contraseña",
      },
    },
  });

  
  $("#formulario-ingreso").validate({
    rules: {
      cuenta: {
        required: true,
        emailCompleto: true,
      },
      contrasena: {
        required: true,
        minlength: 5,
      }
    },
    messages: {
      cuenta: {
        required: "El email es un campo obligactorio",
        email: "El email no cumple el formato de un correo",
      },
      contrasena: {
        required: "La contraseña es una campo obligatorio",
        minlength: "Contraseña no válida"
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
      password: {
        required: true,
        minlength: 5,
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
        required: "Apellidos es un campo obligatorio",
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
        required: "La contraseña es una campo obligatorio",
        minlength: "Mínimo 5 caracteres",
      },
    },
  });

  $("#formulario-producto").validate({
    rules: {
      id_producto: {
        required: true,
        minlength: 1,
        soloNumeros: true,
      },
      validationDefault04: {
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
       minlength: 4,
       soloNumeros: true,
      },
      descu_producto: {
        required: true,
        minlength: 1,
        soloNumeros: true,
      },
      descu_oferta: {
        required: true,
        minlength: 1,
        soloNumeros: true,
      },
    },
    messages: {
      id_producto: {
        required: "El campo ID es obligatorio",
        soloNumeros: "El campo solo puede tener numeros",
      },
      validationDefault04: {
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
        minlength: "minimo 4 caracteres",
        soloNumeros: "El campo solo puede tener numeros",
      }, 
      descu_producto:{
        required: "El descuento del producto es un campo obligatorio",
        minlength: "minimo 1 caracteres",
        soloNumeros: "El campo solo puede tener numeros",
      },
      descu_oferta: {
        required: "El descuento por oferta es un campo obligatorio",
        minlength: "minimo 1 caractere",
        soloNumeros: "El campo solo puede tener numeros",
      },
    },
  });

  $("#formulario-bodega").validate({
    rules:{
      cantidad:{
        required: true,
        minlength: 1,
        soloNumeros: true,
      },
      categbodega: {
        required: true,
        validateCategory: true,
      },
      nombrebodega: {
        required: true,
        validateName: true,
      },
    },
    messages:{
      cantidad:{
        required: "La cantidad es un campo obligatorio",
        minlength: "minimo 1 caracter",
        soloNumeros: "El campo solo puede tener numeros",
      },
    categbodega: {
      required: "Por favor seleccione una categoría."
    },
    nombrebodega: {
      required: "Por favor seleccione un nombre."
    },
  },
});

});