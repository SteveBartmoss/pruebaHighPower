<script setup>
import { ref } from 'vue';
import { useProductStore } from '../stores/products';
import AddProduct from './forms/AddProduct.vue';
import { validateExpiration } from '../helpers/dateHelper';


const productosPinia = useProductStore()

const showModalProduct = ref(false)
const productId = ref(null)

const  openModal=()=>{
  showModalProduct.value = true
  productId.value = null
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

const editProduct=(item)=>{
  productId.value = item.id
  showModalProduct.value = true
}

const verifyCaducidad=(caducidad)=>{
  return validateExpiration(caducidad)
}

const getExpirateColor=(caducidad)=>{
  const text = validateExpiration(caducidad)
  switch(text){
    case 'Vigente':
      return 'success'
    case 'Por caducar':
      return 'warning'
    case 'Caducado':
      return 'error'
  }
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
              <template #item.caducidad="{item}">
                <v-chip :color="getExpirateColor(item.caducidad)">{{ verifyCaducidad(item.caducidad) }}</v-chip>
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

  <AddProduct v-model:show-modal="showModalProduct" v-model:product-id="productId" />
</template>

<style scoped>

</style>