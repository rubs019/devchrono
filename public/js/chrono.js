/**
 * Created by rubz_johnson on 01/01/17.
 */
(function(){
	var onPlay = false;
	var chrono, i = 0, minute = 0;

	$('#circle').click(function(){
		$(this).removeClass('circle-anim').addClass('circle-anim');
		// Switch timer TRUE/FALSE
		app.checkTimer(onPlay, function(callback){
			onPlay = callback;
			if(onPlay){
				app.chronoStart(function(){
					app.chronoStatus(true);
				});
				return;
			}
			if(minute > 99){
				app.chronoReset();
			}
			app.chronoStop(function(){
				app.chronoStatus(false);
			});
		});

	});

	$('#timer_reset').click(function(){
		app.chronoReset();
	});
	$('#timer_save').click(function(evt){
		evt.preventDefault();
		$.ajax({
			url: '/save',
			type: 'POST',
			dataType: 'json',
			data: {
				minute: minute,
				second: i,
				title: $('#title_tasks').val(),
				content: $('#content_tasks').val()
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
			if(i == 0) {
				console.log('Lancement du chrono');
			} else {
				console.log('Reprise du chrono');
			}
			chrono = setInterval(function(){
				i++;
				app.chronoPrint();
			}, 1000);

			callback();
		},
		chronoStop : function(callback){
			console.log('Arret du chrono : '+ minute +':'+ i);
			clearInterval(chrono);
			if(callback != undefined) {
				callback();
			}
			this.chronoStatus(false);
		},
		chronoReset : function(){
			i = 0;
			minute = 0;
			app.chronoPrint();
			app.chronoStatus();
			console.log('Chrono RESET : '+ i);
			console.log('Chrono RESET(mn): '+ minute);
		},
		chronoPrint : function(){

			if( i >= 60) {
				minute = minute+1;
				i = 0;
			}
			if(minute <= 10){
				$('#timer_minute').text('0'+minute);
			} else if(minute > 99){
				this.chronoStop(null);
			} else {
				$('#timer_minute').text(minute);
			}
			if ( i < 10){
				$('#timer_seconds').text('0'+i);
			} else {
				$('#timer_seconds').text(i);
			}
		},
		chronoStatus : function(status){
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
		checkTimer : function(status, callback){
			if(status == false){
				callback(!status);
				return;
			}
			callback(!status)
		}
	}
})();