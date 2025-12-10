<script lang="ts" setup>
    interface BookItemProps {
        image?: string
        title: string
        authors: Array<string>
        publishYear: string
    }
    const {
        authors,
    } = defineProps<BookItemProps>()

    const firstAuthor = ref('');
    const restAuthors = ref<Array<string>>([])

    onMounted(()=>{
        const [oneAuthor, ...leftAuthors] = authors;
        if(leftAuthors.length>0) {
            leftAuthors.forEach(author=>{
                restAuthors.value.push(author);
            });
            return;
        }
        firstAuthor.value = oneAuthor ?? 'No Author';
    })

</script>

<template>
    <img :src="image" :alt="title"/>
    <p>{{ title }}</p>
    <p>{{ firstAuthor }}</p>
    <p>{{ publishYear }}</p>
</template>