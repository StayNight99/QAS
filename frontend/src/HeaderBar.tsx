import React from "react";
import { Menubar } from 'primereact/menubar';


export default function HeaderBar(){
  const items = [
    {
      label: 'Todonav'
    }
  ]
  return(
    <div>
      <Menubar model={ items } />
    </div>
  )
}