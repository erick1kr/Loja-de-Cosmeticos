$(document).ready(function () {
  function getFormData() {
    const name = $("#name").val();
    const email = $("#email").val();
    const password = $("#password").val();

    return { name, email, password };
  }

  $("#user-registration-form").on("submit", function (event) {
    event.preventDefault();

    const formData = getFormData();
    console.log("Form data:", formData);

    const apiKey = "9bdcbe5e7e6150d4592f547cc8ecb173";
    const email = formData.email;

    $.ajax({
      url: `http://apilayer.net/api/check?access_key=${apiKey}&email=${email}&smtp=1&format=1`,
      type: "GET",
      success: function (response) {
        console.log("Mailboxlayer response:", response);
        if (response.format_valid && response.smtp_check) {
          let userData = JSON.parse(localStorage.getItem("userData")) || [];
          userData.push(formData);
          localStorage.setItem("userData", JSON.stringify(userData));

          $.ajax({
            url: "http://localhost:3000/userData",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
              console.log("Server response:", response);

              $("#success-message")
                .hide()
                .html(
                  '<div class="alert alert-success">Dados do usuário foram armazenados com sucesso!</div>'
                )
                .fadeIn(1000);

              setTimeout(function () {
                window.location.href = "login.html";
              }, 2000);
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.error("Server error:", textStatus, errorThrown);

              $("#success-message")
                .hide()
                .html(
                  '<div class="alert alert-danger">Erro ao enviar os dados. Por favor, tente novamente.</div>'
                )
                .fadeIn(1000);
            },
          });
        } else {
          console.error("Invalid email:", response);
          $("#email-error")
            .text("Por favor, insira um endereço de e-mail válido.")
            .show();
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("API error:", textStatus, errorThrown);

        $("#email-error")
          .text("Erro ao verificar o e-mail. Por favor, tente novamente.")
          .show();
      },
    });
  });

  $("#reset-button").on("click", function () {
    $(".form-input").val("");
  });

  $(".form-input").on("input", function () {
    $(this).addClass("was-validated");
  });
});
