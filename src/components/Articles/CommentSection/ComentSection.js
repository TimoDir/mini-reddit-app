import * as React from "react";
import { commentOpenIcon, commentIcon, urlToRedditArticle, arrowUpIcon, arrowDownIcon } from "../../../ressources/icons/svgIcon";

export const CommentSection = ({article, numberFormat}) =>{
    const [display, setDisplay] = React.useState(false);
    
    const changeDisplayMod = () =>{
      display ? setDisplay(false) : setDisplay(true);
    }

    console.log(article)
    return(
      <>
      <div className='btn-groupe'>
        <button onClick={changeDisplayMod}>{display ? commentOpenIcon : commentIcon} {numberFormat(article.num_comments)} comments</button>
        <button>{urlToRedditArticle} link to the article</button>
      </div>
      <br/>
      {/*display && // It will probably become a recursive component
      article.comment.map((comment) =>{
        return(
          <div className='Comment'>
            <p className='ArticleInfo'>
              <a href={`https://www.reddit.com/user/${comment.author}/`} target="_blank" rel="noreferrer">{comment.author}</a> - 
                Date: {comment.date}
            </p>
            <div className='Comment'>
              <p>{comment.contents}</p>
              <div className='btn-groupe'>
                <button>{arrowUpIcon}</button>
                {numberFormat(comment.likeCount)}
                <button>{arrowDownIcon}</button>
                <button>{commentIcon} 0 answers</button>
              </div>
            </div>
          </div>
        );
      })
      */}
      </>
    );
  };