import React from 'react';

export const Search = ({search,setSearch,tagPages}) => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSearch("");
        tagPages(search);
    }

	return <>
        <form aria-label="search" onSubmit={handleSubmit} >
            <label>
                <input value={search} onChange={(event) => setSearch(event.target.value)} type="text" />
                <button type="submit">Search</button>
            </label>
        </form>
	</>
} 