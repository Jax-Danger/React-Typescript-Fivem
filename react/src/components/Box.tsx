import { fetchNui, useNuiEvent } from "@utilities/utils";
import { useState } from "react";
import '@components/box.scss'

export const Box: React.FC = () => {
	const [visible, setVisible] = useState<boolean>(false); // change to true to see the UI.

	const [ServerName, setServerName] = useState<string>("")
	const [MaxPlayers, setMaxPlayers] = useState<number>(15)
	const [StartingMoney, setStartingMoney] = useState<number>(1000)
	const [isPvpEnabled, setIsPvpEnabled] = useState<string>('False')

	// useNuiEvent from @utilities/utils.ts to await NUI Messages easily.
	useNuiEvent('configData', (data: any) => {
		setServerName(data.ServerName)
		setMaxPlayers(data.MaxPlayers)
		setStartingMoney(data.StartingMoney)

		if (data.isPvpEnabled) {
			setIsPvpEnabled("True")
		} else {
			setIsPvpEnabled("False")
		}
		setVisible(true) // this sets the UI to visible.
	})


	const CloseUI = () => {
		fetchNui('closeBox')
			// using .then when callback from client is true.
			.then(() => {
				setVisible(false)
				console.log("box is now closed :)")
			})
			// using .catch to log errors if callback from client is not received or false.
			.catch((e) => { console.log('\'was unable to close the box :(') })
	}


	if (!visible) return // prevents UI from displaying when visible is false.
	return (
		<div className="container">
			<div className="box">
				<h1>Welcome to {ServerName}</h1>
				<h2>Max Players set to {MaxPlayers}</h2>
				<h3>Your Starting Money is {StartingMoney}</h3>
				<h3>PvP is {isPvpEnabled}</h3>
				<div className="close"
					onClick={CloseUI}>Close</div>
			</div>
		</div>
	)
}
