import React, {useState} from 'react';
import apiURL from '../api';
import { Page } from './Page';
import { ArticleForm } from './ArticleForm';
import { Search } from './Search';

export const PagesList = ({pages,setPages,fetchPages,message,setMessage}) => {
	const [search,setSearch] = useState("");

	async function tagPages(tag){
		try {
			const res = await fetch(`${apiURL}/wiki/search?search=${tag}`);
			const tagData = await res.json();
			console.log("Found:",tagData);
			if (tagData.length !== 1) {
				setMessage(`All pages with tag ${tag}:`);
				setPages(tagData);
			}
      		else {
				const slug = tagData[0].slug;
				console.log(slug);
				const singleRes = await fetch(`${apiURL}/wiki/${slug}`);
				const singleData = await singleRes.json();
				console.log("Found",[singleData]);
				setMessage("");
				setPages([singleData]);
			}
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	if (pages.length < 1) {
		return <>
			<Search search={search} setSearch={setSearch} tagPages={tagPages}/>
			<h2>{message}</h2>
			<h3>No articles found</h3>
			<ArticleForm />
		</>
	  }
	  else if (pages.length === 1) {
		return <>
		{
			pages.map((page, idx) => {
				return <Page page={page} pages={pages} setPages={setPages} fetchPages={fetchPages} setMessage={setMessage} tagPages={tagPages} key={idx} />
			})
		}
	</>
	  }
	  else {

		return <>
			<Search search={search} setSearch={setSearch} tagPages={tagPages}/>
			<h2>{message}</h2>
			{
				pages.map((page, idx) => {
					return <Page page={page} pages={pages} setPages={setPages} fetchPages={fetchPages} setMessage={setMessage} key={idx} />
				})
			}
			<ArticleForm fetchPages={fetchPages} />
		</>
		
	  }
} 
