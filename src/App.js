import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem("items")) || []
	);
	const [itemText, setItemText] = useState("");

	function handleChange(e) {
		setItemText(e.target.value);
	}

	function handleSubmit(e) {
		const time = new Date().getTime().toString();
		const item = { id: time, text: itemText };
		if (itemText !== "") {
			setTodos((prev) => [...prev, item]);
			setItemText("");
		} else alert("Please enter a value!");
	}

	function handleKeyPress(e) {
		if (e.key === "Enter") handleSubmit();
	}

	function handleDelete(item) {
		const newItems = todos.filter((thisItem) => thisItem.id !== item.id);
		setTodos(newItems);
	}

	useEffect(() => {
		localStorage.setItem("items", JSON.stringify(todos));
		console.log(todos);
	}, [todos]);

	return (
		<>
			<h1 className="heading">What's your plan today ?</h1>
			<div className="input-field-container">
				<div className="input-field">
					<input
						autoFocus
						autocomplete="off"
						type="text"
						name="todo"
						value={itemText}
						onChange={handleChange}
						onKeyPress={handleKeyPress}
					/>
				</div>

				<button className="add-button" type="submit" onClick={handleSubmit}>
					Add todo
				</button>
			</div>

			<section className="todos-section">
				{todos.map((item) => {
					return (
						<div key={item.id} className="todo-container">
							<p className="item-text">{item.text}</p>
							<button
								className="remove-button"
								onClick={() => handleDelete(item)}
							>
								Remove
							</button>
						</div>
					);
				})}
			</section>
		</>
	);
}

export default App;
