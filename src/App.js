import { useState, useCallback, createContext, useEffect } from "react";
import TodoList from "./components/TodoList";
import Button from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import OpenIcon from "@atlaskit/icon/glyph/open";
import { v4 } from "uuid";

export const Context = createContext();

const STORAGE_JOB_LIST_KEY = "TODOAPP";

function App() {
	const [jobList, setJobList] = useState([]);
	const [jobInput, setJobInput] = useState("");

	useEffect(() => {
		const prevJobList = localStorage.getItem(STORAGE_JOB_LIST_KEY);
		if (prevJobList) setJobList(JSON.parse(prevJobList));
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_JOB_LIST_KEY, JSON.stringify(jobList));
	}, [jobList]);

	const handleJobInputChane = useCallback((e) => {
		setJobInput(e.target.value);
	}, []);

	const handleJobAdd = useCallback(() => {
		setJobList((prevState) => [
			{ id: v4(), name: jobInput, isCompleted: false },
			...prevState,
		]);
		setJobInput("");
	}, [jobInput]);

	const handleJobCompleted = useCallback((id) => {
		setJobList((prevState) => {
			return prevState.map((job) =>
				job.id === id ? { ...job, isCompleted: true } : job
			);
		});
	}, []);

	const handleSortJobList = useCallback(() => {
		let jobNotCompleted = [];
		let jobCompleted = [];

		jobList.forEach((job) => {
			if (job.isCompleted) jobCompleted.push(job);
			else jobNotCompleted.push(job);
		});

		setJobList([...jobNotCompleted, ...jobCompleted]);
	}, [jobList]);

	const handleClear = useCallback(() => {
		setJobList([]);
	}, []);

	return (
		<div className="App" style={{ padding: 24 }}>
			<h3
				style={{
					fontSize: 20,
					textAlign: "center",
					fontWeight: 400,
				}}
			>
				Danh sách việc cần làm
			</h3>
			<TextField
				value={jobInput}
				placeholder="Nhập việc cần làm..."
				elemAfterInput={
					<Button
						appearance="primary"
						isDisabled={!jobInput}
						onClick={handleJobAdd}
					>
						{" "}
						Thêm
					</Button>
				}
				onKeyDown={(e) => {
					if (e.key === "Enter") handleJobAdd();
				}}
				onChange={(e) => {
					handleJobInputChane(e);
				}}
			/>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Button
					shouldFitContainer
					isDisabled={jobList.length === 0 ? true : false}
					style={{
						margin: "10px",
						marginLeft: 0,
						marginBottom: 5
					}}
					iconAfter={<OpenIcon />}
					onClick={handleSortJobList}
				>
					Sort
				</Button>
				<Button
					shouldFitContainer
					isDisabled={jobList.length === 0 ? true : false}
					appearance="warning"
					iconAfter={<TrashIcon></TrashIcon>}
					style={{
						margin: "10px",
						marginRight: 0,
						marginBottom: 5
					}}
					onClick={handleClear}
				>
					Clear
				</Button>
			</div>

			<Context.Provider value={handleJobCompleted}>
				<TodoList jobList={jobList}></TodoList>
			</Context.Provider>

			<footer
				style={{
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
					textAlign: "center",
				}}
			>
				{" "}
				<p
					style={{
						margin: 0,
						marginBottom: "8px",
					}}
				>
					Nguyễn Thanh Cảnh
				</p>
			</footer>
		</div>
	);
}

export default App;
