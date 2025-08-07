import { defineStore } from "pinia";


export const useProductStore = defineStore('products',{
    state: () => ({
        products: []
    }),
    actions: {
        addProduct(product){
            if(!this.products.some(element => element.id === product.id)){
                this.products.push(product)
            }
        },
        removeProduct(productId){
            this.products = this.products.filter(element => element.id !== productId)
        },
        setProducts(productsArray){
            this.products = [...productsArray]
        }
    },
    getters: {
        totalProducts: (state) => state.products.length
     }
})