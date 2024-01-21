"use client"
import {Product} from "@/types"
import Currency from "./ui/currency"
import Button from "./ui/Button";
import {ShoppingCart} from "lucide-react";
import useCart from "@/hooks/use-cart";
import {MouseEventHandler} from "react"

interface InfoProps{
    data:Product
}
const Info:React.FC<InfoProps>=({data})=>{
    console.log(data);
const cart= useCart()
 const addToCart:MouseEventHandler<HTMLButtonElement>=(event)=>{
event.stopPropagation()
cart.addItem(data)
 }
    
return (
    <div>
        <h1 className="text-3xl font-bold text-gray-900">
            {data.name}
        </h1>
       <div className="mt-3 flex items-end justify-between">
<div className="text-2xl text-gray-900">
<Currency value={data?.price}/>
</div>
       </div>
<hr className="my-4"/>
<div className="flex items-center gap-x-4">
<h3 className="font-semi-bold text-black">
Size:
</h3>
<div>
    {
        data?.size.name
    }
</div>
</div>
<div className="flex items-center gap-x-4">
<h3 className="font-semi-bold text-black">
Color:
</h3>
<div 
style={{
    backgroundColor:data?.color?.value
}}
className="h-6 w-6 rounded-full border border-gray-600"/>
<div>
    {
        data?.size.name
    }
</div>
</div>
<div className="mt-10 flex items-center gap-x-3">
    <Button onClick={addToCart} className="flex items-center gap-x-2">
        Add To Cart <ShoppingCart/>
    </Button>
</div>

    </div>
)
}


export default Info