import React from 'react';
import apiURL from '../api';
import { UpdateForm } from './UpdateForm';

export const Page = ({page,pages,setPages,fetchPages,setMessage,tagPages}) => {

  async function singlePage(slug){
		try {
			const res = await fetch(`${apiURL}/wiki/${slug}`);
			const pagesData = await res.json();
			console.log("Found",[pagesData]);
      setMessage("");
			setPages([pagesData]);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

  async function deletePage(slug){
		try {
			await fetch(`http://localhost:3000/api/wiki/${slug}`, { method: 'DELETE' });
      fetchPages();
		} catch (err) {
      console.log("Error!")
		}
	}

  async function authorPages(id,name){
		try {
			const res = await fetch(`${apiURL}/users/${id}`);
			const authorData = await res.json();
			console.log(authorData);
      setMessage(`All pages by ${name}:`);
			setPages(authorData.pages);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

  if (pages.length === 1) {

    const createDate = new Date(page.createdAt);
    const displayDate = `${createDate.getDate()}/${createDate.getMonth()+1}/${createDate.getFullYear()}`;
    return <>
      <button onClick={() => deletePage(page.slug)}>Delete Article</button>
      <h3>{page.title}</h3>
      <p><b>Author: </b><span className="author" onClick={() => authorPages(page.authorId,page.author.name)}>{page.author.name}</span></p>
      <p><b>Published: </b>{displayDate}</p>
      <p><b>Tags: </b>{
        page.tags.map((tag,idx) => <span className="tag" onClick={() => tagPages(tag.name)} key={idx}>{tag.name} </span>)
      }</p>
      <p>{page.content}</p>
      <UpdateForm singlePage={singlePage} slug={page.slug} />
      <button onClick={() => fetchPages()}>Back to article list</button>
    </>
  }
  else {
    return <>
      <h3 onClick={() => singlePage(page.slug)}>{page.title}</h3>
    </>
  }

} 
	