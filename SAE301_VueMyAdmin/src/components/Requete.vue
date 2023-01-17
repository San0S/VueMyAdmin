<template>
    <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff' }">
      <!-- <a-breadcrumb style="margin: 16px 0" v-if="currentDb !== ''">
        <a-breadcrumb-item>{{ currentDb }}</a-breadcrumb-item>
        <a-breadcrumb-item>{{ currentTable }}</a-breadcrumb-item>
      </a-breadcrumb> -->

      <h3 v-if="currentDb !== '' && currentTable !== ''">Exécuter une ou des requêtes SQL sur la table "<strong>{{ currentTable }}</strong>.<strong>{{ currentDb }}</strong>" :</h3>
      <h3 v-else-if="currentDb !== ''">Exécuter une ou des requêtes SQL sur la base de données "<strong>{{ currentDb }}</strong>" :</h3>
      <h3 v-else>Exécuter une ou des requêtes SQL sur le serveur <strong>MySQL</strong> :</h3>


      <!-- <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
        <Table :columns="columns" :rows="rows"></Table>
      </div> -->
    </a-layout-content>
  </template>
  
  
  <script>
  import Table from './Table.vue';
  export default {
      components: {
          Table,
      },
      props: {
          columns: Array,
          rows: Array,
          currentDb: '',
          currentTable: ''
      }
  
  }
  
  </script>
  
  
  <style>
  
  Table {
      max-height: 60vh;
  }
  
  </style>