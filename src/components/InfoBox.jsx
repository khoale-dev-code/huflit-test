import React from 'react';

const InfoBox = ({ title, children, type = 'info' }) => (
  <div className={`info-box ${type}`}>
    <h3>{title}</h3>
    {typeof children === 'string' ? <p>{children}</p> : children}
  </div>
);

export default InfoBox;