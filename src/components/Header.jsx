import React from 'react';

const Header = ({ onHeaderClick }) => (
    <nav className="navbar navbar-default">
        <div className="navbar-header">
            <a className="navbar-brand" href="#" onClick={onHeaderClick}>
                Recipe App!
            </a>
        </div>
    </nav>
);

Header.propTypes = {
    onHeaderClick: React.PropTypes.func.isRequired,
}

export default Header;