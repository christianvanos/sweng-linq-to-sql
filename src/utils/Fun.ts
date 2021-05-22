type Fun<a, b> = {
    f: (i:a) => b,
    then: <c>(g:Fun<b, c>) => Fun<a, c>,
}

const then = function<a, b, c>(f:Fun<a, b>, g:Fun<b, c>): Fun<a, c> {
	return Fun<a, c>(a => g.f(f.f(a)));
}

const Fun = function<a, b>(f: (i:a) => b): Fun<a, b> {
	return {
		f:f,
		then: function<c>(this:Fun<a, b>, g:Fun<b, c>): Fun<a, c> {
			return then(this, g);
		}
	}
}

export default Fun;
