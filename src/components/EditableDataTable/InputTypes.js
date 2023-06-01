import NumberInput from "./Inputs/Number"
import Double from "./Inputs/Double"
import Text from "./Inputs/Text"
import Select from "./Inputs/Select"
import Date from "./Inputs/Date"

const types = {
	double:({id, reference, tableData,defaultValue, setTableData, min, max, attrs}) => {
		return (
			<Double 
				data-id={id} 
				decimalSeparator=","
				thousandSeparator="."
				id={id} 
				min={min}
				max={max}
				defaultValue={defaultValue}
				reference={reference} 
				tableData={tableData} 
				setTableData={setTableData}
				attrs={attrs}
			/>
		)
	},
	text: ({id, reference, tableData, setTableData, attrs}) => {
		return (
			<Text 
				data-id={id} 
				id={id} 
				reference={reference} 
				tableData={tableData} 
				setTableData={setTableData}
				attrs={attrs}
			/>
		)
	},
	number: ({id, reference, tableData, setTableData, min, max, attrs}) => {
		return (
			<NumberInput 
				data-id={id} 
				id={id} 
				min={min}
				max={max}
				reference={reference} 
				tableData={tableData} 
				setTableData={setTableData}
				attrs={attrs}
			/>
		)
	},
	select: ({id, reference, tableData, setTableData, options, attrs}) => {
		return (
			<Select 
				data-id={id} 
				id={id} 
				reference={reference} 
				tableData={tableData} 
				setTableData={setTableData}
				options={options}
				attrs={attrs}
			/>)
	},
	date: ({id, reference, tableData, setTableData, attrs}) => {
		return (
			<Date
				data-id={id} 
				id={id} 
				reference={reference} 
				tableData={tableData} 
				setTableData={setTableData}
				attrs={attrs}
			/>
		)
	},
	custom: ({Component, id, reference, tableData, setTableData, attrs}) => {
		return (
			<Component 
				data-id={id}
				id={id} 
				reference={reference} 
				tableData={tableData} 
				setTableData={setTableData}
				attrs={attrs}
			/>
		)
	}
	
}

export default types;