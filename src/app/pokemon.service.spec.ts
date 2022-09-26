import { fakeAsync, getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Pokemon } from './pokemon';
import { PokemonService } from './pokemon.service';


describe('PokemonService', () => {
  let injector: TestBed;
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });

    injector = getTestBed();
    service = injector.get(PokemonService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('should get list of pokemons', () => {
    it('verify if returns data', () => {

      service.getPokemons().subscribe((Pokemon) => {
        expect(Array<Pokemon>).not.toBeNull();
      });

      const req = httpMock.expectOne("https://bp-pokemons.herokuapp.com/?idAuthor=1");
      expect(req.request.method).toBe("GET");
    });
  });

  describe('should save a pokemon', () => {
    it('verify if save data', () => {
      const pokemon: Pokemon = {
        id: 0,
        name: "Pokemon",
        image: "url",
        attack: 0,
        defense: 0,
        hp: 0,
        type: "pokemon",
        id_author: 1
      }

      service.addPokemon(pokemon).subscribe((Pokemon) => {
        expect(Pokemon).toEqual(pokemon);
      });

      const req = httpMock.expectOne("https://bp-pokemons.herokuapp.com/?idAuthor=1");
      expect(req.request.method).toBe("POST");
    });
  });

  describe('should update a pokemon', () => {
    it('verify if update data', () => {
      const pokemon: Pokemon = {
        id: 4380,
        name: "Pokemon",
        image: "url",
        attack: 0,
        defense: 0,
        hp: 0,
        type: "pokemon",
        id_author: 1
      }

      service.updatePokemon(pokemon).subscribe((Pokemon) => {
        expect(Pokemon).toEqual(pokemon);
      });

      const req = httpMock.expectOne("https://bp-pokemons.herokuapp.com/" + pokemon.id);
      expect(req.request.method).toBe("PUT");
    });
  });

  describe('should delete a pokemon', () => {
    it('verify if delete data', () => {
      const pokemon: Pokemon = {
        id: 4380,
        name: "Pokemon",
        image: "url",
        attack: 0,
        defense: 0,
        hp: 0,
        type: "pokemon",
        id_author: 1
      }

      service.deletePokemon(pokemon).subscribe((Pokemon) => {
        expect(Pokemon).toEqual(pokemon);
      });

      const req = httpMock.expectOne("https://bp-pokemons.herokuapp.com/" + pokemon.id);
      expect(req.request.method).toBe("DELETE");
    });
  });



});

