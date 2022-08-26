import styles from "./NotFound.module.css"
import { TbError404 as NF, } from  'react-icons/tb'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Link } from "react-router-dom";

function NotFound(){
    return(
        
        <main className={styles.main}>
            <h1>Oops...</h1>
            <NF className={styles.NF}/>
            <p className={styles.P}>The page you were looking for does not exist</p>
            <SentimentVeryDissatisfiedIcon className={styles.sad}/>
            <Link to="/"><button className={styles.detailsButton}>Go Back
            </button></Link>
            
        </main>
    )
}

export default NotFound