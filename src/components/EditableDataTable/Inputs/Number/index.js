import InputNumber from '@/components/InputNumber';
import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function Number({ 
	id,
	reference,
	tableData = [],
	setTableData,
	min,
	max,
	attrs = [],
	...rest
}) {

	const [state, setState] = useState(tableData.find(item => item.id == id)[reference])
	
	function changeState({ event, tableData, setTableData, reference, min, max }){
		const input = document.getElementById(id);
		const inputId = input.id
		tableData.find(item => item.id == inputId)[reference] = parseInt(event.target.value, 10)
		setTableData(tableData)

		if(min && (event.target.value, 10) > min ){
			setState(parseInt(event.target.value, 10))
		}
		if(max && (event.target.value, 10) < max){
			setState(parseInt(event.target.value, 10))
		}
		if(!!!min && !!!max){
			setState(parseInt(event.target.value, 10))
		}
	}

	return (
		<Input
			type="number"
			id={id}
			key={id}
			height="100%"
			width="100%"
			border="1px solid transparent"
			backgroundColor="transparent"
			_hover={{ border: "1px solid transparent" }}
			_focus={{ borderRadius: "0" }}
			//
			value={state}
			min={min && min}
			max={max && max}
			onChange={(event) => changeState({event, tableData, setTableData, reference, min, max})} 
			isDisabled={attrs.find(item => {
				return item === 'disabled' ? true : false
			})}
			{...rest}
		/>
	)
}
