import createPayment from "@/lib/paynow";
import {NextResponse,NextRequest} from "next/server";
import {Paynow} from "paynow"
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
      const {searchParams} = new URL(req.url);

  const pollUrl=searchParams.get("url")

  let paynow = new Paynow(process.env.NEXT_INTEGRATION_ID, process.env.NEXT_INTEGRATION_KEY);
  let status =await paynow.pollTransaction(pollUrl);

  
 
  
  



 {

     return NextResponse.json(status)
 }
  
     
    } catch (error) {
    console.log(error);
    
        return NextResponse.json({error:"error"})
    
     
     
    }
   }