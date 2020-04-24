import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/scss/components/_progress-bar.scss';

const progressBar = ({ value, limit }) => {
  // Dynamically set the width and color of progress bar.
  const progressStyles = { 
    width: (value < 0 ? 0 : (value > limit || value > 100 ? 100 : value)) + '%',
    backgroundColor: value > limit ? 'lightCoral' : 'lightGreen'
  };

  return (
    <div className="bar-progress">
      <span className="bar-progress-percentage">{value}%</span>
      <div className="bar-progress-tracker" style={progressStyles}></div>
    </div>
  );
}

progressBar.propTypes = {
  value: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
};

export default progressBar;