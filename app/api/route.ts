import createPayment from "@/lib/paynow";
import {NextResponse,NextRequest} from "next/server";

import {Paynow} from "paynow"
export async function POST(req:Request,res:Response) {

 try {
  const body=await req.json()
  const {items,invoiceNumber}=body;
  let paynow = new Paynow(process.env.NEXT_INTEGRATION_ID, process.env.NEXT_INTEGRATION_KEY);
  let payment = paynow.createPayment(invoiceNumber);


  paynow.resultUrl = "http://example.com/gateways/paynow/update";




  paynow.returnUrl = "http://localhost:3000/cart";
 
    items.map((item)=>{
      payment.add(item.name,item.price);
  })

  var  link ;
  const res=paynow.send(payment);
 let paymentresult=await paynow.send(payment).then(response => {
    // Check if request was successful
    if (response.success) {
      // Get the link to redirect the user to, then use it as you see fit
 link  = response.redirectUrl;
 let pollUrl = response.pollUrl;
 console.log(pollUrl);
 
 return response
    
    }
  });
 let pollUrl=await paynow.send(payment).then(response => {
    // Check if request was successful
    if (response.success) {
      // Get the link to redirect the user to, then use it as you see fit
 link  = response.redirectUrl;
 let pollUrl = response.pollUrl;

 
 return pollUrl
    
    }
  });

  let status = paynow.pollTransaction(pollUrl);
  console.log(status);
  

  
  



  return NextResponse.json(paymentresult)
  
 } catch (error) {
  console.log("error");
  
 }

 


}
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')

  return new NextResponse(null, {
      status: 204,
      headers: {
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
  })
}
export async function GET(req:NextRequest,res:Response) {

 try {
 
const pollUrl=req.url;


  let paynow = new Paynow(process.env.NEXT_INTEGRATION_ID, process.env.NEXT_INTEGRATION_KEY);



  paynow.resultUrl = "http://example.com/gateways/paynow/update";




  paynow.returnUrl = "http://localhost:3000/cart";
 
 

 


  let status =await paynow.pollTransaction(pollUrl);

  console.log(status);
  
  if (status.paid()) {
   console.log(status);
   console.log("hello");
   
  } else {
    console.log("Why you no pay?");
    console.log("hello");
  }
  
  

console.log("hello");


  return NextResponse.json({paid:status.paid()})
  
 } catch (error) {
  console.log("error");
  
 }
}

