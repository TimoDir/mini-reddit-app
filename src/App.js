import * as React from 'react';
import './App.css';
import { redditLogo, searchIcon } from './ressources/icons/svgIcon';


const SearchForm = () =>{
  return(
    <form>
      <input type="search" placeholder="search inside reddit" />
      <button type='submit'>{searchIcon}</button>
    </form>
  );
}

const Post = () =>{
  return(
    <article>
    </article>
  );
}

const FavCategorie = () =>{
  return(
    <aside>
    </aside>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='App-compartiment'><h3>{redditLogo}Mini<span>Reddit</span></h3></div>
        <div className='App-compartiment'><SearchForm  /></div>
        <div className='App-compartiment'></div>
      </header>
      <div className="Body">
        <Post />
        <FavCategorie />
      </div>
    </div>
  );
}

export default App;
