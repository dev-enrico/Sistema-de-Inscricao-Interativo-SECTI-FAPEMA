document.addEventListener("DOMContentLoaded", function () {
    document.body.style.zoom = "50%";
});

document.getElementById("dateInput").addEventListener("input", function (event) {
    let value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    let errorMessage = document.getElementById("errorMessage");

    // Apply dd/mm/yyyy format while typing
    if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2);
    }
    if (value.length >= 5) {
        value = value.substring(0, 5) + "/" + value.substring(5, 9);
    }

    event.target.value = value;

    // Validate when input is complete (10 characters)
    if (value.length === 10) {
        let [day, month, year] = value.split("/").map(Number);
        let inputDate = new Date(year, month - 1, day);
        let today = new Date();
        let minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 16); // Minimum age of 16 years

        // Check if date is valid
        let isValidDate =
            inputDate.getFullYear() === year &&
            inputDate.getMonth() === month - 1 &&
            inputDate.getDate() === day;

        // Check if user is at least 16 years old
        let isOldEnough = inputDate <= minDate;

        if (!isValidDate || !isOldEnough) {
            errorMessage.style.display = "block";
            event.target.value = ""; // Clear input if invalid
        } else {
            errorMessage.style.display = "none";
        }
    }
});

function exibirMensagemErro(inputElement, message, isValid) {
    const errorMessageElement = inputElement.nextElementSibling;

    if (isValid) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
        errorMessageElement.style.display = 'none'; // Esconde a mensagem de erro se for válido
    } else {
        inputElement.classList.remove('valid');
        inputElement.classList.add('invalid');
        errorMessageElement.style.display = 'block'; // Exibe a mensagem de erro
        errorMessageElement.textContent = message; // Atualiza a mensagem de erro
    }
}

function validarNome(nome) {
  const regex = /^[a-zA-Zá-úÁ-Ú\s'-]+$/;
  return nome.length >= 8 && regex.test(nome);
}

const inputNome = document.getElementById('username');

inputNome.addEventListener('input', () => {
  const nome = inputNome.value;

  if (validarNome(nome)) {
      inputNome.classList.remove('invalid');
      inputNome.classList.add('valid');
      exibirMensagemErro(inputNome, '', true); 
  } else {
      inputNome.classList.remove('valid');
      inputNome.classList.add('invalid');
      exibirMensagemErro(inputNome, 'Por favor insira o nome completo', false);
  }
});

function validarDataNascimento(data) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; // Formato DD/MM/AAAA
    if (!regex.test(data)) {
        return false;
    }

    // Extraindo o dia, mês e ano da data
    const [dia, mes, ano] = data.split('/').map(Number);
    const dataNasc = new Date(ano, mes - 1, dia);

    // Verificando se a data é válida
    if (dataNasc.getDate() !== dia || dataNasc.getMonth() !== mes - 1 || dataNasc.getFullYear() !== ano) {
        return false; // A data é inválida
    }

    // Verificando se a data de nascimento não é no futuro
    const dataAtual = new Date();
    if (dataNasc > dataAtual) {
        return false; // A data de nascimento é no futuro
    }

    return true;
}

// Função para verificar se a pessoa tem 16 anos ou mais
function verificarIdade(dataNascimento) {
    const [dia, mes, ano] = dataNascimento.split('/').map(Number);
    const dataNasc = new Date(ano, mes - 1, dia); // Cria um objeto de data com a data de nascimento

    const dataAtual = new Date(); // Data atual
    const idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    const mesAtual = dataAtual.getMonth();
    const diaAtual = dataAtual.getDate();

    // Verifica se a pessoa já fez 16 anos este ano
    if (mesAtual < dataNasc.getMonth() || (mesAtual === dataNasc.getMonth() && diaAtual < dataNasc.getDate())) {
        return idade - 1; // Se não fez aniversário ainda este ano, subtrai 1
    }
    return idade;
}

// Obtendo o input de data de nascimento
const inputDataNascimento = document.getElementById('dateInput');

// Validando data de nascimento ao digitar
inputDataNascimento.addEventListener('input', () => {
    const dataNascimento = inputDataNascimento.value;

    if (validarDataNascimento(dataNascimento)) {
        const idade = verificarIdade(dataNascimento);

        if (idade >= 16) {
            inputDataNascimento.classList.remove('invalid');
            inputDataNascimento.classList.add('valid');
            exibirMensagemErro(inputDataNascimento, '', true);
        } else {
            inputDataNascimento.classList.remove('valid');
            inputDataNascimento.classList.add('invalid');
            exibirMensagemErro(inputDataNascimento, 'Data inválida ou idade inferior a 16 anos', false);
        }
    } else {
        inputDataNascimento.classList.remove('valid');
        inputDataNascimento.classList.add('invalid');
        exibirMensagemErro(inputDataNascimento, 'Data inválida ou idade inferior a 16 anos', false);
    }
});

