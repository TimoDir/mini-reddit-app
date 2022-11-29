import { arrowUpIcon, arrowDownIcon, commentIcon, urlToLink} from "../../../ressources/icons/svgIcon";
import * as React from "react";
import { urlSubIconReducer } from "./ArticleReducer";
import axios from "axios";

export const Article = ({article, numberFormat, formatingTimePost, foramtingLink, stringToJSX}) =>{
  const [urlSubIcon, dispatchURLSubIcon] =  React.useReducer(
    urlSubIconReducer,
    {data:[] , isLoading:false, isError:false}
  );

    const getSubredditIconURL =  React.useCallback( async() =>{
      dispatchURLSubIcon({type:'LoadingIcon'})

      try {
        const brutData = await axios.get(`https://www.reddit.com/${article.data.subreddit_name_prefixed}/about.json`);
        const subredditIconsURL = brutData.data.data.icon_img !== "" ?  brutData.data.data.icon_img : brutData.data.data.community_icon;
        const basicURLSubIcon = subredditIconsURL.split('?')[0];
        //console.log([subredditIconsURL, 'does it work'])
        dispatchURLSubIcon({
          type: 'GetIcon',
          payload: basicURLSubIcon,
        })
      } catch {
        dispatchURLSubIcon({type:'ErrorFetching'})
      }
    }, [article])

    React.useEffect(()=>{
      getSubredditIconURL();
    }, [getSubredditIconURL])

    
    return (
      <article  className='Article'>
        <div className='ArticleLikes'>
          <div className='Arrow ArrowUp'>{arrowUpIcon}</div>
          <h4>{numberFormat(article.data.ups)}</h4>
          <div className='Arrow ArrowDown'>{arrowDownIcon}</div>
        </div>
        <div className='SubArticle'>
          <p className='ArticleInfo ArticleInfoLink'>
            <a href={`https://www.reddit.com/r/${article.data.subreddit}/`} target="_blank" rel="noreferrer">
              {urlSubIcon !== "" ? <img src={urlSubIcon.data} alt=''/> : ""} r/{article.data.subreddit}
            </a>&nbsp; - &nbsp;
            posted by&nbsp;<span className='ArticleAuthor' ><a href={`https://www.reddit.com/user/${article.data.author}/`} target="_blank" rel="noreferrer"> u/{article.data.author}</a></span>&nbsp;
            - &nbsp;<span title={`${new Date(article.data.created*1000)}`} >{formatingTimePost(article.data.created)} ago.</span></p>
          <h1>{article.data.title}</h1>
          <div className="ArticleContent">
          {
          (article.data.post_hint === "hosted:video") ? 
          <video controls muted>
            <source src={article.data.secure_media.reddit_video.fallback_url} type="video/mp4"/>
          </video> :
          (article.data.post_hint === "rich:video") ? 
          stringToJSX(article.data.secure_media.oembed.html) :
          (article.data.crosspost_parent_list !== undefined) ?
          <video controls muted>
            <source src={article.data.crosspost_parent_list[0].secure_media.reddit_video.fallback_url} type="video/mp4"/>
          </video> :
          (article.data.post_hint === "image") ? 
          <img src={article.data.url} alt={article.data.title} loading="lazy" /> : 
          (article.data.post_hint === "link" || article.data.selftext_html === null) ? 
          <div>
            <span>
              <a href={article.data.url} target="_blank" rel="noreferrer">
                {foramtingLink(article.data.url)}{urlToLink}
              </a>
            </span>
          </div>
           : (article.data.selftext_html !== null) ? 
           stringToJSX(article.data.selftext_html) :console.log('no hint')
          }
          </div>
          <div className='btn-groupe'>
            <button><a className="ArticleInfoLink" href={`https://www.reddit.com${article.data.permalink}`} target="_blank" rel="noreferrer">{commentIcon}&nbsp;{numberFormat(article.data.num_comments)} comments</a></button>
          </div>
        </div>
      </article>
    )
}