//Service Worker
if ('serviceWorker' in navigator) {
    console.log('serviceWorker available');

    navigator.serviceWorker.register('./service-worker.js')
        .then(res => console.log("Service worker cargado correctamente", res))
        .catch(err => console.log("Service worker no se ha podido registrar", err));

} else {
    console.log("serviceWorker not available");
}


//Scroll suavizado
$(document).ready(function(){

    $('#menu a').on('click', function(e){
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        })

        return false;
    });
});

