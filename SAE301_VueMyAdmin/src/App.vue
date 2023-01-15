<template>
  <a-layout style="min-height: 100vh" has-sider>

    <Menu 
      :databases="databases" 
      @changeCurrentDB="currentDb = $event" 
      @changeCurrentTable="currentTable = $event"
      @changeTableColumns="tableColumns = $event"
      @changeTableRows="tableRows = $event"
      @changeStructureColumns="structureColumns = $event"
      @changeStructureRows="structureRows = $event"
    />

    <a-layout :style="{ marginLeft: '200px' }">

      <a-layout-header style="background: #fff; padding: 0" >
        <a-tabs v-model:activeKey="activeKey" style="margin-left: 20px; margin-right: 20px;">
          
          
          <a-tab-pane key="1" tab="Données">
            <Contenu 
              :columns="tableColumns" 
              :rows="tableRows"
              :currentDb="currentDb"
              :currentTable="currentTable"
            />
          </a-tab-pane>


          <a-tab-pane key="2" tab="Structure">
            <Contenu 
              :columns="structureColumns" 
              :rows="structureRows"
              :currentDb="currentDb"
              :currentTable="currentTable"
            />
          </a-tab-pane>
          
          
          <a-tab-pane key="3" tab="SQL">
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff' }">
              <a-breadcrumb style="margin: 16px 0">
                <a-breadcrumb-item>Database</a-breadcrumb-item>
                <a-breadcrumb-item>Table</a-breadcrumb-item>
              </a-breadcrumb>
              <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                Requête SQL...
              </div>
            </a-layout-content>
          </a-tab-pane>
        </a-tabs>
      </a-layout-header>  


    </a-layout>
  </a-layout>
</template>

<script>
import axios from 'axios';
import Menu from './components/Menu.vue';
import Contenu from './components/Contenu.vue';

import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    Menu,
    Contenu
  },
  data() {
    return {
      databases: [],            // Menu
      tableColumns: [],         // Tableau Données
      tableRows: [],            // Tableau Données
      structureColumns: [],     // Tableau Structure
      structureRows: [],        // Tableau Structure
      currentDb: '',            // Chemin (database)
      currentTable: ''          // Chemin (table)
    };
  },
  setup() {
    return {
      activeKey: ref('1'),      // Onglets
    };
  },
  methods: {
    getDatabases() {
      axios.get('http://localhost/db.php').then(response => {
        this.databases = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
  },
  created() {
    this.getDatabases()
  }
});
</script>
