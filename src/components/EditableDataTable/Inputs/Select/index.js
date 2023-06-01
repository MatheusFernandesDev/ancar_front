import { Select } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function SelectInput({
	id,
	reference,
	tableData = [],
	setTableData,
	options,
	attrs = [],
	...rest
}) {
	const [state, setState] = useState(tableData.find(item => item.id == id)[reference])
	
	function changeState({ event, tableData, setTableData, reference }){
		const id = event.target.dataset.id
		tableData.find(item => item.id == id)[reference] = event.target.value
		setState(event.target.value)
		setTableData(tableData)
	}

	return (
		<Select 
			height="100%"
			width="100%"
			border="1px solid transparent"
			backgroundColor="transparent"
			_hover={{ border: "1px solid transparent" }}
			_focus={{ borderRadius: "0" }}
			//
			value={state} 
			onChange={(event) => changeState({ event, tableData, setTableData, reference })} 
			isDisabled={attrs.find(item => {
				return item === 'disabled' ? true : false
			})}
			{...rest} 
		>
			{options.map(element=> 
				<option value={element.id}>
					{element.name}
				</option>
			)}
		</Select>
	)
}
