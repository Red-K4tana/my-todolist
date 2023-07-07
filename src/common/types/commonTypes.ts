//this type comes is empty and with 'resultCode: 1', when some problem
export type ResponseType<D = {}> = {
	resultCode: number
	messages: Array<string>
	fieldsErrors: Array<string>
	data: D
}