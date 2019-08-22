import React from 'react';
import styled from 'styled-components';

import logo from '../assets/images/icon48.png';


const Image = ({ className}) => {
    return <img className={className} src={logo} alt="Logo" />;
};

const Logo = styled(Image)`
    width: 20px;
    margin-left: 0.3rem;
`;

export default Logo;
