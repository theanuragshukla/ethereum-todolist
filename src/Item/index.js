import React, {useContext} from "react";
import {UserContext} from "../userContext";
import { TaskContractAddress } from '../config.js';
import {ethers} from 'ethers';
import TaskAbi from '../utils/TaskContract.json'
import './Item.css'

const Item = ({todo}) => {
	const {user, setTasks} = useContext(UserContext)

	const deleteTask = async() => {
		console.log(user)
		if(!user.connected)return
		try {
			const key = todo[0]
			const {ethereum} = window

			if(ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const TaskContract = new ethers.Contract(
					TaskContractAddress,
					TaskAbi.abi,
					signer
				)
				let deleteTaskTx = await TaskContract.deleteTask(key, true);
				console.log(deleteTaskTx)
				let allTasks = await TaskContract.getMyTasks();
				setTasks(allTasks);
			} else {
				console.log("Ethereum object doesn't exist");
			}

		} catch(error) {
			console.log(error);
		}
	}


	return (
		<>
		<div className="flex item">
		<div className="title">
	<h1>{todo[2]}</h1>
		</div>
		<div className="delete">
		<button onClick={deleteTask}>Delete</button>
		</div>
		
		</div>
	</>
	)
}

export default Item
