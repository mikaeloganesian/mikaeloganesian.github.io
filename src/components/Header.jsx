import Logo from '../assets/logo.svg?react';

function Header() {
    return (
        <header className="header">
            <img className={"logo"} src={Logo} alt="HSE"/>
            <div className="header-info">
                <h1 className="header-title">HSE.Helper</h1>
                <h3 className="header-subtitle">Created by Mikael Oganesian</h3>
            </div>
        </header>
    )
}

export default Header;