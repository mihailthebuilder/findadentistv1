class Dentist {
  constructor(obj) {
    this.name = obj["name"];
    this.postcode = obj["postcode"];
    this.price_filling = parseInt(obj["price_filling"]);
    this.price_crown = parseInt(obj["price_crown"]);
    this.price_root = parseInt(obj["price_root"]);

    //distance generated randomly
    this.distance = Math.floor(Math.random()*100);
  }
};


//only activate when document has been loaded
$(() => {

  //make dropdown display block and slide down
  $("#dropdown-wrapper").click(()=>{

    $("#right-nav-wrapper").slideToggle();
    $("#dropdown-wrapper>img").toggleClass("flip");
 
  })

  //trigger when start comparison button clicked
  $("#hero-section button").click(()=>{

    let postcode = $("#hero-section input").val().toUpperCase();

    //validate whether postcode is in correct format
    let postcodeCheck = /^[A-Z]{1,2}\d{1,2}\s?\d{1,2}[A-Z]{1,2}$/.test(postcode);
    
    if (!postcodeCheck) {
      
      incorrectPostcode();

    } else {

      //if correct postcode...
      //ensure validation tooltip is hidden
      $("#hero-section p").css("opacity",0);

      //initialize dentist dataset
      let dentistDataset = [];

      //parse csv file that holds the dataset
      Papa.parse("data.csv", {
          download: true,
          header: true,

          step: function(row) {
            
            //add file row into dentist dataset
            //the last row shows as "undefined" so needs to be avoided
            if (row.data["name"] != undefined) {
              
              let newDentist = new Dentist(row.data);
              dentistDataset.push(newDentist);
            }
          },

          //go down and do the comparison
          complete: ()=>{loadTable(postcode.replace(/\s/g,''),dentistDataset)}
      });
    }
  })
});

function incorrectPostcode() {
  //insert tooltip saying that format is incorrect
  $("#hero-section p").css("opacity",100);
}

function sortDentists(arr,key,desc = false) {
  
  let order = 1;
  if (desc) {
    order = -1;
  }

  arr.sort((a,b)=>{return (a[key]-b[key])*order});
}

//load table with data and jQuery listeners

function loadTable(inputPostcode,dentistArr) {

  sortDentists(dentistArr,"distance");
  console.log(dentistArr);
  
}