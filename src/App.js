import * as React from 'react';
import './App.css';
import { redditLogo, searchIcon, arrowUpIcon, arrowDownIcon, commentIcon, commentOpenIcon, urlToRedditArticle} from './ressources/icons/svgIcon';

const initialPostState = [
  {title:"Beluga",
  redditPlace:"Cat",
  author:"SuperBeluga",
  date:"07/11/2022",
  URLimage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbla7jeZvXe52oVMRY4ecyTFrxFYeYUonFs9kfSd0PznOP_S4sHSNLNDXYbYSiT8YCZlM&usqp=CAU",
  likeCount: 120077,
  comment:[
    {author:"antiBeluga",
    date:"07/11/2022",
    contents:"I like it",
    },
    {author:"Martoni",
    date:"07/11/2022",
    contents:"I dont like it",
    },
    {author:"antiBeluga",
    date:"07/11/2022",
    contents:"You bluff @Martoni!",
    },
    {author:"Martoni",
    date:"07/11/2022",
    contents:"lol",
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
    },
    {author:"Martoni",
    date:"07/11/2022",
    contents:"It's not me :p",
    },
    {author:"antiBeluga",
    date:"07/11/2022",
    contents:"You bluff @Martoni!",
    },
    {author:"Martoni",
    date:"07/11/2022",
    contents:"lol",
    },
  ],
},
]


const SearchForm = () =>{
  return(
    <form>
      <input type="search" placeholder="search inside reddit" />
      <button type='submit'>{searchIcon}</button>
    </form>
  );
};

const CommentSection = ({article, numberFormat}) =>{
  const [display, setDisplay] = React.useState(false);
  
  const changeDisplayMod = () =>{
    display ? setDisplay(false) : setDisplay(true);
  }

  return(
    <>
    <div className='btn-groupe'>
      <button onClick={changeDisplayMod}>{display ? commentOpenIcon : commentIcon} {numberFormat(article.comment.length)} comments</button>
      <button>{urlToRedditArticle} link to the article</button>
    </div>
    <br/>
    {display &&
    article.comment.map((comment) =>{
      return(
        <div>
          <p>Author: <span className='SubArticleAuthor'>{comment.author}</span></p>
          <p>{comment.contents}</p>
          <p>Date: {comment.date}</p>
        </div>
      );
    })
    }
    </>
  );
};

const Post = ({post}) =>{
  

  //Function who will format the number like 10.0K for 10 000 like and ect 
  const likeFormat = (value) =>{
    const number = value.toString();

    if(number.length > 3){
      for (let index = 0; index < number.length; index+=3){
        //Taking the 3 first number as a whole number
        let wholeNumber = number.slice(0, -index)
        //Taking the rest to round it and returning the first number as a decimal
        let rondDecimal = Math.round(Number.parseFloat(number[number.length-index] +'.' + number.slice(number.length-index + 1, number.length))).toString();
        //If in the process of rounding the number we add a 10 add +1 to the whole number
        if (rondDecimal > 9){
          wholeNumber = (Number.parseFloat(wholeNumber)+1).toString();
          rondDecimal = '0';
        };
        //Checking if the value of the number and returning the correct value 
        if(number.length - index < 4 ){
          if (index >= 12) {
            return `${wholeNumber}.${rondDecimal}Tri`
          } else if(index >= 9){
            return `${wholeNumber}.${rondDecimal}Bi`
          } else if (index >= 6) {
            return `${wholeNumber}.${rondDecimal}M`
          } else if (index >= 3){
            return `${wholeNumber}.${rondDecimal}K`;
          };
        };        
      };
    }else return number;
  };

  const timePosted = (value) =>{

  }

  return(
    <>
      {post.map((article) =>{
        return (
          <article className='Article'>
            <div className='ArticleLikes'>
              <div className='Arrow ArrowUp'>{arrowUpIcon}</div>
              <h4>{likeFormat(article.likeCount)}</h4>
              <div className='Arrow ArrowDown'>{arrowDownIcon}</div>
            </div>
            <div className='SubArticle'>
              <p>r/{article.redditPlace} posted by <span className='SubArticleAuthor'>u/{article.author}</span> date: {article.date}</p>
              <h1>{article.title}</h1>
              <img src={article.URLimage} alt={article.title} />
              <div>
                <CommentSection  article={article} numberFormat={likeFormat}/>   
              </div>
            </div>
          </article>
        )
      })}
    </>
  );
};

const FavCategorie = () =>{
  return(
    <aside>
    </aside>
  );
}

function App() {
  const [post, setPost] = React.useState(initialPostState);
  const [searchTerm, setSearchTerm] = React.useState('');
  

  return (
    <div className="App">
      <header className="App-header">
        <div className='App-compartiment'><h3>{redditLogo}Mini<span>Reddit</span></h3></div>
        <div className='App-compartiment'><SearchForm  /></div>
        <div className='App-compartiment'></div>
      </header>
      <div className="Body">
        <Post post={post} />
        <FavCategorie />
      </div>
    </div>
  );
}

export default App;