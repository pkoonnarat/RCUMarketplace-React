import ImgUploadService from "./ImgUploadService"
import React from "react"
import { useState } from "react"


export default function ParentDemo(){
    const [data,setData] = useState("still default")

    const getDataFromChild = (childdata) => {
        setData(childdata)
    }

    return(<div>
        this Runs??<br></br>
        {data}
        <ImgUploadService childToParent={getDataFromChild} />

    </div>)
}