function validarCPF(cpf) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
  }

  const inputCPF = document.getElementById('cpf');

  inputCPF.addEventListener('input', () => {
    const cpf = inputCPF.value;

    if (validarCPF(cpf)) {
      inputCPF.classList.remove('invalid');
      inputCPF.classList.add('valid');
      exibirMensagemErro(inputCPF, '', true);
    } else {
      inputCPF.classList.remove('valid');
      inputCPF.classList.add('invalid');
      exibirMensagemErro(inputCPF, 'CPF inválido', false);
    }
  });

  function validarEmail(email) {
   
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

const inputEmail = document.getElementById('email');

inputEmail.addEventListener('input', () => {
    const email = inputEmail.value;

    if (validarEmail(email)) {
        inputEmail.classList.remove('invalid');
        inputEmail.classList.add('valid');
        exibirMensagemErro(inputEmail, '', true);
    } else {
        inputEmail.classList.remove('valid');
        inputEmail.classList.add('invalid');
        exibirMensagemErro(inputEmail, 'Por favor, Digite um E-mail válido', false);
    }
});

function validarTelefone(telefone) {
   
    const regex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
    return regex.test(telefone);
  }

  const inputTelefone = document.getElementById('phone');

  inputTelefone.addEventListener('input', () => {
    const telefone = inputTelefone.value;

    if (validarTelefone(telefone)) {
      inputTelefone.classList.remove('invalid');
      inputTelefone.classList.add('valid');
      exibirMensagemErro(inputTelefone, '', true);
    } else {
      inputTelefone.classList.remove('valid');
      inputTelefone.classList.add('invalid');
      exibirMensagemErro(inputTelefone, 'Por favor, insira um número de telefone válido no formato (XX) XXXXX-XXXX', false);
    }
  });

  function validarCEP(cep) {
    const regex = /^\d{5}-\d{3}$/;
    return regex.test(cep);
}

const inputCEP = document.getElementById('cep');

inputCEP.addEventListener('input', function (e) {
    let cep = e.target.value;

    cep = cep.replace(/\D/g, '');

    // Se o CEP tem mais de 5 dígitos, insira o hífen após o 5º dígito
    if (cep.length > 5) {
        cep = cep.substring(0, 5) + '-' + cep.substring(5, 8);
    }

    // Se o comprimento da string de CEP for menor que 10 (sem o hífen), atualiza o campo
    e.target.value = cep;

    // Verificar se o valor é válido
    if (validarCEP(cep)) {
        e.target.classList.remove('invalid');
        e.target.classList.add('valid');
        exibirMensagemErro(inputCEP, '', true);
    } else {
        e.target.classList.remove('valid');
        e.target.classList.add('invalid');
        exibirMensagemErro(inputCEP, 'Digite um CEP válido', false);
    }
});

  function validarNumero(numero) {

    const regex = /^-?\d+(\.\d+)?$/;
    return regex.test(numero);
  }

  const inputNumero = document.getElementById('houseNumber');

  inputNumero.addEventListener('input', () => {
    const numero = inputNumero.value;

    if (validarNumero(numero)) {
      inputNumero.classList.remove('invalid');
      inputNumero.classList.add('valid');
      exibirMensagemErro(inputNumero, '', true);
    } else {
      inputNumero.classList.remove('valid');
      inputNumero.classList.add('invalid');
      exibirMensagemErro(inputNumero, 'Digite apenas números', false);
    }
  });

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
    const usuarioSalvo = localStorage.getItem('usuario');
    const senhaSalva = localStorage.getItem('senha');

    if (usuarioSalvo) {
      document.getElementById('user').value = usuarioSalvo;
    }

    if (senhaSalva) {
      document.getElementById('senha').value = senhaSalva;
    }
  }

  function salvarLogin() {
    const usuario = document.getElementById('user').value;
    const senha = document.getElementById('senha').value;

    localStorage.setItem('usuario', usuario);
    localStorage.setItem('senha', senha);
  }

  function excluirLogin() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('senha');

    document.getElementById('user').value = '';
    document.getElementById('senha').value = '';
  }

function clearForm() {

    let inputs = document.querySelectorAll("form input, form select");

    inputs.forEach(input => {
        if (!input.disabled) {
            if (input.type === "file") {
                input.value = "";
                let span = input.previousElementSibling.querySelector("span");
                if (span) span.textContent = "Clique aqui para selecionar o arquivo";
            } else if (input.type === "checkbox" || input.type === "radio") {
                input.checked = false;
            } else {
                input.value = "";
            }
        }
    });

    let select = document.getElementById("sex");
    if (select) select.selectedIndex = 0;

    window.location.href = "index.html";
}

function checkForm() {
    let name = document.getElementById("username");
    let date = document.getElementById("date");
    let cpf = document.getElementById("cpf");
    let sex = document.getElementById("sex");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let cep = document.getElementById("cep");
    let street = document.getElementById("street");
    let city = document.getElementById("city");
    let houseNumber = document.getElementById("houseNumber");
    let state = document.getElementById("state");
    let user = document.getElementById("user");
    let senha = document.getElementById("senha");

    if (!name.value.trim() || !cpf.value.trim() || !sex.value.trim() || !email.value.trim() || !phone.value.trim()|| !cep.value.trim() || !street.value.trim() || !city.value.trim()|| !houseNumber.value.trim() || !state.value.trim() || !user.value.trim() || !senha.value.trim()) {
        alert("Antes de prosseguir precisamos que você preencha todos os campos como solicitado.");
        return;
    } else {
        let agreeIsChecked = document.getElementById("agreeCheckBox");
    
        if (!agreeIsChecked.checked) {
            alert("Precisamos que concorde com os termos e condições para finalizarmos sua finalizarmos sua inscrição corretamente.");
            return;
        } else {
            alert("Inscrição realizada com sucesso!");
            alert("Um email foi enviado para realizar a verificação da conta, verifique a conta pelo link do email recebido e depois clique no ok para seguir.");
            window.location.href = "login.html";
        }
    }
}