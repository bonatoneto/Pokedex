const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

// função que busca o pokemon na API
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    //verifica o status de requisão da API
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

//função resposável por carregar o pokemon e seus dados na tela
const renderPokemon = async (pokemon) => {

    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'Loading...';

    
    const data = await fetchPokemon(pokemon);

    //verifica se o pokemon foi encontrado
    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';
        // atualiza o valor da variavel para o id do pokemon encontrado
        searchPokemon = data.id;
    } else {
        //esconde a imagem do pokemon e escreve uma mensagem caso ele não seja encontrado.
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found.';
        pokemonNumber.innerHTML = '';
    }   
}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    
    renderPokemon(input.value.toLowerCase());  
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon); 
    }
})

renderPokemon(searchPokemon);