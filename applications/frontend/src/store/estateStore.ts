import { defineStore } from 'pinia'
import debounce from 'lodash.debounce'
import { getEstates } from '@/api/estates'
import { ref } from 'vue'

export const useEstateStore = defineStore('estate', () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const estates = ref<any[]>([])
  const currentCityFilter = ref<string | null>(null)
  const searchQuery = ref('')

  const fetchEstates = async (city?: string, search?: string) => {
    loading.value = true;
    try {
      estates.value = await getEstates({ city, search });
    } catch (err) {
      error.value = 'Ошибка загрузки данных';
    } finally {
      loading.value = false;
    }
  };

  const filterByCity = (city: string) => {
    currentCityFilter.value = city;
    fetchEstates(city, searchQuery.value);
  };

  const handleSearch = debounce(() => {
    currentCityFilter.value = null;
    fetchEstates(undefined, searchQuery.value);
  }, 400);

  const clearFilters = () => {
    currentCityFilter.value = null;
    searchQuery.value = '';
    fetchEstates();
  };

  const highlightSearch = (text: string) => {
    if (!searchQuery.value) return text;
    const regex = new RegExp(`(${searchQuery.value})`, 'gi');
    return text.replace(
      regex,
      '<span style="background-color: yellow;">$1</span>'
    );
  };

  return {
    loading,
    error,
    estates,
    currentCityFilter,
    searchQuery,
    fetchEstates,
    filterByCity,
    handleSearch,
    clearFilters,
    highlightSearch,
  };
});
