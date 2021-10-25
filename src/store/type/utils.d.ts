import { CommitOptions, DispatchOptions } from 'vuex'

export type ValueOf<T> = T[keyof T]
export type FlatIntersection<T> = { [Key in keyof T]: T[Key] } extends infer O ? O : never

export type PayloadAndOptionsTuple<
	Payload,
	Options extends CommitOptions | DispatchOptions
> = Payload extends undefined ? [undefined?, Options?] : [Payload, Options?]
