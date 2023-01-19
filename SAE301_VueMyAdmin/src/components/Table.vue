<template>
  <div>
    <div class="container" :class="container">
    <!-- <table class="ant-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column" class="ant-table-thead-th">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="(cell, key) in row" :key="key + ' ' + cell" class="ant-table-tbody-td">{{ cell }}</td>
        </tr>
      </tbody>
    </table> -->
    <a-table :dataSource="rows" :columns="columns" :scroll="{y:300}"/>
    </div>
  </div>
</template>

<script>
export default {
props: ['columns', 'rows'],

data: () => ({
  nbOfLinesToDisplay: 20
}),

computed: {
  container() {
    if (this.rows.length > this.nbOfLinesToDisplay) {
      return 'scrollbar-enabled';
    } else {
      return 'scrollbar-disabled';
    }
  }
}
}

</script>