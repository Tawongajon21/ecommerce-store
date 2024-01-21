"use client"

import Button from "@/components/ui/Button"
import Currency from "@/components/ui/currency"
import useCart from "@/hooks/use-cart"
import usePoll from "@/hooks/use-polls"

import axios from "axios"

import {useRouter, useSearchParams} from "next/navigation"
import {useEffect, useState} from "react"
import toast from "react-hot-toast"

const Summary=()=>{
   
    const poll= usePoll()
    const items= useCart((state)=>state.items)
    const router= useRouter()
    const cart=useCart()
    const removeAll= useCart((state)=>state.removeAll)
const [url, seturl] = useState("")

    const searchParams= useSearchParams()
    const totalPrice= items.reduce((total,item)=>{
        return total+Number(item.price)
    },0)
{
    /** const onCheckout=async()=>{
const response=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`,{
    productIds:items.map((item)=>item.id)
})
window.location=response.data.url
    }*/
}
let invoiceNumber=Math.random()
let info={items,invoiceNumber}


    useEffect(() => {
     if (searchParams.get("success")) {
        toast.success("Payment completed")
    
        removeAll()
     }
     if (searchParams.get("canceled")) {
        toast.success("Something went wrong")
     }
checkPoll()

    }, [searchParams,removeAll])
   async function onCheckout() {
try {
 const {data}=   await axios.post(`/api`,info);
 https://api.pesepay.com/api/payments-engine/v1/payments/initiate


console.log(data);

if (data.success===true) {
    toast.success("Please note that you are being redirected to the paynow page")

    window.open(data.redirectUrl)
    console.log(data.pollUrl);
    
    seturl(data.pollUrl)
    console.log(url);
    
  localStorage.setItem("pollUrl", url);
   
    checkPoll()
  const response= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`,{
    productIds:items.map((item)=>item.id)
  })
  poll.addPoll(data.pollUrl)
 
  
    //
}

// console.log(data);
 
} catch (error) {
    console.log(error);
    
}

       
    }

  
    async function checkPoll() {
        try {
     
      
         let paynowurl= localStorage.getItem("pollUrl")
         console.log(paynowurl?.trim());
            const {data}= await axios.get(`/api/poll?url=${paynowurl}`)
           console.log(data);
           
        if (data.status==="created") {
            console.log("hello");
            
        }else if(data.status==="paid"){
            
toast("You have succesfully paid for your order")
cart.removeAll()
router.push("/")
        }
          
            
        } catch (error) {
            console.log(error);
        }
    }


 
return (
    <div className="mt-16 rounded-lg
     bg-gray-50 px-4 py-6 
     sm:p-6 lg:col-span-5
      lg:mt-0
      lg:p-8
      ">
        <h2 className="text-lg font-medium text-gray-900">
Order Summary
        </h2>
        <div className="mt-6 space-y-4">
<div className="flex items-center justify-between border-t border-gray-200">
<div className="text-base font-medium text-gray-900">
    Order total
</div>
<Currency value={totalPrice}/>
</div>
        </div>
<Button disabled={items.length===0}  onClick={onCheckout} className="w-full mt-6">
    Checkout
</Button>
    </div>
)
}

export default Summary
