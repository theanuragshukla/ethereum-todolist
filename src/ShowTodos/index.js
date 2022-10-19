import React from "react";
import './ShowTodos.css'
import Item from "../Item";

const ShowTodos = ({todos}) => {
	return (
		<>
		<div className="main">
		{
			todos.map(todo=>{
				return	 <Item key={todo[0]._hex} todo={todo} ></Item>
			})
		}

		</div>
		</>
	)
}

export default ShowTodos
