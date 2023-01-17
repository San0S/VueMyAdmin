<template>
    <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff' }">
      <!-- <a-breadcrumb style="margin: 16px 0" v-if="currentDb !== ''">
        <a-breadcrumb-item>{{ currentDb }}</a-breadcrumb-item>
        <a-breadcrumb-item>{{ currentTable }}</a-breadcrumb-item>
      </a-breadcrumb> -->

      <h3 v-if="currentDb !== '' && currentTable !== ''">Exécuter une ou des requêtes SQL sur la table "<strong>{{ currentTable }}</strong>.<strong>{{ currentDb }}</strong>" :</h3>
      <h3 v-else-if="currentDb !== ''">Exécuter une ou des requêtes SQL sur la base de données "<strong>{{ currentDb }}</strong>" :</h3>
      <h3 v-else>Exécuter une ou des requêtes SQL sur le serveur <strong>MySQL</strong> :</h3>


      <div class="inline">
        <textarea name="" id="SQLrequest" cols="30" rows="10"></textarea>

        <table class="request-table" v-if="currentDb !== ''">
            <thead>
                <tr>
                    <th class="request-table-thead-th" v-if="currentDb !== '' && currentTable !== ''">Attribut(s)</th>
                    <th class="request-table-thead-th" v-else>Table(s)</th>                
                </tr>
            </thead>
            <tbody v-if="currentDb !== '' && currentTable !== ''">
                <tr v-for="column in columns" :key="column">
                    <td class="request-table-tbody-td">{{ column }}</td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr v-for="table in tables" :key="table">
                    <td class="request-table-tbody-td">{{ table[0] }}</td>
                </tr>
            </tbody>
        </table>

      </div>

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
        tables: Array,
        currentDb: '',
        currentTable: ''
    }

}
</script>
  
  
<style>

.request-table {
    width: 100%;
    height: 40px;
    border-collapse: collapse;
    overflow: scroll;
}

.request-table-thead-th {
    font-weight: bold;
    background-color: #fafafa;
    text-align: left;
    padding: 8px;
}

.request-table-tbody-td {
    border: 1px solid #e8e8e8;
    padding: 8px;
    }

.inline {
    display: flex;
}

#SQLrequest {
    width: 60%;
}

</style>