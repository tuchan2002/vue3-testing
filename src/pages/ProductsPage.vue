<template>
  <div v-if="products.length > 0">
    <div v-for="product in products" :key="product.id">
      <router-link :to="`/products/${product.id}`">{{ product.title }}</router-link>
    </div>
  </div>
  <h1 v-else>Loading...</h1>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    products() {
      return this.$store.getters['products/products']
    },
    productsFiltered() {
      return this.$store.getters.productsFiltered
    }
  }
}
</script>
