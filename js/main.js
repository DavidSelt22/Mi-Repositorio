var posicion = 0;
var count = 0;

$(document).ready(function(){
	$(".foto").click(ShowPhoto);
	$("#visor-close").click(ClosePhoto);
	$("#box-arrow-left").click(FotoArrowLeft);
	$("#box-arrow-right").click(FotoArrowRight);
	count = $("#galeria-container").data('count') - 1;

	$('.menu a').click(function(){ SmoothScroll($($(this).attr('href'))) });

	$("#gifLoading").hide();
	GifLoading();
});

function ChangePhoto() {
	var foto = "#galeria-container .foto:eq("+posicion+")";
	var imagen = $(foto).data('src');
	GetImage(imagen);
}

function ClosePhoto() {
	$("#visor-fotos").css({'display':'none'});
}

function FotoArrowLeft() {
	if (posicion == 0) {
		posicion = count;
	}
	else {
		posicion -= 1;
	}
	ChangePhoto();
}

function FotoArrowRight() {
	if (posicion == count) {
		posicion = 0;
	}
	else {
		posicion += 1;
	}
	ChangePhoto();
}

function GetImage(photoUrl) {
	$("#gifLoading").show();
	var img = new Image();
	$(img).attr({ src: photoUrl });

	if (img.complete || img.readyState === 4) {
		$("#visor-foto").attr('src', photoUrl);
		$("#gifLoading").hide();
	}
	else{
		$(img).load(function (response, status, xhr) {
			if(status == 'error'){
				alert("Hubo un error al obtener la imagen. Intente nuevamente.");
			}
			else{
				$("#visor-foto").attr('src', photoUrl);
				$("#gifLoading").hide();
			}
		});
	}
}

function GifLoading() {
	var opts = {
	  lines: 13 // The number of lines to draw
	, length: 28 // The length of each line
	, width: 14 // The line thickness
	, radius: 42 // The radius of the inner circle
	, scale: 1 // Scales overall size of the spinner
	, corners: 1 // Corner roundness (0..1)
	, color: '#000' // #rgb or #rrggbb or array of colors
	, opacity: 0.25 // Opacity of the lines
	, rotate: 0 // The rotation offset
	, direction: 1 // 1: clockwise, -1: counterclockwise
	, speed: 1 // Rounds per second
	, trail: 60 // Afterglow percentage
	, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
	, zIndex: 2e9 // The z-index (defaults to 2000000000)
	, className: 'spinner' // The CSS class to assign to the spinner
	, top: '50%' // Top position relative to parent
	, left: '50%' // Left position relative to parent
	, shadow: false // Whether to render a shadow
	, hwaccel: false // Whether to use hardware acceleration
	, position: 'absolute' // Element positioning
	}
	var target = document.getElementById('gifLoading');
	var spinner = new Spinner(opts).spin(target);
}

function ShowPhoto() {
	var imagen = $(this).data('src');
	posicion = $(this).index();
	$("#visor-fotos").css({'display':'flex'});
	/*$("#visor-foto").attr('src', imagen);*/
	GetImage(imagen);
}

function SmoothScroll(target){
	if (target.length) {
		$('html, body').animate({ scrollTop: target.offset().top }, 1000);
		return false;
	}
}