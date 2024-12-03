<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Welcome to Nuxt Store</h1>
    <NuxtLink to="/test" class="text-blue-500 hover:text-blue-700 mb-4 inline-block">Test</NuxtLink>
    
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Categories</h2>
        <div v-if="loading" class="text-gray-500">Loading...</div>
        <ul v-else class="space-y-2">
          <li v-for="category in categories" :key="category._id" class="text-gray-700">
            {{ category.name }}
          </li>
        </ul>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Products</h2>
        <div v-if="loading" class="text-gray-500">Loading...</div>
        <ul v-else class="space-y-2">
          <li v-for="product in products" :key="product._id" class="text-gray-700">
            {{ product.name }} - ${{ product.price }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      categories: [],
      products: [],
      loading: true,
      error: null
    }
  },
  async fetch() {
    try {
      this.loading = true
      this.error = null
      const [categoriesRes, productsRes] = await Promise.all([
        this.$axios.$get('/api/categories'),
        this.$axios.$get('/api/products')
      ])
      this.categories = categoriesRes
      this.products = productsRes
    } catch (error) {
      console.error('Error fetching data:', error)
      this.error = 'Error loading data. Please try again later.'
    } finally {
      this.loading = false
    }
  }
}
</script>
