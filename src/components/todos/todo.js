import React from 'react';
import Star from '../../assets/WLTaskCellStar.png';
import Banner from '../../assets/WLTaskCellRibbon.png';
import TrashCan from '../../assets/WLTrash.png';

const isSameDay = (date) => {
	const currDate = new Date();
	return (
		date.getFullYear() === currDate.getFullYear() &&
		date.getMonth() === currDate.getMonth() &&
		date.getDate() === currDate.getDate()
	);
};

const isYesterday = (d1) => (d1.setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0) >= 0 ? false : true);

export default function Todo({ todo: { id, text, date, done, starred }, toggle, toggleStar, toTrash }) {
	const dateObj = new Date(date);
	const formattedDate = dateObj.toLocaleString('en-US', {
		weekday: 'long',
		day: 'numeric',
		month: 'short'
	});
	const displayDate = isSameDay(dateObj) ? 'Today' : isYesterday(dateObj) ? 'Yesterday' : formattedDate;
	return (
		<li className={`rounded overflow-hidden shadow-lg items-center px-4 py-2 mb-1 flex todo`}>
			<div>
				<input
					id={`todo-${id}`}
					className="cursor-pointer"
					type="checkbox"
					defaultChecked={done}
					onClick={() => toggle(id)}
				/>
				<label className="align-middle" htmlFor={`todo-${id}`} />
			</div>
			<div className="pl-2 overflow-auto">
				<span className={`${done ? 'line-through completed-todo' : ''}`}>{text}</span>
				{done && <div className="text-xs">{displayDate} by Shaina</div>}
			</div>
			<div className="filler" />
			<img src={starred ? Banner : Star} className="cursor-pointer" onClick={() => toggleStar(id)} />
			<img src={TrashCan} className="cursor-pointer" onClick={() => toTrash(id)} />
		</li>
	);
}
