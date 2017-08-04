import React from 'react';

const Header = ({ onHeaderClick }) => (
    <nav className="navbar navbar-default" style={{ marginTop: '20px'}}>
        <div className="navbar-header" style={{ display: 'flex', flexWrap: 'inline-wrap', flexDirection: 'row-reverse'}}>
            <span className="icon fi-graph-pie" style={{ fontSize: '36px', color: '#ffcc00'}}>
                <a className="navbar-brand" href="#" onClick={onHeaderClick} style={{color: '#de8533'}}>
                Recipe App!
                </a>
            </span>
        </div>
    </nav>
);

Header.propTypes = {
    onHeaderClick: React.PropTypes.func.isRequired,
}

export default Header;