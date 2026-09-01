document.addEventListener('DOMContentLoaded',function(){
var revealItems=document.querySelectorAll('.reveal');
var revealObserver=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
entry.target.classList.add('in-view');
revealObserver.unobserve(entry.target);
}
});
},{threshold:0.12});

revealItems.forEach(function(item){
revealObserver.observe(item);
});

var track=document.getElementById('reviewsTrack');

fetch('json/reviews.json')
.then(function(res){
return res.json();
})
.then(function(data){
function createCard(item){
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

return card;
}

data.forEach(function(item){
track.appendChild(createCard(item));
});

data.forEach(function(item){
track.appendChild(createCard(item));
});
})
.catch(function(err){
console.error(err);
});
});
