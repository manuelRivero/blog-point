import React from "react";

export const sliceText = (event:React.ChangeEvent<any>, length:number):React.ChangeEvent<any> =>{
     event.target.value = event.target.value.slice(0, length);
     return event
}