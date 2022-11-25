export const SearchForm = ({handleSearch, handleSubmit }) =>{

  return(
    <form className='SearchBar' onSubmit={handleSubmit}>
      <input type="search" placeholder="Search Reddit" onInput={handleSearch}/>
    </form>
  );
};