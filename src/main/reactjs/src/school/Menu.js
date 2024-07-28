import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const Menu =()=>{
    return(
        <ul className="main_menu">
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"/student/form"}>글쓰기</NavLink>
            </li>
            <li>
                <NavLink to={"/student/list"}>목록</NavLink>
            </li>
        </ul>
    )
}
export default Menu;