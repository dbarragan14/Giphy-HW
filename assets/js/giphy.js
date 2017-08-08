var carName = ['honda', 'mitsubishi','porsche', 'subaru', 'toyota', 'nissan', 'saleen','chevy','ford'];


var pausedGif; 
 
 var animatedGif; 
 
 var stillGif;


var currentGif;
 
 






createButtons();
function createButtons(){
	$('#CARBUTTON').empty();
	for(var i = 0; i < carName.length; i++){
		var carButton = $('<button>').text(carName[i]).addClass('carButton').attr({'data-name': carName[i]});
		$('#CARBUTTON').append(carButton);
	}
	$('.carButton').on('click', function(){
		$('.display').empty();

		var car = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=cars+" + car + "&limit=10&api_key=ac884c22c56d480cb3d925e4da804e4f";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){

			currentGif = giphy.data;
			$.each(currentGif, function(index,value){

				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var gifrating = value.rating;
				if(gifrating == ''){
					gifrating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+gifrating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused',
				pausedGif).attr('src', pausedGif).addClass('playOnHover'); 
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}
$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $('#addCar').on('click', function(){
	var freshCar = $('#newCar').val().trim();
	carName.push(freshCar);
	createButtons();
	return false;
});
