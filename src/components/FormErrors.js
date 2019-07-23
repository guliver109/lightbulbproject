import React from 'react';

const h5Style = {
    // paddingLeft: '30px',
    color: '#fff'
  }

export const FormErrors = ({formErrors}) =>
    <div className = "formErrors">
        {Object.keys(formErrors).map((fieldName, i) => {
            if(formErrors[fieldName].length > 0) {
                return(
                    <p style = {h5Style} key = {i}>{fieldName} {formErrors[fieldName]}</p>
                )
            } else {
                return '';
            }
        })}
    </div>