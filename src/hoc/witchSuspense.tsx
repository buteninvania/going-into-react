import React from "react"
import Preloader from "../components/commons/Preloader/Preloader"

export function witchSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return  <React.Suspense fallback = {<Preloader />}>
                    <WrappedComponent {...props} />
                </React.Suspense>
    }
}
