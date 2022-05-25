import React from 'react';

class PopupWithForm extends React.Component {
	constructor(props) {
    super(props);
  }

  render() {
    return (<section className={`popup popup_task_${this.props.name} ${this.props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" aria-label="Закрыть" className="popup__close" onClick={this.props.onClose}></button>
        <form name={`${this.props.name}`}  className="popup__form" id={`${this.props.name}`} /*noValidate*/ onSubmit={this.props.onSubmit}>
          <h2 className="popup__heading">{`${this.props.title}`}</h2>
            {this.props.children}
          <button type="submit" aria-label={`${this.props.button}`} className="popup__button">{`${this.props.button}`}</button>
        </form>
      </div>
    </section>)
	}
}
  
export default PopupWithForm;