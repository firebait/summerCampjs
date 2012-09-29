SummerCampJS
------------

Esta applicacion esta hecha para el Summer Camp 2 de Trisfera.

Para configurar la applicacion hay un archivo que se llama menu.json en el root de la applicacion.

Este achivo tiene el siguiente formato:

	[
		{
			"name": "Primer Modulo",
			"description": "lorem ipsum",
			"courses": [
				{
					"uid": "001",
					"name": "Primer Curso",
					"video": "http://www.youtube.com/watch?v=t6JgT0JR2tU",
					"slides": "course/module001/course001/slides.html",
					"timing": [
						{
							"timestamp": 5,
							"slide": 1,
							"code": "course/module001/course001/code001.html"
						},
						{
							"timestamp": 10,
							"slide": 2,
							"code": "course/module001/course001/code002.html"
						}
					]
				}
			]
		},
		{
			"name": "Segundo Modulo",
			"description": "lorem ipsum"
		}	
	]

Esto significa que hay dos modulos y el primero tiene un curso llamado "First Course".
El video sera un link a youtube y es requerido que cada curso tenga un "uid" unico para que los bindings funcionen. Ademas, se define el set de slides configurando un url al archivo html que contiene las mismas. Por ultimo se configura el sincronizacion con el video.

Sincronizacion
--------------

Para mantener sincronia entre el video, los slides y el codigo se configura el objeto "timing". Este objecto es un Array de objetos con los siguientes attributes:

	{
		"timestamp": 5,
		"slide": 1,
		"code": "course/module001/course001/code001.html"
	}

__Timestap:__ Tiempo en segundos en el que se debe ejecutar los eventos.
__Slide:__ El indice del slide que debe presentarse en ese momento.
__Code:__ URL que contiene el html del codigo a presentar.	

El menu de la applicacion puede ser modificado modificando la plantilla llamada "menu.html".
Esta plantilla solo require un link con las siguiente especificacion de la clase "course" y el data-uid con el uid del curso.

	<a href="javascript:void(0);" class="course" data-uid="001">First course</a>

Iniciar Applicacion
-------------------

Para inicial la applicacion se utiliza el siguente codigo.

	var summerCamp = new SummerCamp({
	    menuContainer: $("#menu"),
	    videoContainer: $("#video"), 
	    slidesContainer: $("#slides"), 
	    codeContainer: $("#code") 
	});
	summerCamp.start();


Se definen los contendores de los elementos y en el caso que no se definan los que se muestran en el snippet son los que estan por default.

Servidor: Rack
--------------

Escribi un servidor rack stand alone en ruby por si no quieren montar esto en apache para servir archivos y quieren testing. Para correrlo ponen lo siguiente en el terminal.

	rackup config.ru


Servidor: Node.JS
-----------------

Como configuración alternativa del servidor (por si no quieren utilizar Ruby) pueden ejecutar un servidor estático hecho en Node.JS. Para ello, deben asegurarse de tener las siguientes librerías instaladas (pueden ejecutar `npm install {libreria}`):

- http
- url
- path
- fs

Espero que les sirva, aunque todavia falta mucho por hacer.
