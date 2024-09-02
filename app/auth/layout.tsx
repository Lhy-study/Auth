import { ReactNode } from "react";

const layout = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div
            className="w-full h-full flex items-center justify-center backgorund"
        >
            {children}
        </div>
    )
}
export default layout