import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    matchResponse: {}, //json di partenza
    matchIdList: [], //lista id match
    matchDetailList: {}, //oggetto dettaglio match
    allMatches: [], //store locale con dettaglio match
  },

  actions: {
    getMatches({ commit }) {
      axios.get("https://www.dontouch.ch/json/cc.json").then((response) => {
        //popolo lo state store
        commit("SET_RESPONSE", response.data); //Risposta totale

        //seleziono id match
        commit("SET_ID", response.data.doc[0].data.seasons[76925].matches); //ID Matches

        //seleziono dettagli match
        commit("SET_DETAILS", response.data.doc[0].data.matches); //Details Matches

        //mutation con creazione array match
        commit("SET_MATCHES");
      });
    },
    deleteStoreMatches({ commit }, matchId) {
      //elimino dallo state i riferimenti all'id match
      commit("DELETE_MATCHES", matchId);

      //mutation con creazione array match
      commit("SET_MATCHES");
    },
    updateMatches({ commit }) {
      //mutation con update match
      commit("UPDATE_MATCHES");

      //mutation con creazione array match
      commit("SET_MATCHES");
    },
  },

  mutations: {
    SET_RESPONSE(state, res) {
      state.matchResponse = res;
    },
    SET_ID(state, res) {
      state.matchIdList = res;
    },
    SET_DETAILS(state, res) {
      state.matchDetailList = res;
    },
    SET_MATCHES(state) {
      //svuoto allMatches
      state.allMatches = [];

      //assegno l'oggetto match ad un array state basandomi sull'id
      for (let i = 0; i < state.matchIdList.length; i++) {
        let matchRef = state.matchIdList[i].toString();
        if (
          Object.prototype.hasOwnProperty.call(state.matchDetailList, matchRef)
        ) {
          let singleMatch = state.matchDetailList[matchRef];
          state.allMatches.push(singleMatch);
        }
      }
    },
    DELETE_MATCHES(state, res) {
      //elimino l'id dalla lista id
      if (state.matchIdList.indexOf(res) !== -1) {
        let index = state.matchIdList.indexOf(res);
        state.matchIdList.splice(index, 1);
      }

      //elimino l'oggetto di dettaglio match dalla allMatches basandomi slla chiave id
      let toRemove = res.toString();
      if (
        Object.prototype.hasOwnProperty.call(state.matchDetailList, toRemove)
      ) {
        delete state.matchDetailList[toRemove];
      }
    },
    UPDATE_MATCHES(state) {
      //id più grande e più piccolo
      let max = Math.max(...state.matchIdList);
      let min = Math.min(...state.matchIdList);

      //decremento id + piccolo
      min = min - 2;

      //assegno id minimo all'array di appoggio matchIdList
      state.matchIdList.unshift(min);

      let MatchMax;

      //creo oggetto match copiando dall'oggetto con id più grande
      for (let i = 0; i < state.matchIdList.length; i++) {
        let matchRef = state.matchIdList[i].toString();

        //identifico oggetto dal suo id
        if (
          Object.prototype.hasOwnProperty.call(state.matchDetailList, matchRef)
        ) {
          if (matchRef === max.toString()) {
            //creo oggetto con id più alto
            MatchMax = Object.assign({}, state.matchDetailList[matchRef]);
          }
        }
      }

      //assegno l'id + piccolo all'oggetto match
      let keyMatch = min.toString();
      MatchMax._id = min;

      //assegno l'oggetto  creato a matchDetailList
      state.matchDetailList[keyMatch] = MatchMax;
    },
  },

  getters: {
    allDetailMatch: (state) => {
      return state.allMatches;
    },
  },
});
