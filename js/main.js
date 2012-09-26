SummerCamp = function(){

	var menu = [];
	// Fetch menu.
	$.getJSON('/menu.json', [], function(data){
			menu = data.responseText;
			console.log(menu);
		}
	);	

	return {
		menu: menu
	}
}
