//DEFINO UNA CONSTANTE PARA INICIALIZAR MUURI

const grid = new Muuri('.grid', {
	layout: {
		rounding: false // va en False para trabajar con dimensiones exactas, así manejo las medidas de los elementos del grid como porcentajes desde CSS.
	}
});

window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('imagenes-cargadas');

	// AGREGO LISTENER PARA FILTRAR POR CATEGORÍA (por cada enlace)
	const enlaces = document.querySelectorAll('#categorias a'); //accedo a cada enlace del id "categorías"
	enlaces.forEach((elemento) => { //ahora itero cada elemento <a>.
		elemento.addEventListener('click', (evento) => {
			evento.preventDefault();
			enlaces.forEach((enlace) => enlace.classList.remove('activo')); // elimino la class "activo" para los enlaces que no están clickeados.
			evento.target.classList.add('activo'); // luego encuentro el elemento clickeado y le asigno el estilo que viene de CSS, para que quede marcado en negro .

			const categoria = evento.target.innerHTML.toLowerCase(); //por úlitmo obtengo del evento click el encale clickeado para filtrarlo por el atributo "categoría".
			categoria === 'todas' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`); // IF "categoría" es estrictamente igual a "todas" entonces filtrar todas...ELSE filtrar por cada atributo.
		});
	});


	// AGREGO LISTENER PARA LA BARRA DE BÚSQUEDA (por etiquetas)
	document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
		grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
	});


	// AGREGO LISTENER PARA EL EFECTO MODAL .
	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const boton = elemento.parentNode.parentNode.dataset.boton;

			overlay.classList.add('activo');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .boton').innerHTML = boton;
		});
	});


	// LISTENER PARA CERRAR EL MODAL DESDE EL BOTÓN.
	document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
		overlay.classList.remove('activo');
	});


	// LISTENER PARA CERRAR EL MODAL CLICKEANDO FUERA.
	overlay.addEventListener('click', (evento) => {
		evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
	});


	//LISTENER Y LOCAL STORAGE PARA MODO OSCURO
	const btnSwitch = document.querySelector('#switch');

	btnSwitch.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	btnSwitch.classList.toggle('active');


	// Guard0 el modo en localstorage.
	if(document.body.classList.contains('dark')){
		localStorage.setItem('dark-mode', 'true');
	} else {
		localStorage.setItem('dark-mode', 'false');
	}
	});


	// Obtengo el modo actual.
	if(localStorage.getItem('dark-mode') === 'true'){
		document.body.classList.add('dark');
		btnSwitch.classList.add('active');
	} else {
		document.body.classList.remove('dark');
		btnSwitch.classList.remove('active');
	}
});


	//ANIMACIONES CON JQUERY

$(document).ready(function(){  //HOVER BOTÓN COMPRAR
	$(".btn-success").hover(function(){
		$(this).css("background-color","green");
	}, function(){
		$(this).css("background-color","transparent");
	},

	$(".imgGrid").hover(function(){  //HOVER IMÁGENES GRID
		$(this).css("opacity","0.85");
	}, function(){
		$(this).css("opacity", "1");
	}));
});

	





