import React from 'react';
import axios from 'axios';
import './App.css';
import Logo from '../src/assets/img/logo.jpeg'
import FilmListProvider from './components/filmlist-provider/filmlist-provider';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listData: [],
      pagination:[]
    };
  }

  componentDidMount() {
    //aqui eu 'simulo' uma chamada api para o meu arquivo json externo com as imagens 
    let json = require('./imgJson.json');
    console.log(json)

    axios.get('https://ghibliapi.herokuapp.com/films')
      .then(res => {
        const data = res.data

        /*nessa parte eu criei uma promisse que mescla os dados do meu json local, com o callback que a
         api me retorna, salvos em data */
        const newArrayMovies = async () => {
          try {

            //resposta da api
            const movies = data;
            //array a ser preenchido com o novo array criado
            const listData = [];
            for (const movie of movies) {

              /*passando por todos os objetos, eu faço a checagem se o obj recebido possui a key de image,
              caso não tenha, eu crio a key e passo o link da imagem comparando o nó de title 
              existente nos dois arrays
              */
              const img = json.find(el => el.title === movie.title);
              if (img) {
                listData.push({ ...movie, image: img });
              } else {
                listData.push({ ...movie });
              }
            }
            this.setState({ listData });
            return listData;
          } catch (err) {
            console.log('Error :(', err.toString());
          }
        }
        //no final, executo a promisse 
        newArrayMovies()
      })
  }


/*    listItems(items, pageActual, limitItems){
    let result = [];
    let totalPage = Math.ceil( items.length / limitItems );
    let count = ( pageActual * limitItems ) - limitItems;
    let delimiter = count + limitItems;
    console.log(totalPage)
    
    if(pageActual <= totalPage){
        for(let i=count; i<delimiter; i++){
            if(items[i] != null){
                result.push(items[i]);
            }
            count++;
        }
    }
    console.log('ii',pageActual)
    this.setState({ pagination:result });
    return result;

}; */

  render() {
    const listData = this.state.listData
  
    return <div>
      <nav>
        <img src={Logo}/>
        <h1 className="title">Aqui passa - Ghibli Films </h1>
      </nav>
      <div className="container">
        <div className="list-container">
          <div className="card">
            {listData.map(film =>
              <FilmListProvider

                //aqui eu checo se o obj tem o nó de imagem, e se ele é !0 ou undefined
                img={film.image && film.image.img}
                id={film.id}
                title={film.title}
                description={film.description}
                director={film.director}
              />)
            }
          </div>
        </div>
      </div>
      
    </div>
  }

}

export default App;
