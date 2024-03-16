import { ReactNode } from "react";

const layout = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundImage: 'linear-gradient(to right top, #ffffff, #eff1f9, #dae4f3, #c0d9eb, #a4cfdf, #8fb7c9, #7ba0b4, #688a9f, #596376, #44404c, #272226, #000000)' }}
        >
            {children}
        </div>
    )
}
export default layout