- [Find A Dentist](#find-a-dentist)
  - [Overview](#overview)
  - [Highlights](#highlights)
    - [Simulation of dental practices directory](#simulation-of-dental-practices-directory)
      - [Step 1](#step-1)
      - [Step 2](#step-2)
      - [Step 3.a](#step-3a)
      - [Step 3.b](#step-3b)
      - [Step 4](#step-4)
  - [Mobile-friendly table](#mobile-friendly-table)
  - [Mobile nav dropdown](#mobile-nav-dropdown)
  - [Sass @mixin + @include](#sass-mixin--include)

# Find A Dentist

## Overview
A static landing page made to look like a marketplace for dental practices. Built using [Sass](https://sass-lang.com/) and [jQuery](https://jquery.com/). See it live [here](https://mihailthebuilder.github.io/findadentistv1/).

## Highlights

### Simulation of dental practices directory
Input a postcode and you'll be directed to the next section, where the placeholder element is replaced by a list of dental practices.

![listings](./demo/listings.gif)

The table is rendered in a number of steps.

#### Step 1
When the site is loaded, we use the [Papa Parse](https://www.papaparse.com/) library to read the `data.csv` file which contains all the information about the dental practices.

```js
//only activate when document has been loaded
$(() => {

  //initialize the variable that will hold the dentist data
  let dentistFileData = [];

  //use Papa Parse to read the csv file
  Papa.parse("data.csv", {
    download: true,
    header: true,

    /*Go through each row in the csv and add 
    the row data to the dentistFileData variable*/
    step: function(row) {
      
      //avoid empty rows (often the last one in the file)
      if (row.data["name"] != undefined) {
        dentistFileData.push(row.data);
      }
    },

    //go to the next step
    complete: ()=>{tableActivate(dentistFileData)}
  });
});
```

#### Step 2
Add an event listener to the "Start" `button` being clicked. Once it is, hide the tablecheck if the value in the postcode is in the correct format using the following regular expression:

```js
//validate whether postcode is in correct format
let postcodeCheck = /^[A-Z]{1,2}\d{1,2}\s?\d{1,2}[A-Z]{1,2}$/.test(postcode);
```

#### Step 3.a
If the postcode is in the incorrect format, render a tooltip that communicates this information.

![wrong_input](./demo/wrong_input.gif)

#### Step 3.b
If the postcode is in the correct format, calculate the distance between it and the dental practice. In this case, each distance is a randomly-generated number between 0 and 50. However, you can easily substitue with a mapping API call (e.g. Bing Maps) if you want to.
```js
const dentistDataset = dentistFileData.map((obj)=> {
  let dist = Math.floor(Math.random()*50).toString();
  return {...obj,"distance":dist};
});
```

#### Step 4
Sort the dental practices in ascending order, then add them one by one into a table. 
```js
//sort dentist table by distance
let sortedDentists = dentistDataset.map(a=>({...a})).sort((a,b)=>{return (a["distance"]-b["distance"])});

//loop through dentist array to generate each row and add to table
for (let i=0;i<sortedDentists.length;i++) {

  let evenVsOdd = i%2==0? "even" : "odd";

  //generate row container with appropriate classes
  let $row = $("<div>",{class: "table-row " +evenVsOdd});

  //name column data
  let $row_name = $("<div>",{class:"row-name",text:sortedDentists[i]["name"]});
  $row.append($row_name);

  //distance column data
  let $row_distance = $("<div>",{class:"row-distance"});
  $row_distance.append($("<div>",{class:"row-attribute",text:"Distance:"}));
  $row_distance.append($("<div>",{text:sortedDentists[i]["distance"]+ " miles"}));
  $row.append($row_distance);

  //filling price column data
  let $row_filling = $("<div>",{class:"row-filling"});
  $row_filling.append($("<div>",{class:"row-attribute",text:"Filling:"}));
  $row_filling.append($("<div>",{text:"£ " + sortedDentists[i]["price_filling"]}));
  $row.append($row_filling);

  //crown price column data
  let $row_crown = $("<div>",{class:"row-crown"});
  $row_crown.append($("<div>",{class:"row-attribute",text:"Crown:"}));
  $row_crown.append($("<div>",{text:"£ " + sortedDentists[i]["price_crown"]}));
  $row.append($row_crown);

  //root price column data
  let $row_root = $("<div>",{class:"row-root"});
  $row_root.append($("<div>",{class:"row-attribute",text:"Root canal:"}));
  $row_root.append($("<div>",{text:"£ " + sortedDentists[i]["price_root"]}));
  $row.append($row_root);

  //button column
  let $row_button = $("<div>",{class:"row-button"});
  $row_button.append($("<button>",{"type":"button",text:"Book now"}));
  $row.append($row_button);

  //add row to table
  $("#table-wrapper").append($row);
}
```

Finally, render the table using jQuery's `fadeIn` function

## Mobile-friendly table
You'll notice in [step 4 above](#step-4) that labels are added to each of the price data elements:
```js
$row_root.append($("<div>",{class:"row-attribute",text:"Root canal:"}));
```

In desktop mode, the `row-attribute` selector's `display` style is set to none, while in tablet/mobile it is `block`. This helps create the optimal user experience for viewing the table across different devices.

![responsive](./demo/responsive.gif)

## Mobile nav dropdown
![navbar](./demo/navbar.gif)

Easy-peasy with jQuery:

```js
//on click...
$("#dropdown-wrapper").click(()=>{
  //...slide down/up the navbar
  $("#right-nav-wrapper").slideToggle();
  //flip the arrow image
  $("#dropdown-wrapper>img").toggleClass("flip");
});
```

## Sass @mixin + @include
Used for changing the colour of the placeholder text in the postcode input element:
```scss
@mixin placeholder {
  &::-webkit-input-placeholder {@content}
  &:-moz-placeholder           {@content}
  &::-moz-placeholder          {@content}
  &:-ms-input-placeholder      {@content}  
}
input {
  @include placeholder {color: $pacific-blue};
  width: 9.5rem;
  margin-right: 1rem;
  color: $pacific-blue;
}
```