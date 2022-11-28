const foramtingLink = link =>{
    const websiteNameShorten = link.replace('https://www.','').split('/').splice(0,2).join('/')+'...'
    return websiteNameShorten;
}

/*const formatingDate = created => {
    if(created <= 1){
        return `${created} seconde`;
    } else if(1 < created < 60){
        return `${created} secondes`;
    } else if(59 < created < 120){
        return `${created/60} minute`;
    }else if(119 < created < 3600){
        return `${created/60} minutes`;
    } else if(3599 < created < 7200){
        return `${created/3600} hour`;
    } else if(7199 < created < 216000){
        return `${created/3600} hours`;
    } else if(215999 < created < 432000){
        return `${created/216000} day`;
    } else if(431999 < created < 1512000){
        return `${created/216000} days`;
    } else if(1511999 < created < 3024000){
        return `${created/1512000} week`;
    } else if(3023999 < created < 6804000){
        return `${created/1512000} weeks`;
    } else if(6803999 < created < 13608000){
        return `${created/6804000} month`;
    } else if(6803999 < created < 81648000){
        return `${created/6804000} months`;
    } else if(81647999 < created < 163296000){
        return `${created/81648000} year`;
    } else if(163296000 <= created){
        return `${created/81648000} years`;
    };
};*/

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


const hotTopic = '/hot.json?raw_json=1';
const topTopic = '/top.json?raw_json=1';
const homeTopic = '/best.json?raw_json=1';

const filterCHoice = [hotTopic, topTopic, homeTopic]

const checkIfAlreadyFilter = (filterWord) =>{
    if(filterWord){
    const filterWordChoice = filterCHoice.filter(Topic => Topic.includes(filterWord));
    console.log(filterWordChoice);
    } else console.log(homeTopic);
};


