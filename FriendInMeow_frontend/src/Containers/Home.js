import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const Home = () => {

	const [cats, setCats] = useState([])
	const [isFetching, setIsFetching] = useState(false);

	const handleScroll = () => {
		if (
			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
			isFetching
		)
			return;
		setIsFetching(true);
	};

	const initialFetch = () => {
		let i = 0
		while (i < 2) {
			catFetch();
			i++;
		}
	}

	useEffect(() => {
		initialFetch()
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		if (!isFetching) return;
		fetchMoreCats();
	}, [isFetching]);

	const fetchMoreCats = () => {
		catFetch();
		setIsFetching(false);
	};

	const catFetch = () => {

		fetch('https://api.thecatapi.com/v1/images/search?limit=3', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': process.env.REACT_APP_tcaKey
			}
		})
			.then(res => res.json())
			.then(res => {
				res.forEach(cat => {
					setCats(cats => [...cats, cat])
				})
			})
	}

	const gridCat = (
		<div className="grid-cat">
			<img className="grid-cat-pic" />
		</div>
	)

	return (
		<div className="cat-grid">
			{cats.map((cat, index) => (
				<div className="grid-cat">
					<img className="grid-cat-pic" src={cat.url} />
				</div>
			))}
		</div>
	);
}

export default Home
