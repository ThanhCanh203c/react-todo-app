import React from "react";
import Todo from "./Todo";

export default function ToDoList({ jobList }) {
	return (
		<>
			{jobList.map((job) => {
				return <Todo key={job.id} job={job}></Todo>;
			})}
		</>
	);
}
