class Dentist {
  constructor(obj) {
    this.name = obj["name"];
    this.postcode = obj["postcode"];
    this.price_filling = parseInt(obj["price_filling"]);
    this.price_crown = parseInt(obj["price_crown"]);
    this.price_root = parseInt(obj["price_root"]);
  }
};


//only activate when document has been loaded
$(() => {

  //make dropdown display block and slide down
  $("#dropdown-wrapper").click(()=>{

    $("#right-nav-wrapper").slideToggle();
    $("#dropdown-wrapper>img").toggleClass("flip");
 
  });

  let dentistFileData = [];

  //load dataset; once loaded, activate all table functionalities
  Papa.parse("data.csv", {
    download: true,
    header: true,

    step: function(row) {
      
      //add file row into dentist dataset
      //the last row shows as "undefined" so needs to be avoided
      if (row.data["name"] != undefined) {
        
        dentistFileData.push(row.data);
      }
    },

    //go down and activate the table
    complete: ()=>{tableActivate(dentistFileData)}
  });

});


function tableActivate(dentistFileData) {

  //trigger when start comparison button clicked
  $("#hero-section button").click(()=>{

    hideTable(()=>{
      let postcode = $("#hero-section input").val().toUpperCase();

      //validate whether postcode is in correct format
      let postcodeCheck = /^[A-Z]{1,2}\d{1,2}\s?\d{1,2}[A-Z]{1,2}$/.test(postcode);
      
      //if postcode incorrect, trigger corresponding event
      if (!postcodeCheck) {
        //insert tooltip saying that format is incorrect
        $("#hero-section p").css("opacity",100);

        //show table placeholder
        $("#table-placeholder").fadeIn();  

      //if postcode correct...
      } else {

        //scroll to the table section
        $([document.documentElement, document.body]).animate({
          scrollTop: $("#table-section").offset().top
        }, 1000);

        //ensure that the validation postcode elem is hidden  
        $("#hero-section p").css("opacity",0);

        /*add distance to dentist dataset and declare it as a constant to avoid interference as now the dataset has been formally initialised*/
        const dentistDataset = dentistFileData.map((obj)=> {
          let dist = Math.floor(Math.random()*50).toString();
          return {...obj,"distance":dist};
        });

        //load table header & show
        loadTableHeader(dentistDataset);

        //load table content & show
        loadTableContent(dentistDataset,"distance"); 
      }
    })   
  })
}

function loadTableHeader() {
  
}

//load table with data and jQuery listeners

function loadTableContent(dentistArr,key,desc=false) {

  //sort dentist table & populate rows

  $("#table-placeholder").fadeOut("slow",()=>{
    $(".table-row").fadeIn()
  });
  
}

function hideTable(callback) {
  $(".table-row").fadeOut("slow",callback);
};



/*
function sortDentists(arr,key,desc = false) {
  
  let order = 1;
  if (desc) {
    order = -1;
  }

  arr.sort((a,b)=>{return (a[key]-b[key])*order});
}*/