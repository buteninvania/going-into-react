import React from "react";
import Preloader from "../components/commons/Preloader/Preloader";



export const witchSuspense = (Component) => {

    return (props) => {
        return  <React.Suspense fallback={<Preloader />}>
                    <Component {...props} s/>
                </React.Suspense>
    };
}
