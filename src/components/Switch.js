import React from 'react';

function Switch(props) {
    return (
        <span onClick = {() => props.passData("hello")} className = {props.className}>{props.value}</span>
    )
}

export default Switch;
