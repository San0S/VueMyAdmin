<template>
  <div>
    <div class="container" :class="container">
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