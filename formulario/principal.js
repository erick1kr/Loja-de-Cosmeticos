$(document).ready(function () {
  $("#search-form").submit(function (event) {
    event.preventDefault(); // Impede o envio do formulário e a recarga da página

    // Obtém o termo de pesquisa do campo de entrada
    var query = $("#search-input").val().trim();

    // Simula uma pesquisa (substitua com sua lógica real)
    if (query) {
      var resultHTML = "<strong>Resultados para:</strong> " + query;
      $("#search-result").html(resultHTML).fadeIn(1000);
    } else {
      // Caso o campo de pesquisa esteja vazio, exibe uma mensagem de erro
      $("#search-result")
        .html("<strong>Nenhum termo de pesquisa inserido.</strong>")
        .fadeIn(1000);
    }
  });
});
