import styled from 'styled-components';

const Button = styled.button`
    color: var(--light-color);
    height: auto;
    width: auto;
    padding: 0.3rem;
    border-radius: 6px;
    outline: none;
    border: none;

    
    transition: transform 0.3s;
    cursor: pointer;
    background: ${props => props.type === 'danger' ? '#FF3232' : '#555'};
    float: ${props => props.float};



    &: hover {
    ${ props => (props.type === 'undo' ? 'transform: rotate(-180deg) scale(1.2)' : 'transform: scale(1.2)')};
}
`;

export default Button;