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
					"name": "First course",
					"video": "http://www.youtube.com/watch?v=JRfuAukYTKg"
				}
			]
		},
		{
			"name": "Segundo Modulo",
			"description": "lorem ipsum"
		},
		{
			"name": "Tercer Modulo",
			"description": "lorem ipsum"
		}		
	]

Esto significa que hay tres modulos y el primero tiene un curso llamado "First Course".
El video sera un link a youtube y es requerido que cada curso tenga un "uid" unico para que los bindings funcionen.

El menu de la applicacion puede ser modificado modificando la plantilla llamada "menu.html".
Esta plantilla solo require un link con las siguiente especificacion de la clase "course" y el data-uid con el uid del curso.

	<a href="javascript:void(0);" class="course" data-uid="001">First course</a>



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
