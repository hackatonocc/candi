$("#tinderslide").jTinder({
    onDislike: function (item) {
        $('#status').html('vacante ignorada' + (item.index()+1));
    },
    onLike: function (item) {
        $('#status').html('Postulación exitosa vacante ' + (item.index()+1));
    },
	animationRevertSpeed: 200,
	animationSpeed: 400,
	threshold: 1,
	likeSelector: '.like',
	dislikeSelector: '.dislike'
});

$('.actions .like, .actions .dislike').click(function(e){
	e.preventDefault();
	$("#tinderslide").jTinder($(this).attr('class'));
});