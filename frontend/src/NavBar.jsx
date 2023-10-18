import { navData } from "./Navigation";
import { useLocation } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
    const location = useLocation();

    return (
        <nav className='navBar-container'>
            <ul>
                <li>
                    <hgroup>
                        <h1>Triangulations</h1>
               
                    </hgroup>
                </li>
            </ul>
            <ul>
                {navData.map((item) => {
                    return (
                        <li id={item.id}>
                            <a href={item.link}>{item.text}</a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
