import { Nav } from "../nav/nav.component"
import { navbarData } from "./navbarData"

import './navbar.styles.css'

export const NavBar = () => {

    return (
        <div className="navigation-bar">
            <Nav data={navbarData}
            ulClassName="navbar-ul-links"
            liClassName="navbar-list-elem"
            itemClassName="navbar-link-elem"/>
        </div>
    )
}