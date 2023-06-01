// import React, { useState } from 'react'

// import {Double} from './style';

// export default function DoubleInput({id, reference, tableData, setTableData, defaultValue=0, attrs=[], ...rest}) {

// 		const [state, setState] = useState(tableData.find(item => item.id == id)[reference])
		
// 		function changeState({event, floatValue, tableData, reference, setTableData}){
// 			const id = event.target.dataset.id
// 			tableData.find(item => item.id == id)[reference] = floatValue
// 			setState(floatValue)
// 			setTableData(tableData)
// 		}

// 	return (
// 		<Double 
// 			decimalSeparator=","
// 			thousandSeparator="."
// 			value={state}
// 			onChangeEvent={(event, maskedvalue, floatValue) => changeState({event, floatValue, tableData, reference, setTableData})}
// 			{...rest}
// 			disabled={attrs.find(item => {
// 				return item === 'disabled' ? true : false
// 			})}
// 		/>
// 	)
// }
