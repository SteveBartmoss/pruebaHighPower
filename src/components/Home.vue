<script setup>
import { ref } from 'vue';
import { useProductStore } from '../stores/products';
import AddProduct from './forms/AddProduct.vue';


const productosPinia = useProductStore()

const showModalProduct = ref(false)

const  openModal=()=>{
  showModalProduct.value = true
}

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nombre', key: 'nombre' },
  { title: 'Cantidad', key: 'stock' },
  { title: 'Precio', key: 'precio' },
  { title: 'Caducidad', key: 'caducidad' },
  { title: 'Acciones', key: 'acciones' },
]


const deleteProduct=(id)=>{
  productosPinia.removeProduct(id)
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="4">
          <v-card-title>
            Lista de Productos
            <v-btn color="primary" @click="openModal">Agregar producto</v-btn>
          </v-card-title>

          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="productosPinia.products"
              class="elevation-1"
            >
              <template v-slot:no-data>
                No hay productos disponibles.
              </template>
              <template #item.acciones="{item}">
                <div style="display: flex; gap: 8px;">
                  <v-btn color="primary" @click="editProduct(item)">
                    editar
                  </v-btn>
                  <v-btn color="error" @click="deleteProduct(item.id)">
                    borrar
                  </v-btn>
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <AddProduct v-model:show-modal="showModalProduct" />
</template>

<style scoped>

</style>