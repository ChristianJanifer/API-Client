//POKEMON API
$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/",
    success: function (result) {
        console.log(result.results); 
        var listPokemon = "";
        $.each(result.results, function (key, val) {
            listPokemon += `<tr>
                               <td>${key + 1}</td>
                               <td>${val.name}</td>
                               <td>${val.url}</td>
                               <td><button type="button" class="btn btn-success" onclick="launchModal('${val.url}');" data-url="${val.url}" data-toggle="modal" data-target="#modalSW">
                                    Detail
                               </button></td>
                           </tr>`;
        });
        $('#listpokemon').html(listPokemon);
    }
})

//POKEMON API
function launchModal(url) {
    //console.log(url);
    listSW = "";
    $.ajax({
        url: url,
        success: function (result) {
            listSW += ` <img src ='${result.sprites.other.dream_world.front_default}'class="mx-auto d-block">
                        <p style ="text-align: center" class="font-weight-bold">${result.name}</p>
                      `;

            listSW += `<p class="font-weight-bold">Ability : </p>`;
            for (i = 0; i < result.abilities.length; i++) {
                listSW += `<p> ${result.abilities[i].ability.name}</p>`;
            }
           
            listSW += `<p class="font-weight-bold">Type : </p>`;
            for (i = 0; i < result.types.length; i++) {
                listSW += `<p> ${result.types[i].type.name}</p>`;
            }

            listSW += `<p class="font-weight-bold">Height : ${result.height}</p>`;
            listSW += `<p class="font-weight-bold">Weight : ${result.weight}</p>`;
                   
            $('.modal-body').html(listSW);
        }
    });
}