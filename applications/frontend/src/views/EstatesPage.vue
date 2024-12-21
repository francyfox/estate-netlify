<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useEstateStore } from '@/store/estateStore'
import EstateTable from '@/components/EstateTable.vue'
import AppLoader from '@/components/UI/AppLoader.vue'

const estateStore = useEstateStore();

onMounted(() => {
  estateStore.fetchEstates()
})

// Вычисляемое свойство для отображения отфильтрованных данных
const filteredEstates = computed(() => {
  if (!estateStore.searchQuery) return estateStore.estates; // Если поиск пустой, возвращаем все данные

  // Фильтрация данных на фронтенде по поисковому запросу
  return estateStore.estates.filter((estate) =>
    estate.address.toLowerCase().includes(estateStore.searchQuery.toLowerCase())
  )
})
</script>

<template>
  <div>
    <h1>Список объектов недвижимости</h1>
    <input
      v-model="estateStore.searchQuery"
      type="text"
      placeholder="Поиск по адресу"
      @input="estateStore.handleSearch"
    />
    <button @click="estateStore.clearFilters">Очистить фильтры</button>

    <AppLoader v-if="estateStore.estates.length === 0" /> 

    <EstateTable
      v-else
      :estates="filteredEstates"
      :highlightSearch="estateStore.highlightSearch"
      :filterByCity="estateStore.filterByCity"
    />
  </div>
</template>

<style scoped>
</style>