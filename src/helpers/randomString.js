function randomString (qtd) {
	return Math.random().toString(36).substr(2, qtd)
}

export default randomString;