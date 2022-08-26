import React, {useState} from 'react';

export const ArticleForm = (props) => {
    const [title,setTitle] = useState("");
	return <>
		<form className="step" aria-label="form" >
            <h4>Post an article:</h4>
            <input value={title} onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Article title" aria-label="title" />
            <button type="submit">Add Creature</button>
        </form>
	</>
} 

//onSubmit={handleSubmit}