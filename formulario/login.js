$(document).ready(function () {
  $("#login-form").on("submit", function (event) {
    // Evitando o envio do formulário e a recarga da página
    event.preventDefault();

    // Obtendo os dados do formulário
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    console.log("Login form data:", { email, password });

    // Verificando os dados via AJAX com o servidor JSON
    $.ajax({
      url: "http://localhost:3000/userData",
      type: "GET",
      success: function (response) {
        console.log("Server response:", response);
        const user = response.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          // Login bem-sucedido
          $("#message")
            .hide()
            .html(
              '<div class="alert alert-success">Login realizado com sucesso!</div>'
            )
            .fadeIn(1000);

          // Redirecionando para a página principal após 2 segundos
          setTimeout(function () {
            window.location.href = "principal.html";
          }, 2000);
        } else {
          // Credenciais inválidas
          $("#message")
            .hide()
            .html(
              '<div class="alert alert-danger">E-mail ou senha incorretos.</div>'
            )
            .fadeIn(1000);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Server error:", textStatus, errorThrown);
        // Exibindo mensagem de erro
        $("#message")
          .hide()
          .html(
            '<div class="alert alert-danger">Erro ao enviar os dados. Por favor, tente novamente.</div>'
          )
          .fadeIn(1000);
      },
    });
  });
});
