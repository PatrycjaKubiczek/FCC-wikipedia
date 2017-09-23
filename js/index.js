$(document).ready(function() {
 
  function checkingInputText() {
    var searchFor = $("#searchFor").val();
    if (searchFor.length > 0) {
      $(".caption-input").remove();
      getSearchResults(searchFor);
    } else {
      var captionInput = $(".searchbox").append(
        "<p class='caption-input' style='color: #822020;'>please type something, e.g. llama</p>"
      );
      $("input[type=text]").keypress(function() {
        // console.log("typi")
      //   if (e.which !== 13) {
      //     $(".caption-input").remove();
      //   };
      });
    }
  }
  function getSearchResults(vTitle) {
    var url = "";
    url += "https://en.wikipedia.org/w/api.php?";
    url += "action=query";
    url += "&gsrlimit=10";
    url += "&prop=extracts";
    url += "&exintro";
    url += "&explaintext";
    url += "&exsentences=2";
    url += "&exlimit=max";
    url += "&generator=search";
    url += "&gsrsearch=" + vTitle;
    url += "&format=json";
    url += "&callback=?";

    $.getJSON(url, function(data) {
      var myHTML = "";
      $.each(data.query.pages, function(i, item) {
        myHTML += "<div class='result'>";
        myHTML +=
          "<h3 class='result-title'><a class='result-link'" + createLink(item.pageid) + ">" + item.title + "</a></h3>";
        myHTML += "<p class='result-details'>" + item.extract + "</p>";
        myHTML += "</div>";
      });
      $("#theResults").html(myHTML);
    });

    function createLink(pageId) {
      return "href='https://en.wikipedia.org/?curid=" + pageId + "'";
    }
  }

  function clearingResults() {
    $("#searchFor").val("");
    $("#theResults").html("");
  }
    
  $("#clear").click(function() {
    clearingResults();
  });
  
  $("#search").click(function() {
    checkingInputText();
  });
  
  $("input[type=text]").on("keydown", function(e) {
    if (e.which == 13) { //hit enter
      console.log("enter");
      checkingInputText();
    }
    if (e.which == 27) { //hit escape
      console.log("esc");
      $(this).val("");
      clearingResults();
    }
  });
});