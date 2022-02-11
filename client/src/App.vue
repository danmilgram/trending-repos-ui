<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import Web3Adapter from './libs/Web3Adapter';

export default {
    mixins: [Web3Adapter],
    name: 'App'
};
</script>

<style>
#app {
  margin-top: 60px
}
</style>
