import { auth } from "@/auth"

const page = async () => {
  let data = await auth();
  return (
    <div>{JSON.stringify(data)}</div>
  )
}
export default page