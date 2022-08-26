import React from 'react';
import apiURL from '../api';

export const Page = ({page,pages,setPages,fetchPages}) => {

  async function singlePage(slug){
		try {
			const res = await fetch(`${apiURL}/wiki/${slug}`);
			const pagesData = await res.json();
			console.log(pagesData);
			setPages([pagesData]);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

  if (pages.length === 1) {

    const createDate = new Date(page.createdAt);
    const displayDate = `${createDate.getDate()}/${createDate.getMonth()+1}/${createDate.getFullYear()}`;
    return <>
      <h3>{page.title}</h3>
      <p><b>Author: </b>{page.author.name}</p>
      <p><b>Published: </b>{displayDate}</p>
      <p><b>Tags: </b>{
        page.tags.map((tag) => <span>{tag.name} </span>)
      }</p>
      <p>{page.content}</p>
      <button onClick={() => fetchPages()}>Back to article list</button>
    </>
  }
  else {
    return <>
      <h3 onClick={() => singlePage(page.slug)}>{page.title}</h3>
    </>
  }

} 
	