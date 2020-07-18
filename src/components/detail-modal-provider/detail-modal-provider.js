import React, { Component } from "react";
import Doodle from '../../assets/img/308387_featherink_totoro.gif'

import './detail-modal-provider.css'






class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        show: false,
    }
}

   //toggle do modal no botão abrir/fechar modal
   onClose = e => {
    this.props.onClose && this.props.onClose(e);
};

  render() {
    if (!this.props.show) {
      return null;
    }
    return <div className="modal">
      <div className="content">
        <h2>More information</h2>
        <p className="d-none">Id : <span>{this.props.id}</span></p>
        <p>Title: <span>{this.props.title}</span></p>
        <p>Description: <span>{this.props.description}</span></p>
        <p>Director: <span>{this.props.director}</span></p>
        <p>Producer: <span>{this.props.producer}</span></p>
        <p>Release date: <span>{this.props.releaseDate}</span></p>
        <p>Rooten Tomatoes Score: <span>{this.props.rtScore}</span></p>
        <div className="totoro_doodle">
          <img src={Doodle} />
        </div>

      </div>

    </div>
  }
}


export default Modal