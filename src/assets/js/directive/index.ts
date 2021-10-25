import { App } from 'vue'
import directiveSize from './viewSize'
import keyword from './keyword'
import loadMore from './loadMore'

const initGlobalDirective = function init(app: App<Element>): void {
	app.directive('size', directiveSize())
	app.directive('keyword', keyword())
	app.directive('loadmore', loadMore())
}
export default initGlobalDirective
