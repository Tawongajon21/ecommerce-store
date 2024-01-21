import {Paynow} from "paynow"

let paynow = new Paynow(process.env.NEXT_INTEGRATION_ID, process.env.NEXT_INTEGRATION_KEY);



  function createPayment(invoiceNumber:string,items:[],amount:number,resultUrl:string,returnUrl:string) {
    paynow.resultUrl = resultUrl ;

paynow.returnUrl =returnUrl ;
let payment = paynow.createPayment(invoiceNumber);
items.map((item)=>{
  payment.add(item.name,item.price);
})

// Save the response from paynow in a variable
const res=paynow.send(payment);
paynow.send(payment).then(response => {
    // Check if request was successful
    if (response.success) {
      // Get the link to redirect the user to, then use it as you see fit
      let link = response.redirectUrl;
      console.log(response);
    }
  });
 
  
  }

  export default createPayment