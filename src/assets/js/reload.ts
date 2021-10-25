// 阻止页面刷新
document.addEventListener('keydown', function (e: KeyboardEvent) {
	const reload = e.composed || e.altKey
	const forceReload = e.shiftKey && reload
	if (e.keyCode === 82 && (reload || forceReload)) {
		e.preventDefault()
	}
})
