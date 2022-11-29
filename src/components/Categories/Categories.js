import { hotTopics, topTopics, homeTopics} from "../../ressources/icons/svgIcon";
import * as React from "react";

const Subreddit = ['r/mildlyinteresting', "r/funny", "r/space", "r/worldnews", "r/Damnthatsinteresting", "r/technology", "r/tifu",
    "r/nottheonion", "r/Music", "r/AbsoluteUnits", "r/books", "r/wallstreetbets", "r/dataisbeautiful", "r/Cooking", "r/blursedimages",
    "r/woahdude", "r/marvelmemes", "r/cringepics", "r/Economics", "r/shittymoviedetails", "r/MovieDetails", "r/Whatcouldgowrong",
    "r/megalophobia", "r/Steam", "r/wholesomememes", "r/UkrainianConflict", "r/ThatsInsane", "r/assholedesign", "r/RoastMe", "r/sports"];

export const Categories = ({ handleFiltre, handleSubredditTerm } ) =>{
    /*const [selectedValue, setSelectedValue] = React.useState('');

    const handleSelectedValue = (e) =>{
        const value = e.target.value;
        if(value !== selectedValue){
            setSelectedValue(e.target.value)
        } else setSelectedValue("");
    };*/

    return(
        <div className="Categories" >
            <h2>Categories</h2>
            <div className="btn-Categories">
                <button value='new' onClick={e => {handleFiltre(e);}} type="button">
                        {hotTopics} New
                </button>
                <button value='top' onClick={e => {handleFiltre(e);}} type="button">
                    {topTopics} Top
                </button>
                <button value='homeReddit' onClick={e => {handleFiltre(e);}} type="button">
                    {homeTopics} Home
                </button>
            </div>
            <h3>Subreddit</h3>
            <div className="Subreddit-Categories">
                <ul>{Subreddit.sort().map(subreddit =>
                (<li>
                    <button key={subreddit} value={subreddit} onClick={e => {handleSubredditTerm(e);}}>
                        {subreddit}
                    </button>
                </li>)
                )}</ul>
            </div>
        </div>
      );
}