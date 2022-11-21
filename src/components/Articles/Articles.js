import { arrowUpIcon, arrowDownIcon } from "../../ressources/icons/svgIcon";
import { CommentSection } from "./CommentSection/ComentSection";


export const Articles = ({articles}) =>{

  const formatingTimePost = (created) =>{
    const scdOfToday =new Date().getTime()/(1000);
    const timeSincePost = Math.round(scdOfToday - created);

    const minute = 60;
    const hour = minute*60;
    const day = hour*24;
    const week = day*7;
    const month = day*30.44;
    const year = day*365.24;

    if(timeSincePost<minute){
        return (timeSincePost <=1) ? `${timeSincePost} second` : `${timeSincePost} seconds`;
    } else if(timeSincePost < hour){
        const timeInMinute = Math.floor(timeSincePost/minute);
        return (timeSincePost < minute*2) ? `${timeInMinute} minute` : `${timeInMinute} minutes`;
    } else if(timeSincePost < day){
        const timeInHour = Math.floor(timeSincePost/hour);
        return timeSincePost < hour*2 ? `${timeInHour} hour` : `${timeInHour} hours`;
    } else if(timeSincePost < week){
        const timeInDay = Math.floor(timeSincePost/day);
        return timeSincePost < day*2 ? `${timeInDay} day` : `${timeInDay} days`;
    } else if(timeSincePost < month){
        const timeInWeek = Math.floor(timeSincePost/week);
        return timeSincePost < week*2 ? `${timeInWeek} week` : `${timeInWeek} weeks`;
    } else if(timeSincePost < year){
        const timeInMonth = Math.floor(timeSincePost/month);
        return timeSincePost < month*2 ? `${timeInMonth} month` : `${timeInMonth} months`;
    } else if(year < timeSincePost){
        const timeInYear = Math.floor(timeSincePost/year);
        return timeSincePost < year*2 ? `${timeInYear} year` : `${timeInYear} years`;
    }
};

  const foramtingLink = link =>{
    const websiteNameShorten = link.replace('https://','').replace('www.','').split('/').splice(0,2).join('/')+'...'
    return websiteNameShorten;
  };

    //Function who will format the number like 10.0K for 10 000 like and ect 
  const likeFormat = (value) =>{
    const number = value.toString();
  
    if(number.length > 3){
      for (let index = 0; index < number.length; index+=3){
        //Taking the 3 first number as a whole number
        let wholeNumber = number.slice(0, -index)
        //Taking the first number as a decimal
        let rondDecimal = Math.floor(Number.parseFloat(number[number.length-index] +'.' + number.slice(number.length-index + 1, number.length))).toString();

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
                  <span title={`${new Date(article.data.created*1000)}`} > {formatingTimePost(article.data.created)} ago.</span></p>
                <h1>{article.data.title}</h1>
                {(article.data.post_hint === "hosted:video") ? 
                <video controls>
                  <source src={article.data.media.reddit_video.fallback_url} type="video/mp4"/>
                </video> :
                (article.data.post_hint === "image") ? 
                <img src={article.data.url} alt={article.data.title} /> : 
                (article.data.post_hint === "link" || article.data.post_hint === undefined) ? 
                <div>
                  <a href={article.data.url} target="_blank" rel="noreferrer">
                    {foramtingLink(article.data.url)}
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