const TABLE_ORDER = [
  {"order": 0,"heading": "Name","obj_key": "name"}
  , {"order": 1,"heading": "Postcode","obj_key": "postcode"}
  , {"order": 2,"heading": "Distance","obj_key": "distance"}
  , {"order": 3,"heading": "Filling","obj_key": "price_filling"}
  , {"order": 4,"heading": "Crown","obj_key": "price_crown"}
  , {"order": 5,"heading": "Root Canal","obj_key": "price_root"}
]


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

        //delete all table data
        $(".table-row").remove();

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

//load table header & show
function loadTableHeader(dentistDataset) {

  //create table header
  let $header = $("<div>",{class:"table-row header"});

  //add each cell to header
  for (let i=0;i<TABLE_ORDER.length;i++) {

    //get corresponding column data attributes
    let dataColumn = TABLE_ORDER.filter(elem => elem["order"]==i)[0];

    //create table header cell html with inner text and 
    //desc-toggle attribute which will decide whether to sort ascending or descending
    let cellText = dataColumn["heading"];
    let $column_header = $(`<span>`,{text:cellText,"desc-toggle":1});
    
    //add click->sort capabilities
    $column_header.click(()=>{
      
      //once cell clicked, it will sort table by corresponding column
      loadTableContent(dentistDataset,dataColumn["obj_key"],$column_header.attr("desc-toggle"));

      //the desc-toggle will be toggled to the opposite
      $column_header.attr("desc-toggle",parseInt($column_header.attr("desc-toggle"))*-1);
    })
    
    //add child to heading row element
    $header.append($column_header);

  }


  $("#table-section").append($header);

}

//load table with data and jQuery listeners

function loadTableContent(dentistDataset,key,order=1) {

  //sort dentist table & populate rows
  console.log(dentistDataset,key,order);

  $("#table-placeholder").fadeOut("slow",()=>{
    $(".table-row").fadeIn()
  });
  
}

//ensures table is hidden
function hideTable(callback) {

  //need to check, otherwise calllback doesn't get activated
  if($(".table-row").length>0) {
    $(".table-row").fadeOut("slow",callback);
  
  } else {callback();};
};



/*
function sortDentists(arr,key,desc = false) {
  
  let order = 1;
  if (desc) {
    order = -1;
  }

  arr.sort((a,b)=>{return (a[key]-b[key])*order});
}*/