document.addEventListener('DOMContentLoaded',function(){
var grid=document.getElementById('reviewsGrid');
var modal=document.getElementById('imageModal');
var modalImg=document.getElementById('modalImg');
var modalClose=document.getElementById('modalClose');

function openModal(src){
modalImg.src=src;
modal.classList.add('active');
}

function closeModal(){
modal.classList.remove('active');
modalImg.src='';
}

modalClose.addEventListener('click',closeModal);

modal.addEventListener('click',function(e){
if(e.target===modal){
closeModal();
}
});

document.addEventListener('keydown',function(e){
if(e.key==='Escape' && modal.classList.contains('active')){
closeModal();
}
});

fetch('../json/reviews.json')
.then(function(res){
return res.json();
})
.then(function(data){
data.forEach(function(item){
var card=document.createElement('div');
card.className='review-card';

var avatar=document.createElement('div');
avatar.className='review-avatar';
avatar.textContent='#';

var stars=document.createElement('div');
stars.className='review-stars';
var rating=Math.min(Math.max(parseInt(item.stars)||5, 1), 5);
stars.textContent='★'.repeat(rating)+'☆'.repeat(5-rating);

var comment=document.createElement('p');
comment.className='review-comment';
comment.textContent=item.comment||'';

card.appendChild(avatar);
card.appendChild(stars);
card.appendChild(comment);

if(item.image && item.image.trim()!==''){
var imgWrapper=document.createElement('div');
imgWrapper.className='review-image-wrapper';

var img=document.createElement('img');
img.className='review-image';
img.src='../'+item.image.replace(/^\//,'');
img.alt='Imagen de referencia';

imgWrapper.appendChild(img);
imgWrapper.addEventListener('click',function(){
openModal(img.src);
});

card.appendChild(imgWrapper);
}

grid.appendChild(card);
});
})
.catch(function(err){
console.error(err);
});
});
