SummerCamp = function(options){
	var self = this;
	this.menuContainer = options.menuContainer || $("#menu");
	this.videoContainer = options.videoContainer || $("#video");
	this.slidesContainer = options.slidesContainer || $("#slides");
	this.codeContainer = options.codeContainer || $("#code");

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
	this.render = function(element, template, options){
		template = self.getAsync(template, 'text');
		var html = _.template(template.toString(), {options: options});
		element.html(html);
	};

	// Iniciar Applicacion.
	this.start = function(){
		self.render(self.menuContainer, 'menu.html', self.menu);
		self.bindCourses();
	};

	// Cargar un objecto video.
	this.loadVideo = function(url){
		return Popcorn.youtube( this.videoContainer.get(0), url );
	};

	// Bind Courses.
	this.bindCourses = function(){
		self.menuContainer.on('click', ".course", function(event){
			// Encuentra el curso.
			var el = $(event.currentTarget);
			var uid = el.data('uid');
			console.log(uid);
			_.each(self.menu, function(menuItem){
				_.each(menuItem.courses, function(course){
					console.log(course);
					if(course.uid == uid){
						console.log("course found");
						self.loadVideo(course.video);
					}
				});
			});
			var course = this.menu;
		});	
	}
	

	// Fetch menu
	this.menu = this.getAsync('menu.json');

	return {
		menu: this.menu,
		render: this.render,
		start: this.start,
		videoContainer: this.videoContainer,
		slideContainer: this.slidesContainer,
		codeContainer: this.codeContainer
	}
}
