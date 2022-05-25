import React from 'react';

function ImagePopup(props) {

  return (<section className={`popup popup_task_img ${props.isOpen && 'popup_opened'}`}>
  <div className="popup__container">
    <button type="button" aria-label="Закрыть" className="popup__close" onClick={props.onClose}></button>
    <figure className="figure">
      <img src={props.card.link} alt={props.card.name} className="figure__img" />
      <figcaption className="figure__caption">{props.card.name}</figcaption>
    </figure>
  </div>
  </section>
);

}
  
export default ImagePopup;
  
