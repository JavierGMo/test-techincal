<script lang="ts" setup>
import { useBookStore } from '~/store/book.store';

const {
    getTotalPages,
    getCurrentPage,
    getOffset,
    getFilters,
    setFilters,
    fetchBooks
} = useBookStore()

const perPage = ref('10')

const handlePerPage = (e: any) => {
    if(!e.target?.value) return;

    setFilters({
        limit: Number(e.target?.value ?? 0)
    })

}

const visiblePages = computed(() => {
    const pages: (number | string)[] = [];
    const maxVisible = getFilters.limit ?? 0;
    const current = getCurrentPage;
    const total = getTotalPages;

    if (total <= maxVisible) {
        for (let i = 1; i <= total; i++) {
            pages.push(i);
        }
        return pages;
    }

    const leftOffset = Math.floor(maxVisible / 2);
    const rightOffset = maxVisible - leftOffset - 1;

    let start = Math.max(1, current - leftOffset);
    let end = Math.min(total, current + rightOffset);

    if (current <= leftOffset) {
        end = maxVisible;
    } else if (current >= total - rightOffset) {
        start = total - maxVisible + 1;
    }

    if (start > 1) {
        pages.push(1);
        if (start > 2) {
            pages.push('dots');
        }
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < total) {
        if (end < total - 1) {
            pages.push('dots');
        }
        pages.push(total);
    }

    return pages;
});

const goToPage = (page: number) => {
    if (page >= 1 && page <= getTotalPages && page !== getCurrentPage) {
        setFilters({
            limit: getOffset,
            page: getCurrentPage
        })
        fetchBooks()
    }
}
</script>

<template>
    <div>
        <label for="per-page">Per page: </label>
        <select
            v-model="perPage"
            @change="handlePerPage"
            class="select"
        >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
        </select>
    </div>
    <div v-if="getTotalPages > 1" class="pagination">
        <button @click="goToPage(1)" :disabled="getCurrentPage === 1" class="pagination-btn"
            aria-label="Primera página">
            <span>«</span>
        </button>

        <button @click="goToPage(getCurrentPage - 1)" :disabled="getCurrentPage === 1" class="pagination-btn"
            aria-label="Página anterior">
            <span>‹</span>
        </button>

        <template v-for="page in visiblePages" :key="page">
            <span v-if="page === 'dots'" class="pagination-dots">...</span>
            <button v-else @click="goToPage(page as number)"
                :class="['pagination-btn', { active: page === getCurrentPage }]" :aria-label="`Página ${page}`"
                :aria-current="page === getCurrentPage ? 'page' : undefined">
                {{ page }}
            </button>
        </template>

        <button @click="goToPage(getCurrentPage + 1)" :disabled="getCurrentPage === getTotalPages" class="pagination-btn"
            aria-label="Página siguiente">
            <span>›</span>
        </button>

        <button @click="goToPage(getTotalPages)" :disabled="getCurrentPage === getTotalPages" class="pagination-btn"
            aria-label="Última página">
            <span>»</span>
        </button>
    </div>
</template>