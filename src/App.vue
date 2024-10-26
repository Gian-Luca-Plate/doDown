<template>
<router-view/>  
</template>
<script>
export default {
    created() {
        if (localStorage.getItem('AoutoLogin') === 'yes') {
            this.$router.push('/home')
        }else{
            this.$router.push('/')
        }
    },
}
</script>