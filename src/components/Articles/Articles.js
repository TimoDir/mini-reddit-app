import {Article} from "./Article/Article"


export const Articles = ({articles}) =>{

  const formatingTimePost = (created) =>{
    // the date of creation of the post is in epoch-second format so we take the one of today and soustrac from the one of the post
    const scdOfToday =new Date().getTime()/(1000);
    const timeSincePost = Math.round(scdOfToday - created);
    // using the documentation of the epoch format to define these number
    const minute = 60;
    const hour = minute*60;
    const day = hour*24;
    const week = day*7;
    const month = day*30.44;
    const year = day*365.24;
    // the logic render the time since post
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
    // Removing the begining to take the name of the website first and keeping the second element
    const websiteNameShorten = link.replace('https://','').replace('www.','').split('/').splice(0,2).join('/').split('?')[0]+'...'
    return websiteNameShorten;
  };

    //Function who will format the number like 10.0K for 10 000 like and ect 
  const numberFormat = (value) =>{
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

    const stringToJSX = (string) =>{
      return <div className="SelfText" dangerouslySetInnerHTML={{__html:string}} ></div>
    }

    return(
      <>
        {articles.map( article => <Article
        key={article.data.id}
        article={article} 
        stringToJSX={stringToJSX}
        numberFormat={numberFormat}
        foramtingLink={foramtingLink}
        formatingTimePost={formatingTimePost}
        />)}
      </>
    );
  };