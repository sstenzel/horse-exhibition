//jshint esversion: 8, node: true


import Vue from "vue";
import Vuex from "vuex";
import HorseService from "@/services/HorseService";
import ClassService from "@/services/ClassService";
import JudgeService from '@/services/JudgeService';
import LoginService from '@/services/LoginService';


Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        horses: null,
        classes: null,
        judges: null,
        logged: false
    },

    getters: {
        HORSES: state => {
            return state.horses;
        },
        CLASSES: state => {
            return state.classes;
        },
        JUDGES: state => {
            return state.judges;
        },
        LOGGED: state => {
            return state.logged;
        }
    },

    mutations: {
        SET_HORSES: (state, payload) => {
            state.horses = payload;
        },
        ADD_HORSE: (state, payload) => {
            state.horses.push(payload);
        },
        UPDATE_HORSE: (state, payload) => {
            let index = state.horses.findIndex(el => el.id === payload.id);
            Vue.set(state.horses, index, payload);
        },
        DELETE_HORSE: (state, payload) => {
            let index = state.horses.findIndex(el => el.id === payload);
            Vue.delete(state.horses, index, payload);
        },
        SET_CLASSES: (state, payload) => {
            state.classes = payload;
        },
        SET_JUDGES: (state, payload) => {
            state.judges = payload;
          },
        SET_LOGGED: (state, payload) => {
            state.logged = payload;
        }

    },

    actions: {

        async GET_HORSES(context) {
            const response = await HorseService.getHorses();
            if (response.status === 200) {
                context.commit('SET_HORSES', response.data);
            }
        },
        async ADD_HORSE(context, payload) {
            const response = await HorseService.addHorse(payload);
            if (response.status === 200) {
                context.commit('ADD_HORSE', response.data);
                (new Vue()).$socket.emit("add-horse", payload);
            }
        },
        async SOCKET_ADD_HORSE(context, payload) {
            context.commit('ADD_HORSE', payload);
        },
        async UPDATE_HORSE(context, payload) {
            const response = await HorseService.updateHorse(payload);
            if (response.status === 200) {
                context.commit('UPDATE_HORSE', payload);
                (new Vue()).$socket.emit("update-horse", payload);
            }
        },
        async SOCKET_UPDATE_HORSE(context, payload) {
            context.commit('UPDATE_HORSE', payload);
        },
        async DELETE_HORSE(context, payload) {
            console.log("delete horse dispatched");
            const response = await HorseService.deleteHorse(payload);
            if (response.status === 200) {
                context.commit('DELETE_HORSE', payload);
                (new Vue()).$socket.emit("delete-horse", payload);
            }
        },
        async SOCKET_DELETE_HORSE(context, payload) {
            context.commit('DELETE_HORSE', payload);
        },
        async GET_CLASSES(context) {
            const response = await ClassService.getClasses();
            if (response.status === 200) {
                context.commit('SET_CLASSES', response.data);
            }
        },

        async GET_JUDGES(context) {
            const response = await JudgeService.getJudges();
            if (response.status === 200) {
                context.commit('SET_JUDGES', response.data);
            }
        },

        async LOGIN(context, payload) {
            const response = await LoginService.login(payload);
            if (response.status === 200) {
                context.commit('SET_LOGGED', response.data);
            }
        },
        async LOGOUT(context, payload) {
            context.commit('SET_LOGGED', false);
        },


    }

});
