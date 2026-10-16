import type { ReactNode } from "react"

type containerProps = {
    children: ReactNode
}

const Container = (props:containerProps) => {
    return (
        <div className="max-w-filmforge w-full px-5 filmforge-400:px-6 sm:px-8 mx-auto">
            {props.children}
        </div>
    )
}

export default Container