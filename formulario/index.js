$(document).ready(function () {
  // Função para obter os dados do formulário
  function getFormData() {
    const name = $("#name").val();
    const email = $("#email").val();
    const password = $("#password").val();

    return { name, email, password };
  }

  $("#user-registration-form").on("submit", function (event) {
    // Evitando o envio do formulário e a recarga da página
    event.preventDefault();

    // Obtendo os dados do formulário
    const formData = getFormData();
    console.log("Form data:", formData);

    // Validando o e-mail usando a API do Mailboxlayer
    const apiKey = "9bdcbe5e7e6150d4592f547cc8ecb173";
    const email = formData.email;

    $.ajax({
      url: `http://apilayer.net/api/check?access_key=${apiKey}&email=${email}&smtp=1&format=1`,
      type: "GET",
      success: function (response) {
        console.log("Mailboxlayer response:", response);
        if (response.format_valid && response.smtp_check) {
          // Se o e-mail for válido, continuar com o processo de envio de dados

          let userData = JSON.parse(localStorage.getItem("userData")) || [];
          userData.push(formData);
          localStorage.setItem("userData", JSON.stringify(userData));

          // Enviando os dados via AJAX para o servidor JSON
          $.ajax({
            url: "http://localhost:3000/userData",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
              console.log("Server response:", response);
              // Exibindo uma mensagem de sucesso com animação fadeIn
              $("#success-message")
                .hide()
                .html(
                  '<div class="alert alert-success">Dados do usuário foram armazenados com sucesso!</div>'
                )
                .fadeIn(1000);

              // Redirecionando para a página de login após 2 segundos
              setTimeout(function () {
                window.location.href = "login.html";
              }, 2000);
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.error("Server error:", textStatus, errorThrown);
              // Exibindo mensagem de erro
              $("#success-message")
                .hide()
                .html(
                  '<div class="alert alert-danger">Erro ao enviar os dados. Por favor, tente novamente.</div>'
                )
                .fadeIn(1000);
            },
          });
        } else {
          // Se o e-mail não for válido, exibir mensagem de erro
          console.error("Invalid email:", response);
          $("#email-error")
            .text("Por favor, insira um endereço de e-mail válido.")
            .show();
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("API error:", textStatus, errorThrown);
        // Exibindo mensagem de erro
        $("#email-error")
          .text("Erro ao verificar o e-mail. Por favor, tente novamente.")
          .show();
      },
    });
  });

  $("#reset-button").on("click", function () {
    $(".form-input").val("");
  });

  // Adicionando manipuladores de eventos para monitorar a interação do usuário com os campos de entrada
  $(".form-input").on("input", function () {
    $(this).addClass("was-validated");
  });
});
