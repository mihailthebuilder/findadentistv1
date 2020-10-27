//only activate when document has been loaded
$(() => {

  //make dropdown display block and slide down
  $("#dropdown-wrapper").click(()=>{

    $("#right-nav-wrapper").slideToggle();
    $("#dropdown-wrapper>img").toggleClass("flip");

  })

  //validate postcode input when Start button clicked
  $("#hero-section button").click(()=>{

    let postcodeCheck = /^[A-Z]{1,2}\d{1,2}\s?\d{1,2}[A-Z]{1,2}$/.test($("#hero-section input").val());
    
    if (!postcodeCheck) {

      //insert tooltip saying that format is incorrect
      $("#hero-section p").css("opacity",100);

    } else {

      $("#hero-section p").css("opacity",0);

      //go down and do the comparison
    }

  })

});