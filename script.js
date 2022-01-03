const grid = document.getElementById('grid');
const restart = document.querySelector('.restart');


const foods = [ 'fa-pizza-slice' , 'fa-cheese' , 'fa-bread-slice' , 'fa-ice-cream', 'fa-pepper-hot' , 'fa-carrot' , 'fa-hotdog' , 'fa-fish', 'fa-pizza-slice' , 'fa-cheese' , 'fa-bread-slice' , 'fa-ice-cream', 'fa-pepper-hot' , 'fa-carrot' , 'fa-hotdog' , 'fa-fish'  ] ;


function shuffle(foods) {
	
	var m = foods.length , temp ,i ;
	
	while (m) {
	
		i=Math.floor(Math.random() * m-- );
			temp = foods[m];
	foods[m] = foods[i];
	foods[i] = temp;
		
	}	
	return(foods);
}



//grid.addEventListener("load", shuffle(foods));



function startGame () {
	
shuffle(foods);
const grid = document.getElementById('grid');
const restart = document.querySelector('.restart');

foods.forEach(food => {
	let memoryCard = document.createElement('div');
	memoryCard.classList.add('card');
	
	let front =document.createElement('div');
	let frontIcon =document.createElement('i');
	

	front.classList.add('front');
	frontIcon.classList.add('fas');
	frontIcon.classList.add('fa-brain');
	
	
	let back =document.createElement('div');
	let backIcon = document.createElement('i');
	back.classList.add('back');
	backIcon.classList.add('fas');
	backIcon.classList.add(food);
	
	
	
	grid.appendChild(memoryCard);
	memoryCard.dataset.id = food ;
	memoryCard.appendChild(front);
	memoryCard.appendChild(back);
	
	front.appendChild(frontIcon);
	back.appendChild(backIcon);
	
	
}); 

}

document.onload = startGame();


const cards =document.querySelectorAll('.card') ;


let hasFlippedCard = false ;
let lockBoard = false ;
let firstCard , secondCard ;

function flipCard () {
	if(lockBoard)return;
	if(this === firstCard) return; //avoid double clicking :)
	this.classList.add('flip');
	
	if (!hasFlippedCard) {
		hasFlippedCard = true ;
		firstCard = this ;
		return ;
	} 
 
	secondCard = this ;	
	checkMatch();
}

function checkMatch() {
	let isMatch = firstCard.dataset.id === secondCard.dataset.id ;
	isMatch ? disableClick() : unflipCard() ;
	

}

function disableClick () {
			firstCard.removeEventListener('click' , flipCard) ;
		secondCard.removeEventListener('click' , flipCard) ;
	resetCard();
}


function unflipCard () {
	lockBoard = true ;
	setTimeout(() => {		
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip'); 
		resetCard();
	} , 900 ) }



function resetCard() {
	[firstCard , secondCard] = [null , null] ;
	[hasFlippedCard , lockBoard] = [false , false] ;
}
	

cards.forEach(cardz => cardz.addEventListener('click' , flipCard));




function resetDeck() {
	
	setTimeout (() => {
	let bCard = document.getElementsByClassName("back") ;
	let secCard = document.getElementsByClassName("card") ;
	let backCard = Array.from(bCard) ;

		let arrayCard = Array.from(secCard) ;
		
	let i = 0 ;
	while(i < backCard.length){
		backCard[i].remove();
		i++;
	}
	
	shuffle(foods);
	
for (let j = 0 ; j < arrayCard.length ; j++) {
	arrayCard[j].dataset.id = " " ; // remove the data-id
	console.log(arrayCard[j].children);
		
	let unter =document.createElement('div');
	
	let backItem = document.createElement('i');
		

	unter.classList.add('back');
	backItem.classList.add('fas');
	backItem.classList.add(foods[j]);
	unter.appendChild(backItem);

	arrayCard[j].appendChild(unter);
	arrayCard[j].dataset.id = foods[j] ; // update new date-id

	
}

},500);
}



function reShuffle() {
	cards.forEach(items => items.classList.remove('flip')) ; 
	resetDeck();
	//resetCard();
	cards.forEach(cardz => cardz.addEventListener('click' , flipCard));
}


restart.addEventListener('click' , reShuffle) ;













