const express = require("express");
const app = express();
const path = require('path');
const axios = require('axios');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));


async function pokimonFunction(Pname){
    const config = {
        method : "get",
        url : `https://pokeapi.co/api/v2/pokemon/${Pname}`, 
    }
    let res = await axios(config);
    return res;
}
app.get("/" , async (req,res) => {
    let PokimonsArr = []; 
    let pokimonName = ['pikachu' , 'bulbasaur' , 'ditto' , 'cosmog' , 'swablu' , 'jigglypuff' , 'charmander' , 'sylveon' , 'jynx'];
    let pokinomImages =['https://www.bitgab.com/uploads/1597796080-pikachu-1597796080.png' ,
     'https://media.printables.com/media/prints/30233/images/300606_05d12d0c-053b-47c7-a29d-57ec89e338e8/thumbs/cover/800x800/png/bulbasaur_original.webp',
     'https://img.pokemondb.net/artwork/large/ditto.jpg',
     'https://static.pokemonpets.com/images/monsters-images-800-800/2789-Shiny-Cosmog.png',
     'https://static.pokemonpets.com/images/monsters-images-800-800/333-Swablu.webp',
     'https://easydrawingguides.com/wp-content/uploads/2018/10/how-to-draw-jigglypuff-pokemon-featured-image-1200.png',
     'https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/d/d4/Charmander.gif',
     'https://assets.pokemon.com/assets/cms2/img/pokedex/full/700.png',
     'https://shop7.webmodule.prestashop.net/pokedoge/11754-large_default/jynx.jpg',
]

    for(let i=0 ; i<9 ; i++){
        PokimonsArr[i] = await pokimonFunction(pokimonName[i]);
    }
    res.render('pokimon' , {
        title : "home page",
        poc : PokimonsArr,
        pocImg : pokinomImages,
})
})

app.listen(4000 , ()=>{
    console.log("http://localhost:4000");
})
