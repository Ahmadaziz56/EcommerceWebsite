import { Link } from "react-router-dom"
import SearchOffIcon from '@mui/icons-material/SearchOff';
const PageNotFound=()=>{
    return (
        <div className="emptyCart">
            <SearchOffIcon/>
            <h1>404 Page Found</h1>
            <Link to="/">HOME</Link>
        </div>
    )
}
export default PageNotFound