import React from 'react';

function InfoTooltip(props) {

  return (
  <section className={`popup popup_task_${props.name} ${props.isOpen && 'popup_opened'}`}>
    <div className="popup__container">
      <form name={`${props.name}`}  className="popup__form" id={`${props.name}`}>
      <button type="button" aria-label="Закрыть" className="popup__close" /*onClick={props.onClose}*/></button>
      <img src={props.image} alt={props.imageDescription} className="popup__mark-image"/>
      <p className='popup__conditional-text'>{props.text}</p>
      </form>
    </div>
  </section>
  );
}
  
export default InfoTooltip;