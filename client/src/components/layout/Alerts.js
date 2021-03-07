import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const{alerts} = alertContext;

  return (
    // if alert state, map alerts and display dynamically
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle">{alert.msg}</i>
      </div>
    ))
  );
};

export default Alerts;
