import { useLocation } from 'react-router-dom';

export default function useQuery(){

	const {search} = useLocation()

	const params = new URLSearchParams(search)

	return Object.fromEntries(params) 

}