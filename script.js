const api = "https://www.breakingbadapi.com/api/characters/"
const header = document.querySelector('.header');
const content = document.querySelector('.content') ;
const sideSection = document.querySelector('.sideSection')

async function getData() {

	const response = await fetch(api)

	const data = await response.json()

	printData(data)

}




function printData(data){

	header.innerHTML += `
	  <label for="actor-select">Please choose a character to display his info</label>
	  <select onChange="getCharacter(this.value)" id="actor-select" name="actor-select">
	  <option>select an actor</option>
	  ${
	  	data.map(
	  		(actor) => `<option value="${actor.char_id}">${actor.name}</option>`
	  		)
	  }
	  </select>

	`

	
}

async function getCharacter(e){
	const newapi = api +e
	const response = await fetch(newapi)
	const character = await response.json()
	const seriesArray = character[0].category
	console.log(seriesArray)

	content.innerHTML = `
	<div class ="actor" key="${character[0].char_id}">
	  <h2>Character in the movie : ${character[0].name}</h2>
	  <div class="birthday">${character[0].birthday}
	  <p>Real name : ${character[0].portrayed}<p>
	  <p>Occupation : ${character[0].occupation[0]}<p>

	  </div>
	  <img src ="${character[0].img}" alt="actor-image" width="250px">
	</div>
	`	
	sideSection.innerHTML = `Those are the series where the actor ${character[0].portrayed} is involved :
	<p>${seriesArray}</p>
	`
	
}



getData()
