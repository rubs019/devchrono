/**
 * Created by rubz_johnson on 01/01/17.
 */
(function(){
	var onPlay = false;
	var chrono, i = 0, minute = 0;

	$('#circle').click(function(){
		// Switch timer TRUE/FALSE
		app.checkTimer(onPlay, function(callback){
			onPlay = callback;

			if(onPlay){
				app.chronoStart(function(){
					app.chronoStatus(true);
				});
				return;
			}
			app.chronoStop(function(){
				app.chronoStatus(false)
			});
		});

	});

	$('#timer_reset').click(function(){
		app.chronoReset();
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
				console.log(i)
				app.chronoPrint();
			}, 1000);

			callback();
		},
		chronoStop : function(callback){
			console.log('Arret du chrono : '+ i)
			clearInterval(chrono);
			callback();
		},
		chronoReset : function(){
			i = 0;
			minute = 0;
			app.chronoPrint();
			app.chronoStatus();
			console.log('Chrono RESET : '+ i)
		},
		chronoPrint : function(){

			if( i >= 60) {
				minute = minute+1;
				i = 0;
				if(minute < 10){
					$('#timer_minute').text('0'+minute);
				} else {
					$('#timer_minute').text(minute);
				}
			}
			if ( i < 10){
				$('#timer_seconds').text('0'+i);
			} else {
				$('#timer_seconds').text(i);
			}


			/* if( i == 15){
				// ADD +1mn
				minute = minute+1;
				$('#timer').text(minute+':'+second);
			} else {
				$('#timer').text('00:'+i);
			} */
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
			$('#status p').text('En pause');

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