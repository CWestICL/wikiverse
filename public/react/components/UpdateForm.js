import React, {useState} from 'react';

//I didn't have enough time to figure out how the PUT requests work so this feature doesn't exactly work right

export const UpdateForm = ({singlePage,slug}) => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        let obj = {};
        if (title) {
            obj.title = title;
        }
        if (content) {
            obj.content = content;
        }
        const reqOptions = {
            method: "PUT",
            headers: {
               "Content-Type": 'application/json'
            },
            body : JSON.stringify(obj)
        }
        console.log(reqOptions);
        try {
            await fetch(`http://localhost:3000/api/wiki/${slug}/`,reqOptions);
        }
        catch (err) {
            console.log("Error!");
            alert(err);
        }
        setTitle("");
        setContent("");
        setTags("");
        setStatus(false);
        singlePage(slug);
    }

	return <>
		<form className="step" aria-label="form" onSubmit={handleSubmit} >
            <h3>Update article:</h3>
            <label>
                Article title:<br />
                <input value={title} onChange={(event) => setTitle(event.target.value)} type="text" aria-label="title" />
            </label>
            <label>
                Article content:<br />
                <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Type here..." aria-label="content" />
            </label>
            
            <button type="submit">Update article</button>
        </form>
	</>
} 

//onSubmit={handleSubmit}