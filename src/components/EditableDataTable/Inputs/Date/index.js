import moment from 'moment';
import React, {useState} from 'react';
import { Input } from '@chakra-ui/react';

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

	function changeState({event, tableData, reference, setTableData}){
		const val = moment(event.target.value).format('YYYY/MM/DD')
		const id = event.target.dataset.id
		tableData.find(item => item.id == id)[reference] = val
		setState(event.target.value)
		setTableData(tableData)
	}

	return (
		<Input
			height="100%"
			width="100%"
			border="1px solid transparent"
			backgroundColor="transparent"
			_hover={{ border: "1px solid transparent" }}
			_focus={{ borderRadius: "0" }}
			//
			type="date"
			value={state}
			onChange={(event) => changeState({ event, tableData, reference, setTableData })}
			isDisabled={attrs.find(item => {
				return item === 'disabled' ? true : false
			})}
			{...rest}
		/>
	)
}