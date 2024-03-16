import { Nav } from "../nav/nav.component"
import { navbarData } from "./navbarData"

export const NavBar = () => {

    return (
        <div className="navigation-bar">
            <h2>Navigation bar</h2>
            <Nav data={navbarData}
            ulClassName="navbar-ul-links"
            liClassName="navbar-li-elem"
            itemClassName="navbar-link"/>
        </div>
    )
}