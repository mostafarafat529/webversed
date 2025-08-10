import { useNavigate } from "react-router-dom";
import "./news.css"
import { FaLongArrowAltLeft } from "react-icons/fa";
const NavNews = ({setcat}) => {

    const Navigate =useNavigate("")
return (
<div className="categories">
    <ul >
    <li>
        <button className="nav-link active" aria-current="page" id="back_arrow" onClick={()=>Navigate("/")}> <FaLongArrowAltLeft />back </button>
    </li>
    <li>
        <button onClick={()=>setcat("general")} className="nav-link active" aria-current="page">general</button>
    </li>
    <li>
        <button onClick={()=>setcat("business")} className="nav-link active" aria-current="page">business</button>
    </li> 
    <li>
        <button onClick={()=>setcat("entertainment")} className="nav-link active text-" aria-current="page">entertainment</button>
    </li>
    <li>
        <button onClick={()=>setcat("health")} className="nav-link active" aria-current="page">health</button>
    </li>
    <li>
        <button onClick={()=>setcat("science")} className="nav-link active" aria-current="page">science</button>
    </li>
    <li>
        <button onClick={()=>setcat("sports")} className="nav-link active" aria-current="page">sports</button>
    </li>
    <li>
        <button onClick={()=>setcat("technology")} className="nav-link active" aria-current="page">technology</button>
    </li>

    </ul>
</div>
)
}

export default NavNews