$(document).ready(function () {
  $("#search-form").submit(function (event) {
    event.preventDefault();

    var query = $("#search-input").val().trim();

    if (query) {
      var resultHTML = "<strong>Resultados para:</strong> " + query;
      $("#search-result").html(resultHTML).fadeIn(1000);
    } else {
      $("#search-result")
        .html("<strong>Nenhum termo de pesquisa inserido.</strong>")
        .fadeIn(1000);
    }
  });
});
