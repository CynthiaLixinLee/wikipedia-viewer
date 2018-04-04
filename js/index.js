$(document).ready(function(){
  $("#search").click(searchEvent);
  $("#search-bar").keypress(function(e){
    if (e.which === 13){
      event.preventDefault();
      searchEvent();
    } 
  });
});

function searchEvent(){
  $.ajax({
          url: "https://en.wikipedia.org/w/api.php",
          dataType: "jsonp",
          data: {
            'action': "opensearch",
            'format': "json",
            'search': $("#search-bar").val()
          },
          success: function(data){
            $("#display-results").html(''); // CLear previous results
            output(data);
          },
          error: function(errorMessage){
            alert("Error");
          }
  })
}

function output(data){
  var title = data[1],
      description = data[2],
      link = data[3];
  for (var i = 0; i < title.length; i++) {
    $("#display-results").prepend('<span><a href="' + link[i] + '" target="_blank" id="link">' + title[i] + '</a><p>' + description[i] + '</p></span>');
  }
}