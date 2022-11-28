import './App.css';
import * as React from 'react';
import axios from 'axios';

import { redditLogo } from './ressources/icons/svgIcon';
import { articlesReducer, baseURL } from './AppReducer';
import { SearchForm } from './components/SearchForm/SearchForm';
import { Articles } from './components/Articles/Articles';
import { Categories } from './components/Categories/Categories';

function App() {
  const [articles, dispatchArticles] = React.useReducer(
    articlesReducer,
    {data:[], isLoading:false, isError:false }
  );
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('/best.json?raw_json=1')
  const [url, setURL] = React.useState(`${baseURL}${searchTerm}${filter}`)

  const handelFetchArticle = React.useCallback(async()=>{
    dispatchArticles({type:'LoadingArticles'});
    try{
      const result = await axios.get(url);
      dispatchArticles({
        type:'GetArticles',
        payload: result.data.data.children
      })
    }catch{
      dispatchArticles({type:'ErrorFetching'})
    }

  }, [url]);

  React.useEffect(()=>{
    handelFetchArticle();
  }, [handelFetchArticle]);

  React.useEffect(()=>{
    setURL(`${baseURL}${searchTerm}${filter}`);
  },[filter])

  const handleSubmit = (e)=>{
    setFilter('.json?raw_json=1');
    setURL(`${baseURL}${searchTerm}${filter}`);
    e.preventDefault();
  }

  const handleSearch = (event) =>{
    setSearchTerm(`/r/${event.target.value}`);
  };

  const handleFiltre = (string)=>{

    const value = string;

    const basicTopic = '.json?raw_json=1'
    const hotTopic = '/hot.json?raw_json=1';
    const topTopic = '/top.json?raw_json=1';
    const homeTopic = '/best.json?raw_json=1';

    if(searchTerm === ""){
      if(value === 'hot'){
        if(!filter.includes(hotTopic)){
          setFilter(hotTopic);
        } else setFilter(homeTopic);
      } else if (value === 'top'){
        if(!filter.includes(topTopic)){
          setFilter(topTopic);
        } else setFilter(homeTopic);
      } else if (value === 'homeReddit'){
        setFilter(homeTopic);
      } else return;
    } else if(value === 'hot'){
      if(!filter.includes(hotTopic)){
        setFilter(hotTopic);
      } else setFilter(basicTopic);
    } else if(value === 'top'){
      if(!filter.includes(topTopic)){
        setFilter(topTopic);
      } else setFilter(basicTopic);
    } else if(value === 'homeReddit'){
      setSearchTerm("")
      setFilter(homeTopic)
    };
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='App-compartiment'><h3>{redditLogo}Mini<span>Reddit</span></h3></div>
        <div className='App-compartiment'>
          <SearchForm 
          handleSearch={handleSearch} 
          handleSubmit={handleSubmit} 
          />
        </div>
        <div className='App-compartiment'></div>
      </header>
      <div className="Body">
        <div>
          <Articles articles={articles.data} />
        </div>
        <Categories 
        handleFiltre={handleFiltre}
        />
      </div>
      <footer className='Footer'>
      </footer>
    </div>
  );
}

export default App;