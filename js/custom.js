//only activate when document has been loaded
$(() => {

  //make dropdown display block and slide down
  $("#dropdown-wrapper").click((event)=>{

    $("#right-nav-wrapper").slideToggle();

  })
});