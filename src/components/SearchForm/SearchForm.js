export const SearchForm = ({searchTerm, setSearchTerm}) =>{
  const changeTerm = (e) =>{
    setSearchTerm(e.target.value);
    console.log(searchTerm)
  };

  return(
    <form className='SearchBar'>
      <input type="search" placeholder="Search Reddit" onSubmit={changeTerm} />
    </form>
  );
};