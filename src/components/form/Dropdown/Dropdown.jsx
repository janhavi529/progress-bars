import React from 'react';
import PropTypes from 'prop-types';

const dropdown = ({ label: dropdownLabel, value, options, onChange }) => (
    <div className="form-group mx-2 text-center">
        <label htmlFor="selectMenu">{dropdownLabel}</label>
        <select id="selectMenu"
            className="form-control"
            value={value}
            onChange={onChange}>
            {
                options.map(({id, label: optionLabel}) => (
                    <option key={id} value={id}>{optionLabel}</option>
                ))
            }
        </select>
    </div>
);

dropdown.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
    })),
    onChange: PropTypes.func,
};

dropdown.defaultProps = {
    value: 1,
};

export default dropdown;