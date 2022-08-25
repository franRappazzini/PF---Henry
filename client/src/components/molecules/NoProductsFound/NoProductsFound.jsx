import React, { useEffect, useState } from "react";
import styles from "./NoProductsFound.module.css"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function NoProductsFound ({message}) {
    const [pageLoad, setPageLoad] = useState(false)

    useEffect(()=> {
        setInterval (()=>{
            setPageLoad(true)
        }, 500)
    }, [])
    return(
    <div>
        {pageLoad ? 
            <div className = {styles.container}>
            {message}
            <div><SentimentVeryDissatisfiedIcon className={styles.icon}/></div>
        </div> : null}
        
    </div>
    )
}