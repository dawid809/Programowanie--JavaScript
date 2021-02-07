// pobranie referencji
const gallery = document.querySelectorAll('.gallery img');
let lightbox = document.querySelector('.lightbox');
const img = document.querySelector('.lightbox img');


window.onload = function(){
    for (let idx = 0; idx < gallery.length; idx++) {
        let newIndex=idx;

        gallery[idx].onclick= (ev) =>{
            console.log(ev.target);
           
            // Przypisanie zdjęcia do source
            let selectedImgUrl = gallery[newIndex].src;
            img.src = selectedImgUrl;
            
            lightbox.classList.add('visible');

            // Usunięcie 'visible' 
            lightbox.addEventListener('click', e=>{
                if (e.target !== e.currentTarget) return;
                lightbox.classList.remove('visible');
            });
            // Usunięcie 'visible' po klinknięciu w przycisk close(X)
            document.getElementById('close').addEventListener('click', function () {
                lightbox.classList.remove('visible');
            });
        };
    }
};
