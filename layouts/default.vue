<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-lg">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
          <div class="flex space-x-7">
            <div>
              <nuxt-link to="/" class="flex items-center py-4">
                <span class="font-semibold text-gray-500 text-lg">Nuxt Store</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <main class="container mx-auto px-4 py-8">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
