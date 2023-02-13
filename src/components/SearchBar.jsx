const SearchBar = ({ filter , placeholder }) => {
    
  return (
    <div className='search_container'>
        <img src="/Search.svg" alt="" className='search_image' />
        <input type="text" className='searchbar_input' onChange={(e) => filter(e)} placeholder={placeholder} />
    </div>
  )
};

export default SearchBar;