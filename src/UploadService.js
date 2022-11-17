import FormData from "form-data";
import axios from "axios";
import React from "react";
import FileBase64 from "react-file-base64";
import { useState, useEffect } from "react";


function UploadService({childToParent}) {
    const [picURL, setPicURL] = useState("");
    const [fileLocation,setFileLocation] = useState("");
    const uploadAxios = async () => {

        try {
            console.log("starting -> Upload Job");
        
            const myForm = new FormData();
            myForm.append("image", fileLocation);
        
            await axios
              .post(
                `https://api.imgbb.com/1/upload?key=f7ebc19576202f94494279ba096c6ecc`,
                myForm,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .then((response) => {
                console.log("API response ↓");
                console.log(response);
                childToParent(response.data.data.display_url)
                
              })
              .catch((err) => {
                console.log("API error ↓");
                console.log(err);
        
                if (err.response.data.error) {
                  console.log(err.response.data.error);
                  //When trouble shooting, simple informations about the error can be found in err.response.data.error so it's good to display it
                }
                
              });
          }
    
        catch (error) {
            console.log(error);
          }}

    useEffect(() => {
      uploadAxios()
      
    }, [fileLocation]);


    useEffect(() => {
        console.log("uploaded : ",picURL)
        
    }, [picURL]);


    return(
        <div>
            <FileBase64 multiple={false} onDone={({base64}) => {
                setFileLocation(base64.replace(/^(.+?),/g, ""))
                console.log("done encoding+regex, calling upload")
                }}/> <br/>
        </div>
        )
}

export default UploadService;

//<input type="file" onChange={(event) => {setFileLocation(event.target.value)}}></input>
//            <div><button onClick={()=>{uploadAxios()}}>ok??</button></div>

