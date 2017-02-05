/**
 * Created by rubz_johnson on 01/01/17.
 */
'use strict';
(function(){
	var onPlay = false;
	var chrono, s = parseInt($('#timer_seconds').text()), minute = parseInt($('#timer_minute').text());

	$('#circle').click(function(){
		$(this).toggleClass('circle-anim');

		// Switch timer TRUE/FALSE
		app.timerOnOff(onPlay, function(callback){
			onPlay = callback;
			if(onPlay){
				app.chronoStart(function(){
					app.chronoStatusText(true);
				});
				return;
			}
			if(minute > 99){
				app.chronoReset();
			}
			app.chronoStop(function(){
				app.chronoStatusText(false);
			});
		});

	});

	$('#timer_reset').click(function(){
		app.timerOnOff(onPlay, function(callback){
			onPlay = callback;
            app.chronoReset();
		});
	});
	$('#timer_save').click(function(evt){
		evt.preventDefault();
		$.ajax({
			url: '/tasks/save',
			type: 'POST',
			dataType: 'json',
			data: {
				minute: minute,
				second: s,
				title: encodeURI($('#title_tasks').val()),
				content: encodeURI($('#content_tasks').val())
			}
		})
		.done(function(callback){
			console.log(callback);
			if(callback){
				console.log('success');
				return;
			}
			console.log('error');
		})
	});

	var app = {
		chronoStart : function(callback){
			if(s == 0) {
				console.log('Lancement du chrono');
			} else {
				console.log('Reprise du chrono');
			}
			chrono = setInterval(function(){
				s++;
				app.chronoPrint();
			}, 1000);

			callback();
		},
		chronoStop : function(callback){
			console.log('Arret du chrono : '+ minute +':'+ s);
			clearInterval(chrono);
			if(callback != undefined) {
				callback();
			}
			this.chronoStatusText(false);
		},
		chronoReset : function(){
			s = 0;
			minute = 0;
			app.chronoPrint();
			app.chronoStatusText();
			console.log('Chrono RESET : '+ s);
			console.log('Chrono RESET(mn): '+ minute);
		},
		chronoPrint : function(){

			if( s >= 60) {
				minute = minute+1;
				s = 0;
			}
			if(minute < 10){
				$('#timer_minute').text('0'+minute);
			}
			else if(minute > 99){
				this.chronoStop(null);
			}
			else {
				$('#timer_minute').text(minute);
			}

			if ( s < 10)
			{
				$('#timer_seconds').text('0'+s);
			} else {
				$('#timer_seconds').text(s);
			}
		},
		chronoStatusText : function(status){
			if(status == undefined){
				$('#status p').text('');
				return
			}
			if(status) {
				$('#status p').text('En cours');
				return;
			}
			if(!status){
				$('#status p').text('En pause');
				return;
			}
			$('#status p').text('Fin du timer');

		},
		timerOnOff : function(status, callback){
			// Permet de changer le status du chrono suivant valeur d'origine
			//ex: if status = true => renvoi false
			return callback(!status);
		}
	}
})(window);