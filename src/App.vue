<template>
    <dashboard columns="8" rows="8">
        <router-view/>
    </dashboard>
</template>

<script>
    import Dashboard from './components/Dashboard.vue'
    export default {
        components: {
            Dashboard
        }
    }
    // import Home from './views/Home.vue'
    // export default {
    //     components: {
    //         Home
    //     }
    // }
</script>

