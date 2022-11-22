export const SearchForm = ({searchTerm, handleSearch}) =>{

  return(
    <form className='SearchBar' >
      <input type="search" placeholder="Search Reddit" onChange={handleSearch}/>
    </form>
  );
};