import axios from "axios";
import Vuex from "vuex";

export default new Vuex.Store({
  // state : objet qui contient les propriétés dont l'application a besoin pour fonctionner
  state: {
    selectedDatabase: "",
    tableName: "",
    tables: Array,
  },

  // mutation : opération qui va mettre à jour les state
  mutations: {
    setCurrentDb(state, selectedDatabase) {
      state.selectedDatabase = selectedDatabase;
    },

    setTables(state, tables) {
      state.tables = tables;
    },

    setCurrentTable(state, tableName) {
      state.tableName = tableName;
    },
  },

  // actions : similaire aux mutations, va gérer les appels API et déclenche les modifs sur l'app, les commit vont déclencher les mutations

  actions: {
    fetchTables({ commit }, selectedDatabase) {
      axios
        .get(`${API_URL}?database=${databaseName}`)
        .then((response) => {
          commit("setTables", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchTableData({ commit }, { selectedDatabase, tableName }) {
      axios
        .get(`${API_URL}?database=${selectedDatabase}&table=${selectedTable}`)
        .then((response) => {
          commit("setTableData", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },




  
});
