import React from 'react';
import { Page } from './Page';
import { ArticleForm } from './ArticleForm';

export const PagesList = ({pages,setPages,fetchPages}) => {

	if (pages.length < 1) {
		return <>
		  <h3>No pages to display</h3>
		  <ArticleForm />
		</>
	  }
	  else if (pages.length === 1) {
		return <>
		{
			pages.map((page, idx) => {
				return <Page page={page} pages={pages} setPages={setPages} fetchPages={fetchPages} key={idx} />
			})
		}
	</>
	  }
	  else {

		return <>
		{
			pages.map((page, idx) => {
				return <Page page={page} pages={pages} setPages={setPages} fetchPages={fetchPages} key={idx} />
			})
		}
		<ArticleForm />
	</>
		
	  }
} 
