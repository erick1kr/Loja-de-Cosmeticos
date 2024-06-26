$(document).ready(function () {
  $("#login-form").on("submit", function (event) {
    event.preventDefault();
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    console.log("Login form data:", { email, password });

    $.ajax({
      url: "http://localhost:3000/userData",
      type: "GET",
      success: function (response) {
        console.log("Server response:", response);
        const user = response.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          $("#message")
            .hide()
            .html(
              '<div class="alert alert-success">Login realizado com sucesso!</div>'
            )
            .fadeIn(1000);

          setTimeout(function () {
            window.location.href = "principal.html";
          }, 2000);
        } else {
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
