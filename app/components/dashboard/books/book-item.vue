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
    <div class="card card-hover">
        <img :src="image" :alt="title"/>
        <p>Title: {{ title }}</p>
        <p>Author: {{ firstAuthor }}</p>
        <p>Publish year: {{ publishYear }}</p>
    </div>
</template>