document.addEventListener("DOMContentLoaded", function () {
    document.body.style.zoom = "50%";
});

function clearForm() {
    let inputs = document.querySelectorAll("form input, form select");

    inputs.forEach(input => {
        if (!input.disabled) {
            input.value = "";
        }
    });
    
    window.location.href = "index.html";
}

function exibirMensagemErro(inputElement, message, isValid) {
    const errorMessageElement = inputElement.nextElementSibling;

    if (isValid) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
        errorMessageElement.style.display = 'none';
    } else {
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        errorMessageElement.style.display = 'block';
        errorMessageElement.textContent = message;
    }
}

function validarNomeUsuario(nome) {
    const regex = /^[a-zA-Zá-úÁ-Ú\s'-]+$/;
    return nome.length >= 8 && regex.test(nome);
  }
  
  const inputNomeUsuario = document.getElementById('user');
  
  inputNomeUsuario.addEventListener('input', () => {
    const nome = inputNomeUsuario.value;
  
    if (validarNomeUsuario(nome)) {
      inputNomeUsuario.classList.remove('invalid');
      inputNomeUsuario.classList.add('valid');
      exibirMensagemErro(inputNomeUsuario, '', true); 
    } else {
      inputNomeUsuario.classList.remove('valid');
      inputNomeUsuario.classList.add('invalid');
      exibirMensagemErro(inputNomeUsuario, 'Deve ter no minimo 8 caracteres', false);
    }
  });

  function validarSenha(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return senha.length >= 8 && regex.test(senha);
  }
  
  const inputSenha = document.getElementById('senha');
  
  inputSenha.addEventListener('input', () => {
    const senha = inputSenha.value;
  
    if (validarSenha(senha)) {
      inputSenha.classList.remove('invalid');
      inputSenha.classList.add('valid');
      exibirMensagemErro(inputSenha, '', true); 
    } else {
      inputSenha.classList.remove('valid');
      inputSenha.classList.add('invalid');
      exibirMensagemErro(inputSenha, 'Deve conter uma letra maiúscula e minúscula, um número, 8 caracteres e um especial', false);
    }
  });

  window.onload = function() {
    const usuario = localStorage.getItem('usuario');
    const senha = localStorage.getItem('senha');

    if (usuario)
      document.getElementById('user').value = usuario;

    if (senha)
      document.getElementById('senha').value = senha;
  }

function checkLogin() {
    let user = document.getElementById("user");
    let senha = document.getElementById("senha");

    if (!user.value.trim() || !senha.value.trim()) {
        alert("Antes de prosseguir precisamos que você preencha todos os campos como solicitado.");
        return;
    } else {
        alert("Parabéns você acaba de acessar a sua conta!");
    }
}

