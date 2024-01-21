"use client"
 
import * as z from "zod"
const Address=()=>{
    const formSchema = z.object({
        houseName:z.string().min(1),
        streetNo:z.string().min(1),
        surbub:z.string().min(1),
        city:z.string().min(1)
    });

return (
    <div>
        <div>
        <label htmlFor="">
House name
</label>
<input type="text" />
        </div>
       
    </div>
)
}


export default Address;