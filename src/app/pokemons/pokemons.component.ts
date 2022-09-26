import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {

  verCard: boolean;
  isEdit: boolean;
  searchText: string;
  pokemon: Pokemon;

  pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService, private messageService: MessageService) {
    this.pokemons = [];
    this.pokemon = {
      id: 0,
      name: "",
      image: "",
      attack: 0,
      defense: 0,
      hp: 0,
      type: "pokemon",
      id_author: 1
    };
    this.verCard = false;
    this.isEdit = false;
    this.searchText = "";
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  new(): void {
    this.isEdit = false;
    this.verCard = true;
    this.pokemon = {
      id: 0,
      name: "",
      image: "",
      attack: 0,
      defense: 0,
      hp: 0,
      type: "pokemon",
      id_author: 1
    };
  }

  cancel(): void {
    this.isEdit = false;
    this.verCard = false;
    this.pokemon = {
      id: 0,
      name: "",
      image: "",
      attack: 0,
      defense: 0,
      hp: 0,
      type: "pokemon",
      id_author: 1
    };
  }

  onSelect(pokemon: Pokemon): void {
    this.pokemon = pokemon;
    this.isEdit = true;
    this.verCard = true;
    this.messageService.add(`Has seleccionado el pokemon: ${pokemon.name}`);
    setTimeout(() => {
      this.messageService.clear();
    }, 2000);
  }

  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(pokemons => this.pokemons = pokemons)

  }

  add(pokemon: Pokemon): void {

    if (!pokemon.name || !pokemon.image || pokemon.attack <= 0 || pokemon.defense <= 0) {
      this.messageService.add(`Ingrese los datos correctamente`);
      setTimeout(() => {
        this.messageService.clear();
      }, 2000);
    } else {
      const last = this.pokemons[this.pokemons.length - 1];
      if (last) {
        pokemon.id = last.id + 1;
      } else {
        pokemon.id = 4343;
      }
      pokemon.idAuthor = 1;
      this.pokemonService.addPokemon(pokemon as Pokemon)
        .subscribe(pokemon => {
          this.pokemons.push(pokemon);
        });
    }


  }

  save(): void {
    if (!this.pokemon.name || !this.pokemon.image || this.pokemon.attack <= 0 || this.pokemon.defense <= 0) {
      this.messageService.add(`Ingrese los datos correctamente`);
      setTimeout(() => {
        this.messageService.clear();
      }, 2000);
    } else {
      this.pokemon.idAuthor = 1;
      this.pokemonService.updatePokemon(this.pokemon)
        .subscribe(() => this.goBack());
    }
  }

  delete(pokemon: Pokemon): void {
    pokemon.idAuthor = 1;
    this.pokemons = this.pokemons.filter(h => h !== pokemon);
    this.pokemonService.deletePokemon(pokemon).subscribe();
  }
  goBack(): void {
    throw new Error('Method not implemented.');
  }


}
