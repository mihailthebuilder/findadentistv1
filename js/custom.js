//only activate when document has been loaded
$(() => {

  //make dropdown display block and slide down
  $("#dropdown-wrapper").click(()=>{

    $("#right-nav-wrapper").slideToggle();
    $("#dropdown-wrapper>img").toggleClass("flip");
 
  })

  //validate postcode input when Start button clicked
  $("#hero-section button").click(()=>{

    let postcode = $("#hero-section input").val().toUpperCase();

    let postcodeCheck = /^[A-Z]{1,2}\d{1,2}\s?\d{1,2}[A-Z]{1,2}$/.test(postcode);
    
    if (!postcodeCheck) {

      //insert tooltip saying that format is incorrect
      $("#hero-section p").css("opacity",100);

    } else {

      //ensure validation tooltip is hidden
      $("#hero-section p").css("opacity",0);

      //initialize dentist dataset
      let dentistDataset = [];

      Papa.parse("data.csv", {
          download: true,
          header: true,

          step: function(row) {
            if (row.data["name"] != undefined) {
              dentistDataset.push(row.data);
            }
          },

          //go down and do the comparison
          complete: ()=>{loadTable(postcode.replace(/\s/g,''),dentistDataset)}
      });


    }

  })

});

//load table with data and jQuery listeners

function loadTable(inputPostcode,dentistArr) {

  //create copy of DENTISTS where you can add distance and sort
  console.log(inputPostcode,dentistArr);
  
  console.log(dentistArr[2]);

}