import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		setData(() => getData());
	}, [events]);

	const getData = () => {
		const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS', 'Angular'];
		const data = genres.map((genre) => {
			const value = events.filter(({ summary }) =>
				summary.split(' ').includes(genre)
			).length;
			return { name: genre, value };
		});

		return data;
	};

	return (
		<ResponsiveContainer height={400} width={400}>
			<PieChart width={400} height={400}>
				<Pie
					data={data}
					cx={200}
					cy={200}
					labelLine={false}
					outerRadius={80}
					fill="#fca311"
					dataKey="value"
					label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
				></Pie>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default EventGenre;
