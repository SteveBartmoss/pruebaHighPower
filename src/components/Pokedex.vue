<script setup>
import axios from 'axios';
import { ref } from 'vue';

const listPokemons = ref([])

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nombre', key: 'nombre' },
  { title: 'Altura', key: 'altura' },
  { title: 'Peso', key: 'peso' },
  { title: 'Tipos', key: 'tipos' },
]

const search = ref('')
const pokemonInfo = ref(null)

const searchPokemon = async () => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.value.toLowerCase()}`)
    pokemonInfo.value = response.data

    listPokemons.value.push({
      id: response.data.id,
      nombre: response.data.name,
      altura: response.data.height,          
      peso: response.data.weight,
      tipos: response.data.types,
    })

  } catch (error) {
    console.error('No se encontró el Pokémon', error)
    pokemonInfo.value = null
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="4">
          <v-card-title>
            Pokedex
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="search"
              label="pokemon"
              type="text"
            ></v-text-field>
            <v-btn color="primary" @click="searchPokemon">Buscar</v-btn>
          </v-card-text>

          <v-card-text>
            <div v-if="pokemonInfo">
              <h3>{{ pokemonInfo.name }} (ID: {{ pokemonInfo.id }})</h3>
              <img :src="pokemonInfo.sprites.front_default" alt="Imagen del Pokémon" />
              <p>Altura: {{ pokemonInfo.height }}</p>
              <p>Peso: {{ pokemonInfo.weight }}</p>
              <p>Tipos:
                <span v-for="type in pokemonInfo.types" :key="type.type.name">
                  {{ type.type.name }}
                </span>
              </p>
            </div>
            <div v-else>
              <p>Busca un Pokémon para ver su información aquí.</p>
            </div>
          </v-card-text>

          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="listPokemons"
              class="elevation-1"
              :items-per-page="5"
            >
              <template v-slot:no-data>
                No hay productos disponibles.
              </template>
              <template #item.tipos="{item}">
                <span v-for="type in item.tipos" :key="type.type.name">
                  {{ type.type.name }}
                </span>
              </template>
            </v-data-table>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>