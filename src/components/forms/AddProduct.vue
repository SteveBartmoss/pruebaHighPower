<script setup>
import { reactive, watch } from 'vue'
import { useProductStore } from '../../stores/products'

const props = defineProps({
  showModal: Boolean,
  productId: Number,
})

const productosPinia = useProductStore()

const emit = defineEmits(['update:showModal'])

const closeModal =()=>{
    resetForm()
    emit('update:showModal',false)
}

const errors = reactive({
  nombre: '',
  stock: '',
  precio: '',
  caducidad: '',
})

const form = reactive({
    nombre: '',
    stock: '',
    precio: '',
    caducidad: '',
})

const resetForm = () => {
    form.nombre = ''
    form.stock = ''
    form.precio = ''
    form.caducidad = ''
    errors.nombre = ''
    errors.stock = ''
    errors.precio = ''
    errors.caducidad = ''
}

const validateForm = () =>{
    let valid = true

    errors.nombre = ''
    errors.stock = ''
    errors.precio = ''
    errors.caducidad = ''

    if (!form.nombre) {
        errors.caducidad = 'El nombre es requerido'
        valid = false
    }
    if (!form.stock || isNaN(form.stock) || Number(form.stock) < 0) {
        errors.stock = 'Cantidad inválida'
        valid = false
    }
    if (!form.precio || isNaN(form.precio) || Number(form.precio) < 0) {
        errors.precio = 'Precio inválido'
        valid = false
    }
    if (!form.caducidad) {
        errors.caducidad = 'La caducidad es requerida'
        valid = false
    }
  return valid
}

const addProduct=()=>{
    if(!validateForm()) return

    if(props.productId){
        productosPinia.removeProduct(props.productId)
    }

    const newProduct = {
        id: productosPinia.products.length + 1,
        nombre: form.nombre,
        stock: Number(form.stock),
        precio: Number(form.precio),
        caducidad: form.caducidad
    }

    productosPinia.addProduct(newProduct)
    closeModal()
}

watch(()=> props.showModal, (newVal)=>{
    if(newVal && props.productId){
        let edit = productosPinia.products.find(element => element.id == props.productId)
        form.nombre = edit?.nombre
        form.stock = edit?.stock
        form.precio = edit?.precio
        form.caducidad = edit?.caducidad
    }
})

</script>

<template>
    <v-dialog v-model="props.showModal" max-width="500">
        <v-card>
            <v-card-title>{{ props.productId ? 'Editar producto' : 'Agregar producto' }}</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field
                    v-model="form.nombre"
                    label="Nombre"
                    type="text"
                    :error-messages="errors.nombre"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="form.stock"
                    label="Cantidad"
                    type="number"
                    :error-messages="errors.stock"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="form.precio"
                    label="Precio"
                    type="number"
                    :error-messages="errors.precio"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="form.caducidad"
                    label="Caducidad"
                    type="date"
                    :error-messages="errors.caducidad"
                    required
                    ></v-text-field>
                </v-form>
            </v-card-text>

            <v-card-text class="d-flex justify-end">
                <v-row justify="end" class="pa-4">
                    <v-col cols="auto">
                        <v-btn color="error" dark @click="closeModal">Cerrar</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn color="primary" @click="addProduct">Guardar</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>