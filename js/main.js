SummerCamp = function(){
	var self = this;

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

	// Fetch menu
	this.menu = this.getAsync('menu.json');

	return {
		menu: this.menu,
		render: function(template, options){
			template = self.getAsync(template, 'text');
			return _.template(template.toString(), {menus: options});				
		}
	}
}
