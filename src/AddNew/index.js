import React, {useContext, useState} from "react";
import './AddNew.css'

import { TaskContractAddress } from '../config.js';
import {ethers} from 'ethers';
import TaskAbi from '../utils/TaskContract.json'
import {UserContext} from "../userContext";

const setTempData = ({e, setTemp}) => {
	setTemp(e.target.value)
}
const addTask= async (e,temp, setTodos, user)=>{
	if(!user.connected) return
	e.preventDefault();

	let task = {
		'title': temp,
		'done': false
	};

	try {
		const {ethereum} = window

		if(ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const TaskContract = new ethers.Contract(
				TaskContractAddress,
				TaskAbi.abi,
				signer
			)

			const addTxnHash = await TaskContract.addTask(task.title, task.done)
				.then(response => {
					//setTodos((tasks)=>{
						//return [...tasks, task]
					//});
					console.log("Completed Task");
				})
				.catch(err => {
					console.log("Error occured while adding a new task");
				});
			console.log(addTxnHash)
		} else {
			console.log("Ethereum object doesn't exist!");
		}
	} catch(error) {
		console.log("Error submitting new Tweet", error);
	}

};

const AddNew =(props) => {
const {user, setUser} = useContext(UserContext)

	const [temp ,setTemp] = useState("")
	return (
		<>
		<div className="addNew">
		<div className="inp">
		<input placeholder="Enter new task" type="text" value={temp} onChange={e=>setTempData({e, setTemp})} onKeyDown={(e)=>{
			if(e.keyCode==13){
	if(!user.connected)
		alert("connect your wallet first")
			addTask(e, temp, props.setTodos, user)
			setTemp("")
			}
		}}/>
		</div>
		</div>
		</>
	)
}

export default AddNew
