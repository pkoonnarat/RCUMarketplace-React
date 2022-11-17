import FormData from "form-data";
import axios from "axios";
import React from "react";
import FileBase64 from "react-file-base64";
import { useState, useEffect } from "react";

export default function ImgUploadService({childToParent}){
    const data = "ok child sent"

    return(
        <div><br></br>
            <button onClick={() => {childToParent(data)}}>Click Child</button>
        </div>
    )



}