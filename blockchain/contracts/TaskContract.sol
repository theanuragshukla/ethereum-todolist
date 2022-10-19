// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract TaskContract {

	event AddTask(address recipient, uint taskId);
	event DeleteTask(uint taskId, bool done);

	struct Task {
		uint id;
		address username;
		string title;
		bool done;
	}

	Task[] private tasks;

	mapping(uint256 => address) taskToOwner;

	function addTask(string memory title, bool done) external {
		uint taskId = tasks.length;
		tasks.push(Task(taskId, msg.sender, title, done));
		taskToOwner[taskId] = msg.sender;
		emit AddTask(msg.sender, taskId);
	}

	function getMyTasks() external view returns (Task[] memory) {
		Task[] memory temporary = new Task[](tasks.length);
		uint counter = 0;
		for(uint i=0; i<tasks.length; i++) {
			if(taskToOwner[i] == msg.sender && tasks[i].done == false) {
				temporary[counter++] = tasks[i];
			}
		}

		Task[] memory result = new Task[](counter);
		for(uint i=0; i<counter; i++) {
			result[i] = temporary[i];
		}
		return result;
	}

	function deleteTask(uint taskId, bool done) external {
		if(taskToOwner[taskId] == msg.sender) {
			tasks[taskId].done = done;
			emit DeleteTask(taskId, done);
		}
	}

}
