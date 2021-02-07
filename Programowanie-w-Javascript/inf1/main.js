// pobranie referencji
const gallery = document.querySelectorAll('.gallery img');
let lightbox = document.querySelector('.lightbox');
const img = document.querySelector('.lightbox img');
const prevBtn = document.querySelector('.arrow-prev');
const nextBtn = document.querySelector('.arrow-next');

window.onload = function(){
    for (let idx = 0; idx < gallery.length; idx++) {
        let newIndex=idx;
        let clickImgIndex;
        gallery[idx].onclick= (ev) =>{
            console.log(ev.target);
            clickImgIndex= newIndex;
            
            function preview(){
                // Przypisanie zdjęcia do source
                let selectedImgUrl = gallery[newIndex].src;
                img.src = selectedImgUrl;
                console.log('Img index = ' + newIndex);
                console.log(img.src);
            }
             
            // Ukrywa buttony  gdy wybieramy zdjęcie o indexie 0 albo ostatnim
            if(newIndex == 0){
                prevBtn.style.display = 'none';
            }
            if(newIndex == gallery.length  - 1){
                nextBtn.style.display = 'none';
            }

            prevBtn.onclick= () =>{
                newIndex--;
                if(newIndex == 0){
                    preview();
                    prevBtn.style.display = 'none';
                }
                else{
                    preview();
                    nextBtn.style.display = 'block';
                }
            };
        
            nextBtn.onclick= () =>{
                newIndex++;
                if(newIndex == gallery.length  - 1){
                    preview();
                    nextBtn.style.display = 'none';
                } 
                else {
                    preview();
                    prevBtn.style.display = 'block';
                }
            };
            preview();
            
            lightbox.classList.add('visible');

            // Usunięcie 'visible' 
            lightbox.addEventListener('click', e=>{
                if (e.target !== e.currentTarget) return;
                newIndex=clickImgIndex;
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
                lightbox.classList.remove('visible');
            });
            // Usunięcie 'visible' po klinknięciu w przycisk close(X)
            document.getElementById('close').addEventListener('click', function () {
                newIndex=clickImgIndex;
                // Eliminuje błąd polegający na tym, że po przy zamknięciiu poprzez button X
                // 1-ego i ostatniego zdjęcia gubiliśmy buttony strzałek
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
                lightbox.classList.remove('visible');
            });
        };
    }
};
