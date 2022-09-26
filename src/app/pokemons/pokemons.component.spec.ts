import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { PokemonsComponent } from './pokemons.component';
import { PokemonService } from '../pokemon.service';

describe('pokemons component', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [PokemonService]
  }));

  it('should be created', () => {
    const service: PokemonService = TestBed.get(PokemonService);
    expect(service).toBeTruthy();
  });

  it('should have getPokemons function', () => {
    const service: PokemonService = TestBed.get(PokemonService);
    expect(service.getPokemons).toBeTruthy();
  });

});