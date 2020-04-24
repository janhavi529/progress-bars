import React from 'react';
import PropTypes from 'prop-types';

const button = ({ className, value, onClick }) => (
    <button type="button" className={className} value={value} onClick={onClick}>{value}</button>
);

button.propTypes = {
    className: PropTypes.string,
    value: PropTypes.number.isRequired,
    onClick: PropTypes.func
};

export default button;