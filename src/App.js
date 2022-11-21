import './App.css';
import * as React from 'react';
import axios from 'axios';

import { redditLogo } from './ressources/icons/svgIcon';
import { articlesReducer } from './AppReducer';
import { SearchForm } from './components/SearchForm/SearchForm';
import { Articles } from './components/Articles/Articles';

const initialPostState = [
  {title:"Beluga",
  redditPlace:"Cat",
  author:"SuperBeluga",
  date:"07/11/2022",
  URLimage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbla7jeZvXe52oVMRY4ecyTFrxFYeYUonFs9kfSd0PznOP_S4sHSNLNDXYbYSiT8YCZlM&usqp=CAU",
  likeCount: 120077,
  comment:[
    {author:"ScubaCycle",
    date:"07/11/2022",
    contents:"I like it",
    likeCount: 3500,
    },
    {author:"Martoni",
    date:"07/11/2022",
    contents:"I dont like it",
    likeCount: 25,
    },
    {author:"antiBeluga",
    date:"07/11/2022",
    contents:"You bluff @Martoni!",
    likeCount: 789,
    },
    {author:"Martoni",
    date:"07/11/2022",
    contents:"lol",
    likeCount: 655,
    },
  ],
},
{title:"Martoni",
  redditPlace:"Movie",
  author:"SuperMartoni",
  date:"07/11/2022",
  URLimage:"https://pbs.twimg.com/media/CUM1wfaWEAAw3gt?format=png&name=4096x4096",
  likeCount: 570099900,
  comment:[
    {author:"antiBeluga",
    date:"07/11/2022",
    contents:"I like it",
    likeCount: 100,
    },
    {author:"Martoni",
    date:"07/11/2022",
    contents:"It's not me :p",
    likeCount: 23,
    },
    {author:"antiBeluga",
    date:"07/11/2022",
    contents:"You bluff @Martoni!",
    likeCount: 65,
    },
    {author:"Martoni",
    date:"07/11/2022",
    contents:"lol",
    likeCount: 10,
    },
  ],
},
]

const initialArticles = async() =>{
  const rawdata = await axios.get("https://www.reddit.com/top.json?t=day");
  const articles = [];
  rawdata.data.data.children.forEach(article => articles.push(article))
  return articles;
}

const initialArticlesState = initialArticles();


const FavCategorie = () =>{
  return(
    <aside>
    </aside>
  );
}

function App() {
  const [articles, dispatchArticles] = React.useReducer(
    articlesReducer,
    {data:[], isLoading:false, isError:false }
  );
  const [searchTerm, setSearchTerm] = React.useState('top.json?t=day');

  const handelFetchArticle = React.useCallback(async()=>{
    dispatchArticles({type:'LoadingArticles'});
    const url= `https://www.reddit.com/${searchTerm}`
    try{
      const result = await axios.get(url);
      dispatchArticles({
        type:'GetArticles',
        payload: result.data.data.children
      })
    }catch{
      dispatchArticles({type:'ErrorFetching'})
    }

  }, [searchTerm]);

  React.useEffect(()=>{
    handelFetchArticle();
  }, [handelFetchArticle]);

  const handleSearch = (event) =>{
    setSearchTerm('r/'+event.target.value+'.json');
    console.log(searchTerm)
    event.preventDefault();
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='App-compartiment'><h3>{redditLogo}Mini<span>Reddit</span></h3></div>
        <div className='App-compartiment'><SearchForm searchTerm={searchTerm} handleSearch={handleSearch} /></div>
        <div className='App-compartiment'></div>
      </header>
      <div className="Body">
        <Articles articles={articles.data} />
        <FavCategorie />
      </div>
      <footer className='Footer'>
      </footer>
    </div>
  );
}

export default App;