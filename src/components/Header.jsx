import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg py-4 bg-dark ps-4">
                   <Link to='/'><img style={{ height: "90px", width:"90px" }} className="navbar-brand " src="https://dynamic.brandcrowd.com/preview/logodraft/f3508e0f-af4d-4af8-b800-e814b2c59e99/image/large.png" alt="BRAND"/></Link>
                    <button className="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/createJob" className="nav-link text-light" >Post A Job</Link>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link text-light" href="#services">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="#contact">Contact</a>
                            </li> */}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;