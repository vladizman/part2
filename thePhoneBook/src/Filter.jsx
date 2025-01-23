const Filter = ({searchTerm, handleSearchChange}) => {
    return(<>
     <div>
       filter showm with <input value={searchTerm} onChange={handleSearchChange}/>
      </div>
    </>)
}

export default Filter