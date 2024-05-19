import Header from "@/components/auth/Header";
import BackButton from "@/components/auth/BackButton";
import { 
    Card,
    CardHeader,
    CardFooter,
 } from "@/components/ui/card";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-sm">
        <CardHeader>
            <Header label="Something is wrong!"/>
        </CardHeader>
        <CardFooter>
            <BackButton 
                label="Back to login"
                href="/auth/login"
            />
        </CardFooter>
    </Card>
  )
}