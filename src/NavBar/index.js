import React from "react";
import './NavBar.css'
import {ethers} from 'ethers'
import {UserContext} from '../userContext'
import { useEffect, useState, useCallback, useContext } from "react";
const NavBar =  () => {
	let [accountChanged, setAccChange] = useState(true)
	const [currentAccount, setCurrentAccount] = useState("");
	const [correctNetwork, setCorrectNetwork] = useState(false);
	const {user, setUser} = useContext(UserContext)
	const connectWallet = async () => {
		try {
			const { ethereum } = window

			if (!ethereum) {
				console.log('Metamask not detected')
				return
			}
			let chainId = await ethereum.request({ method: 'eth_chainId'})
			console.log('Connected to chain:' + chainId)

			const goerliChainId = '0x5'

			if (chainId !== goerliChainId) {
				alert('You are not connected to the goerli Testnet!')
				return
			} else {
				setCorrectNetwork(true);
			}

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

			console.log('Found account', accounts[0])
			setUser({
				connected:true,
				address:accounts[0]
			})

			setCurrentAccount(accounts[0])
		} catch (error) {
			setUser({
				connected:false,
			})

			console.log('Error connecting to metamask', error)
		}
	}  

	useEffect(() => {
		window.ethereum.on('accountsChanged', function (accounts) {
			setAccChange(prev=>{
				return !prev
			})
		})
	}, []);

	const getAccount = useCallback(async () => {
		const accounts = await window.ethereum.request({method: 'eth_accounts'});       
		if (accounts.length) {
			setUser({
				connected:true,
				address:accounts[0]
			})
			setCurrentAccount(accounts[0])
		} else {
			setUser({
				connected:false,
				address:null
			})
			setCurrentAccount("wallet not connected")
		}
	}, []) 

	useEffect(()=>{
		getAccount()
	}, [accountChanged])

	const disconnectwallet = () => {

	}

	return (
		<>
		<div className="flex navMain">
		<div className="flex logo">
		<h2>Todo_list</h2>
		</div>
		<div className="flex account">
		<div className="flex connect">
		<button onClick={user.connected ? ()=>{} :connectWallet}>{user.connected ? `${user.address.toString().substring(0,5)}...${user.address.toString().substring(38, 42)}` : "Connect"}</button>
		</div>
		</div>
		</div>
		</>
	)
}

export default NavBar
