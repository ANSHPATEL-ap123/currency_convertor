const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"    //intial api link for all the currencies
const fromcurr=document.querySelector(".from select");    //from currency
const tocurr=document.querySelector(".to select");        // to currency
const dropdowns=document.querySelectorAll(".dropdown select");     //selecting the two dropdowns options->to and from
// console.log(code,countryList[code]);    //printing the currencycode of the countries and he repective country code in codes.js file

// Adding all the country codes as options in the two dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {                       //in codes.js
    let newOption = document.createElement("option"); 
    newOption.innerText = currCode;
    newOption.value = currCode;

    // Set default selected values (USD for FROM, INR for TO)
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);    //adding the new option in the dropdown list
  }
  //adding an eventlistener for changing the flag acc to the change in the select options
  select.addEventListener("change",(e)=>{
    updateflag(e.target);
  })
}

const updateflag=(element)=>{
    let currcode=element.value; //extracting the currency code of the selected country option
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;       //using f-strings concept we passed the value  of selected countrycode into the flag link
    let image=element.parentElement.querySelector("img");       //img tag was the parent of the select(element tag)
    image.src=newsrc;
}

let get_button=document.querySelector("button");
let rate=document.querySelector(".msg");
//now we need to make a mechanism that on clicking the get_button the content of rate div is changed acc to the acutal api data

get_button.addEventListener("click",async (evt)=>{
  evt.preventDefault();    //for preventing the default submitting and refreshing of the form and changing of url
  let amount=document.querySelector("input");    //this gives html code of the input
  let amount_value=amount.value;                 // this gives the actual value inputted
  if(amount_value<0 || amount_value===''){ 
    amount_value=1;
    amount.value="1";
  }
  const url=`${BASE_URL}/${fromcurr.value.toLowerCase()}.min.json`;
  let response=await fetch(url);
  console.log(response);
  let data=await response.json();   // getting json->js object
  console.log("data->\n",data);
  let r=data[fromcurr.value.toLowerCase()];    //this gives us the whole list of the currency-value pairs
  let reqd_r=r[tocurr.value.toLowerCase()];    //now we retrieve the final rate of the reqd country(tocurr)
  console.log("r->\n",r);
  console.log("final rate of reqd currency=",reqd_r);
  let final_converted_amount=amount_value*reqd_r;  //calculating the final converted price(rate*amt)
  console.log(final_converted_amount);
  rate.innerText=`${amount_value}${fromcurr.value} = ${final_converted_amount}${tocurr.value}`;  //changing the content in the output box
})