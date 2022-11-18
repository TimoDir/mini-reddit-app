import { arrowUpIcon, arrowDownIcon } from "../../ressources/icons/svgIcon";
import { CommentSection } from "./CommentSection/ComentSection";

export const Articles = ({articles}) =>{
  

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

    return(
      <>
        {articles.map((article) =>{
          return (
            <article key={article.data.id} className='Article'>
              <div className='ArticleLikes'>
                <div className='Arrow ArrowUp'>{arrowUpIcon}</div>
                <h4>{likeFormat(article.data.ups)}</h4>
                <div className='Arrow ArrowDown'>{arrowDownIcon}</div>
              </div>
              <div className='SubArticle'>
                <p className='ArticleInfo'>
                  <a href={`https://www.reddit.com/r/${article.data.subreddit}/`} target="_blank" rel="noreferrer">r/{article.data.subreddit}</a> - 
                  posted by <span className='ArticleAuthor' ><a href={`https://www.reddit.com/user/${article.data.author}/`} target="_blank" rel="noreferrer">u/{article.data.author}</a></span> -  
                  date: {article.data.created}</p>
                <h1>{article.data.title}</h1>
                {(article.data.post_hint === "hosted:video") ? 
                <video controls>
                  <source src={article.data.media.reddit_video.fallback_url} type="video/mp4"/>
                </video> :
                (article.data.post_hint === "image") ? 
                <img src={article.data.url} alt={article.data.title} /> : 
                (article.data.post_hint === "link") ? 
                <div>
                  <a href={article.data.url} target="_blank" rel="noreferrer">
                    {article.data.url}
                  </a>
                </div>
                 : console.log('no hint')
                
                }
                
                <div>
                  <CommentSection  article={article.data} numberFormat={likeFormat}/>  
                </div>
              </div>
            </article>
          )
        })}
      </>
    );
  };