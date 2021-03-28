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
                prevBtn.className='disabledBtn';
                prevBtn.setAttribute('disabled', true); 
            }
            if(newIndex == gallery.length  - 1){
                nextBtn.className='disabledBtn';
                nextBtn.setAttribute('disabled', true); 
            }

            prevBtn.onclick= () =>{
                newIndex--;
                if(newIndex == 0){
                    preview();
                    prevBtn.className='disabledBtn';
                    prevBtn.setAttribute('disabled', true); 
                }
                else{
                    preview();
                    nextBtn.className='arrow-prev';
                    nextBtn.removeAttribute('disabled'); 
                }
            };
        
            nextBtn.onclick= () =>{
                newIndex++;
                if(newIndex == gallery.length  - 1){
                    preview();
                    nextBtn.className='disabledBtn';
                    nextBtn.setAttribute('disabled', true); 
                } 
                else {
                    preview();
                    prevBtn.className='arrow-next';
                    prevBtn.removeAttribute('disabled'); 
                }
            };
            preview();
            
            lightbox.classList.add('visible');

            // Usunięcie 'visible' po klinknięciu w przycisk close(X)
            document.getElementById('close').addEventListener('click', function () {
                newIndex=clickImgIndex;
                // Eliminuje błąd polegający na tym, że po przy zamknięciiu poprzez button X
                // 1-ego i ostatniego zdjęcia gubiliśmy buttony strzałek
                lightbox.classList.remove('visible');
                prevBtn.className='arrow-next';
                prevBtn.removeAttribute('disabled'); 
                nextBtn.className='arrow-next';
                nextBtn.removeAttribute('disabled'); 
            });
        };
    }
};
