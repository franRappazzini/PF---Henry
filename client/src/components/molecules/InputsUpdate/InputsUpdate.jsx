import { MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../../redux/actions/otherActions";
import style from "./InputsUpdate.module.css";


function InputsUpdate({product}) {
 
 

  return(
    <section>
        <TextField
          label={product?.name}
          variant="standard"
          autoComplete="off"
          name="name"
          color="secondary"
        // onChange={handleChange}
        value={product?.name}
        required
      />

     

    </section>
  )
      

    
   
  }

  export default InputsUpdate