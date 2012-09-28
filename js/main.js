SummerCamp = function(options){
	var self = this;
	this.menuContainer = options.menuContainer || $("#menu");
	this.video='undefined';
	this.videoContainer = options.videoContainer || $("#video");
	this.slidesContainer = options.slidesContainer || $("#slides");
	this.codeEditor = options.codeContainer || $("#code");
	this.previewFrame = options.previewFrame || $("#preview");

	// Cambiar el popcorn player a youtube.
	Popcorn.player('youtube');

	// Llamadas asyncronas para cargar los archivos de configuracion.
	this.getAsync = function(url, type){
		var type = type || 'json';
		var response;
		$.ajax({
			url: url,
			dataType: type,
			async: false,
			success: function(data){
				response = data;
			}
		});
		return response;
	};
	
	// Helper para renderizar plantillas.
	this.render = function(template, element, options){
		template = self.getAsync(template, 'text');
		var html = _.template(template.toString(), {options: options});
		if(typeof(element) != 'undefined'){element.html(html)};
		return html;
	};

	// Iniciar Applicacion.
	this.start = function(){
		self.render('menu.html', self.menuContainer, self.menu);
		self.bindCourses();
	};

	// Cargar un objecto video.
	this.loadVideo = function(url){
		this.videoContainer.empty();
		self.video = Popcorn.youtube( this.videoContainer.get(0), url );
		return self.video;
	};

	// Bind Courses.
	this.bindCourses = function(){
		self.menuContainer.on('click', ".course", function(event){
			// Encuentra el curso.
			var el = $(event.currentTarget);
			var uid = el.data('uid');
			_.each(self.menu, function(menuItem){
				_.each(menuItem.courses, function(course){
					if(course.uid == uid){
						// Encontro el curso.
						var video = self.loadVideo(course.video);
						self.codeEditor.setValue("");
						// Configurar cues del code Editor.
						_.each(course.code, function(c){						
							video.code({
	       						start: c.timestamp,
		       					onStart: function( options ) {
		       						// Set el contenido del editor.
		       						var template = self.render(c.template)
		          					self.codeEditor.setValue(template);
		       					}
	     					});
						})
					}
				});
			});
		});	
	}

	this.updatePreview = function(){
	    var previewFrame = document.getElementById('preview');
	    var preview =  self.previewFrame.get(0).contentDocument ||  self.previewFrame.get(0).contentWindow.document;
	    preview.open();
	    preview.write(self.codeEditor.getValue());
	    preview.close();
	}

	// Fetch menu
	this.menu = this.getAsync('menu.json');
	// Crear editor de Codigo.
	self.codeEditor = CodeMirror(self.codeEditor.get(0), {
		value: "",
		mode: 'text/html',
		tabMode: 'indent',
		lineNumbers: true,
		onChange: function(){
			self.updatePreview();
		}
	});

	return {
		menu: this.menu,
		render: this.render,
		start: this.start,
		video: this.video,
		codeEditor: this.codeEditor,
		slideContainer: this.slidesContainer,
		previewFrame: this.previewFrame
	}
}
