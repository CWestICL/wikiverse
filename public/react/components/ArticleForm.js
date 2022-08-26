import React, {useState} from 'react';

export const ArticleForm = ({fetchPages}) => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [tags,setTags] = useState("");
    const [status,setStatus] = useState(false);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reqOptions = {
            method: "POST",
            headers: {
               "Content-Type": 'application/json'
            },
            body : JSON.stringify({
                title: title,
                content: content,
                tags: tags,
                status: status ? "open" : "closed",
                name: name,
                email: email
            })
        }
        console.log(reqOptions);
        try {
            await fetch("http://localhost:3000/api/wiki",reqOptions)
        }
        catch (err) {
            console.log("Error!");
            alert(err);
        }
        setTitle("");
        setContent("");
        setTags("");
        setStatus(false);
        setName("");
        setEmail("");
        fetchPages();
    }

	return <>
		<form className="step" aria-label="form" onSubmit={handleSubmit} >
            <h3>Post an article:</h3>
            <label>
                Article title:<br />
                <input value={title} onChange={(event) => setTitle(event.target.value)} type="text" aria-label="title" />
            </label>
            <label>
                Article content:<br />
                <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Type here..." aria-label="content" />
            </label>
            <label>
                Tags: (Optional, seperate by space)<br />
                <input value={tags} onChange={(event) => setTags(event.target.value)} type="text" aria-label="tags" />
            </label>
            <label>
                <input checked={status} onChange={() => setStatus(!status)} type="checkbox" name="checkbox" aria-label="status" />
                 Open
            </label>
            <h4>User info:</h4>
            <label>
                User name:
                <input value={name} onChange={(event) => setName(event.target.value)} type="text" aria-label="name" />
            </label>
            <label>
                Email:
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" aria-label="email" />
            </label>
            
            <button type="submit">Post article</button>
        </form>
	</>
}