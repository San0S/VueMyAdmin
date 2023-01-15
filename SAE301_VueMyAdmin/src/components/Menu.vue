<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }" collapsible>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">

      <img v-if="collapsed" src="../assets/Vue_js_logo.png" class="vue_logo" alt="">
      <img v-else src="../assets/log_menu.png" class="vue_logo" alt="">

      <a-sub-menu v-for="database in databases" :key="database.Database" @click="showTables(database.Database)">
        <template #title>
          <span>
            <DatabaseOutlined />
            <span>{{ database.Database }}</span>
          </span>
        </template>
        <a-menu-item v-for="(table, key) in tables[database.Database]" :key="table[0]" @click="showTableData(table[0]), showStructure(table[0])" class="table">
            <TableOutlined />
            <span>{{ table[0] }}</span>
        </a-menu-item>
      </a-sub-menu>

      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
      <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
    </a-menu>
  </a-layout-sider>
</template>


<script>
import axios from 'axios';
import { DatabaseOutlined, TableOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    DatabaseOutlined,
    TableOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  props: {
    databases: []
  },
  data() {
    return {
      selectedKeys: ref(['1']),
      collapsed: ref(false),
      tables: [],
    }
  },
  methods: {
    showTables(databaseName) {
      this.selectedDatabase = databaseName;
      axios.get(`http://localhost/db.php?database=${databaseName}`)
        .then(response => {
          this.tables[databaseName]= response.data;
          this.currentDb = databaseName;
          this.$emit('changeCurrentDB', this.currentDb);
        })
        .catch(error => {
          console.error(error);
        });
    },
    showStructure(tableName) {
      axios.get(`http://localhost/db.php?database=${this.selectedDatabase}&table=${tableName}&structure=true`)
      .then(response => {
        console.log('API response:', response);
        console.log('Table data:', response.data);
        this.structureColumns = Object.keys(response.data[0]);
        this.structureRows = response.data;
        this.$emit('changeStructureColumns', this.structureColumns);
        this.$emit('changeStructureRows', this.structureRows);
      })
      .catch(error => {
        console.error(error);
      });
    },
    showTableData(tableName) {
      axios.get(`http://localhost/db.php?database=${this.selectedDatabase}&table=${tableName}`)
        .then(response => {
          console.log('API response:', response);
          console.log('Table data:', response.data);
          this.tableColumns = Object.keys(response.data[0]);
          this.tableRows = response.data;
          this.currentTable = tableName;
          this.$emit('changeTableColumns', this.tableColumns);
          this.$emit('changeTableRows', this.tableRows);
          this.$emit('changeCurrentTable', this.currentTable);
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
});
</script>


<style>
.ant-menu-item-selected {
    background-color: #41b883 !important;
}

.trigger {
  font-size: 25px;
  margin: 25px auto 0 25px;
  position: fixed;
  bottom: 5vh;
}

.vue_logo {
  margin: 25px auto 50px 15px;
  height: 40px;

}

.table {
  margin-bottom: -1px !important;
  margin-top: -1px !important;
}
</style>