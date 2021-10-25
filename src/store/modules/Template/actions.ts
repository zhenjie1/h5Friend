import { ActionTree } from 'vuex'
import { ActionContext, RootState } from '../../type'
import { State } from './state'

type Context = ActionContext<'user'>

export type Actions = {
	testActions(context: Context, p: string): Promise<any>
}

const actions: ActionTree<State, RootState> = {
	testActions(): void {
		console.log('testActions')
	},
}

export default actions
