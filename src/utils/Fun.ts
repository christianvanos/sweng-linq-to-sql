export type Fun<a, b> = {
	(_:a):b,
	then:<c>(g:Fun<b, c>) => Fun<a, c>
}

export const Fun = <a, b>(f:(_:a) => b) : Fun<a, b> => {
	const fun = f as Fun<a, b>
	fun.then = function<c>(this:Fun<a, b>, g:Fun<b, c>) : Fun<a, c> {
		return Fun(v => g(this(v)));
	}
	return fun
}
