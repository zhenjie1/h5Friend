export {}

declare global {
	namespace User {
		type position = 0 | 1 | 2 | 3

		type brandType = '0' | '1' | '2' | '3' | '4' | '5' | '8' | '9' | '10'

		type state = {
			token: string
		}
	}
}
