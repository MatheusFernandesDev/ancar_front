import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function TextInput({
	id, 
	event, 
	tableData, 
	reference, 
	setTableData, 
	attrs = [], 
	...rest
}) {
	const [state, setState] = useState("")

	function changeState({ event, tableData, reference, setTableData }){
		const id = event.target.dataset.id
		tableData.find(item => item.id == id)[reference] = event.target.value
		setState(event.target.value)
		setTableData(tableData)
	}

	return (
		<Input
			type="text"
			height="100%"
			width="100%"
			border="1px solid transparent"
			backgroundColor="transparent"
			_hover={{ border: "1px solid transparent" }}
			_focus={{ borderRadius: "0" }}
			// 
			value={state}
			onChange={(event) => changeState({ event, tableData, reference, setTableData })}
			isDisabled={attrs.find(item => {
				return item === 'disabled' ? true : false
			})}
			{...rest}
		/>
	)
}
