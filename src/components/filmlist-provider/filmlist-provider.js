import React, { Component } from 'react'
import axios from 'axios';
import Modal from '../detail-modal-provider/detail-modal-provider'
import './filmlist-provider.css'

class FilmListProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            show: false,
        }
    }


    //toggle do modal no botão abrir/fechar modal
    showModal = e => { 
        this.setState ({ 
          show:! this.state.show 
        }); 
    };

    //função toggle para fechar o modal passada para o componente pai
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    //chamada que pega o id de cada usuário clicado e exibe as informações de acordo com cada id
    moreInformation(e, id){
        e.preventDefault()
        id = this.props.id
        axios.get(`https://ghibliapi.herokuapp.com/films/${id}`)
        .then(res => {
        const data = res.data
        this.setState({ data });
        })
        this.showModal();
    }

    handleBlur(){
        this.state.show=false
    }

    render(){
        const data = this.state.data
        
        return <div>
            <Modal 
            onClose = {this.showModal}
            show ={this.state.show} 
            id={this.props.id}
            title={data.title}
            description={data.description}
            director={data.director}
            producer={data.producer}
            releaseDate={data.release_date}
            rtScore={data.rt_score}
            />
            
            <div className="card-container">
            <p className="d-none">{this.props.id}</p>
            <div className="card-image-container">
                <img src={this.props.img}/>
            </div>
            <div className="card-info-container">
                <p className="card-info__title">{this.props.title}</p>
                <p className="card-info">{this.props.description}</p>
                <p className="card-info__director">{this.props.director}</p>
            </div>
            <button onClick={(e) => this.moreInformation(e, this.props.id)}>Abrir/fechar modal</button>
            </div>
    </div>
    }



}

export default FilmListProvider
