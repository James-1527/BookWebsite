// Parallax effect for decorative books on the bookshelf.
// Each .book element may include a data-depth attribute (0.01 - 0.12) to adjust intensity.

;(function(){
	const books = Array.from(document.querySelectorAll('.bookshelf .book'));
	if(!books.length) return;

	// Limit update frequency for performance
	let raf = null;
	let pointer = { x: 0, y: 0 };

	function onPointerMove(e){
		const rect = document.documentElement.getBoundingClientRect();
		const x = (e.clientX !== undefined) ? e.clientX : (e.touches && e.touches[0].clientX) || 0;
		const y = (e.clientY !== undefined) ? e.clientY : (e.touches && e.touches[0].clientY) || 0;
		pointer.x = (x - rect.width / 2) / (rect.width / 2); // -1..1
		pointer.y = (y - (window.innerHeight - 110)) / 200; // relative to shelf area

		if(raf) cancelAnimationFrame(raf);
		raf = requestAnimationFrame(updateBooks);
	}

	function updateBooks(){
		books.forEach((book, i) => {
			const depth = parseFloat(book.dataset.depth) || 0.04;
			// horizontal and vertical tweak
			const tx = -pointer.x * 20 * depth; // pixels
			const ty = -pointer.y * 18 * depth;
			// small rotation based on index for variety
			const rot = -pointer.x * (6 * depth) + (i % 2 === 0 ? 0.6 : -0.6);
			book.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg)`;
		});
	}

	// gentle reset when leaving
	function onLeave(){
		books.forEach((book)=>{ book.style.transform = ''; });
	}

	window.addEventListener('mousemove', onPointerMove, { passive: true });
	window.addEventListener('touchmove', onPointerMove, { passive: true });
	window.addEventListener('mouseleave', onLeave);
	window.addEventListener('touchend', onLeave);
})();

