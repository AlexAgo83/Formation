import { useToggle } from "../hooks/useToggle";
import { activeClassIf } from "../utils/classnames";

/**
 * @param {string} page 
 */
export function Headers({ page }) {

    const [expanded, toggleExpanded] = useToggle(false)

    return <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">My WebSite</a>
            <button
                onClick={toggleExpanded}
                className="navbar-toggler"
                type="button"
                aria-controls="navbarNav"
                aria-expanded={expanded}
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className={activeClassIf(page === 'home', 'nav-link')} aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className={activeClassIf(page === 'post', 'nav-link')} href="#post">Article</a>
                    </li>
                    <li className="nav-item">
                        <a className={activeClassIf(page === 'contact', 'nav-link')} href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}