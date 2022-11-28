import { hotTopics, topTopics, homeTopics} from "../../ressources/icons/svgIcon";


export const Categories = ({ handleFiltre } ) =>{
    
    const filterHandle = (e) =>{
        handleFiltre(e)
    }

    return(
        <div className="Categories" >
            <h2>Categories</h2>
            <div className="btn-Categories">
                <button onClick={() => filterHandle('hot')} type="button">{hotTopics}</button>
                <button onClick={() => filterHandle('top')} type="button">{topTopics}</button>
                <button onClick={() => filterHandle('homeReddit')} type="button">{homeTopics}</button>
            </div>
        </div>
      );
}