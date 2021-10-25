/**
 *
 */
function run() {
	const convas = document.getElementById('convas') as HTMLCanvasElement

	if (!convas) return

	const ctx = convas.getContext('2d')
	if (!ctx) return

	ctx.fillStyle = 'rgba(0,0,0,.02)'
}

run()
