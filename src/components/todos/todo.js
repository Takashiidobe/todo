import React from 'react';

const isSameDay = (date) => {
	const currDate = new Date();
	return (
		date.getFullYear() === currDate.getFullYear() &&
		date.getMonth() === currDate.getMonth() &&
		date.getDate() === currDate.getDate()
	);
};

const isYesterday = (d1) => (d1.setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0) >= 0 ? false : true);

export default function Todo({ todo: { id, text, date, done }, toggle }) {
	const dateObj = new Date(date);
	const formattedDate = dateObj.toLocaleString('en-US', {
		weekday: 'long',
		day: 'numeric',
		month: 'short'
	});
	const displayDate = isSameDay(dateObj) ? 'Today' : isYesterday(dateObj) ? 'Yesterday' : formattedDate;
	return (
		<li
			className={`rounded overflow-hidden shadow-lg items-center px-4 py-2 mb-1 flex todo ${done
				? 'line-through completed-todo'
				: ''}`}
		>
			<div>
				<input
					className="form-checkbox h-6 w-6 text-indigo-600"
					type="checkbox"
					style={{ display: 'inline-block' }}
					defaultChecked={done}
					onClick={() => toggle(id)}
				/>
			</div>
			<div>
				<span>{text}: </span>
				<span>{displayDate}</span>
			</div>
		</li>
	);
}
