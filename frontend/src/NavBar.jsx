import { navData } from "./Navigation";
import { useLocation } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
    const location = useLocation();

    return (
        <nav className='navBar-container px-[2rem] mb-[2rem]'>
            <ul>
                <li>
                    <hgroup>
                        <h1 id="#heading" className="font">Triangulations</h1>
               
                    </hgroup>
                </li>
            </ul>
            <ul>
                {navData.map((item) => {
                    return (
                        <li id={item.id}>
                            <a href={item.link} className="font">{item.text}</a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
