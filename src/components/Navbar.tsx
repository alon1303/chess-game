import {NavLink} from "react-router-dom";
import Icon from "../assets/WhitePawn.tsx";


const NavBar = () =>{

    return(

            <nav className="">
                <ul className="flex nav-bar h-20">
                    <NavLink to={'/'} className="link ml-4 flex flex-row items-center">
                        <span className="text-5xl">Chess</span>
                    <Icon></Icon>
                    </NavLink>
                </ul>

            </nav>

    )
}
export default NavBar;