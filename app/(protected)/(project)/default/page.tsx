import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
      
    </form>
  )
}

export default SignOut