/**
 * Created by rubz_johnson on 01/01/17.
 */
'use strict';
const chronoDev = function(){
	let onPlay = false;
	let showChronoTextTitle = true; // Affiche ou pas le chrono dans la barre de status
	// Initialize les variables secondes et minutes par rapport aux chrono (Informations provenant de la session)
	let chrono, s = parseInt($('#timer_seconds').text()), minute = parseInt($('#timer_minute').text());
	// TODO: Sauvegarder les informations des INPUT

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
				app.chronoStop();
			}
			app.chronoStop(function(){
				app.chronoStatusText(false);
			});
		});

	});

	$('#timer_reset').click(function(){
		// Si le timer est déjà a 0 => Ne rien faire
		if(s == 0 && minute == 0){
			return false
		}
		// Message de confirmation
    swal({
        title				: "Etes-vous sur ?",
        text				: "Vous allez redémarrez le chrono et tout sera perdu.",
		type				: "warning",
        confirmButtonText	: "Cool",
		showCancelButton	: true,
		showConfirmButton	: true,
        cancelButtonText	: "Je vais y réfléchir",
		closeOnCancel		: false,
		closeOnConfirm	 	: false
    },
		function(isConfirm){
        	if(isConfirm){
                swal("Supprimé !", '"Il faut apprendre à édifier une nouvelle vie sur les ruines d\'un passé douloureux."', "success");
                app.timerOnOff(onPlay, function(callback){
                    onPlay = callback;
                    app.chronoStop();
                    app.chronoReset();
                });
			} else {
                swal("Annulé", '"La mémoire se perd, mais l\'écriture demeure."', "error");
			}
		});


	});
	$('#timer_save').click(function(evt){
		evt.preventDefault();
		if(s == 0 && minute == 0){
            $.notify("Veuillez démarrer le chrono pour enregister un temps", "error");
            return false;
		}
		$.ajax({
			url: '/tasks/save',
			type: 'POST',
			dataType: 'json',
			data: {
				minute		: minute,
				second		: s,
				title		: encodeURI($('#title_tasks').val()),
				content		: encodeURI($('#content_tasks').val()),
				categorize 	: encodeURI($('#categorize').val())
			}
		})
		.done(function(callback){
			let notificationMessage = {
				succes	: 	"Informations sauvegardée",
				error	:	"Erreur : Veuillez réessayer plus tard"
            };

			if(callback) {
                $.notify(notificationMessage.succes, "success");
                return;
            }
			$.notify(notificationMessage.error, "error");
		});
	});

	let app = {
		chronoStart (callback){
			/*Permet de lancer le chrono*/
			let notifMessage = {
				'chronoStart'	: 'Lancement du chrono',
				'chronoResume'	: 'Reprise du chrono'
			};

			if(s == 0) {
				console.log(notifMessage.chronoStart);
			} else {
				console.log(notifMessage.chronoResume);
			}
			chrono = setInterval(function(){
				s++; // Incrementation des secondes
				app.chronoPrint();
			}, 1000);

			callback();
		},
		chronoStop (callback){
			console.log('Arret du chrono : '+ minute +':'+ s);
			clearInterval(chrono);
			if(callback != undefined) {
				callback();
			}
			this.chronoStatusText(false);
		},
		chronoReset(){
			/* RESET TOTAL CHRONO*/
			s = 0;
			minute = 0;
            sessionStorage.removeItem('min');
            sessionStorage.removeItem('sec');
			app.chronoPrint();
			app.chronoStatusText();
			onPlay = false;
			console.log('Chrono RESET : '+ s);
			console.log('Chrono RESET(mn): '+ minute);
		},
		chronoPrint(){
			let showMinute;
			let showSecond;
			if( s >= 60) {
				minute = minute+1;
				s = 0;
			}
			if(minute < 10){
				showMinute = '0'+minute;
				$('#timer_minute').text( showMinute );
			}
			else if(minute > 99){
				this.chronoStop(null);
			}
			else {
				showMinute = minute;
				$('#timer_minute').text(minute);
			}

			if ( s < 10) {
				showSecond = '0'+s;
				$('#timer_seconds').text(showSecond);
			} else {
				showSecond = s;
				$('#timer_seconds').text(s);
			}

			// Permet d'afficher le chrono dans la barre de title
			chronoTextTitle(showMinute, showSecond);

			function chronoTextTitle(minute, second){
				if(showChronoTextTitle){
					$('title').text('DevChrono : '+ minute +':'+ second);
				} else {
					$('title').text('DevChrono');
				}
			}
		},
		chronoStatusText(status){
			let statusMessage = {
				'undefined'		: '',
				'inProgress' 	: 'en cours',
				'pause'			: 'en pause',
				'end'			: 'fin du timer'
			};
			if(status == undefined){
				$('#status').find('p').text(statusMessage.undefined);
				return
			}
			if(status) {
				$('#status').find('p').text(statusMessage.inProgress);
				return;
			}
			if(!status){
				$('#status').find('p').text(statusMessage.pause);
				return;
			}
			$('#status').find('p').text(statusMessage.end);

		},
		timerOnOff : function(status, callback){
			// Permet de changer le status du chrono suivant valeur d'origine
			//ex: if status = true => renvoi false
			return callback(!status);
		}
	}

	return {
		chronoInTitle : function(){
			showChronoTextTitle = !showChronoTextTitle;
			console.log(showChronoTextTitle);
		}
	}
}(window);
