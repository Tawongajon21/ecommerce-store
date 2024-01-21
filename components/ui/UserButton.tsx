import { UserButton } from "@clerk/nextjs";
 
export default function UserButtonComponent() {
  return (
    <div className="h-screen">
      <UserButton afterSignOutUrl="/sign-in"/>
    </div>
  )
}