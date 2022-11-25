import { hotTopics, topTopics, homeTopics} from "../../ressources/icons/svgIcon";


export const Categories = ({ handleFiltre } ) =>{

    return(
        <div className="Categories" >
            <h2>Categories</h2>
            <div className="btn-Categories">
                <button onClick={handleFiltre}>{hotTopics}</button>
                <button onClick={handleFiltre}>{topTopics}</button>
                <button onClick={handleFiltre}>{homeTopics}</button>
            </div>
        </div>
      );
}