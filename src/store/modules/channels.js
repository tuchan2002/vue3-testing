import { db } from "@/firebase/config";
import { collection, onSnapshot, query } from "firebase/firestore";

const state = () => ( {
  channels: [],
  selectedChannel: null,
})

const getters = {
  channels(state) {
    return state.channels
  },
  selectedChannel(state) {
    return state.selectedChannel
  }
}

const actions = {
  async getRealtimeChannels(context) {
    const q = query(
      collection(db, 'channels'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));

      context.commit('setRealtimeChannels', documents)
    });

    return unsubscribe;
  },
  selectChannel(context, { channelId }) {
    context.commit('selectChannel', channelId)
  }
}

const mutations = {
  setRealtimeChannels(state, payload) {
    state.channels = payload
  },
  selectChannel(state, payload) {
    state.selectedChannel = state.channels.find(
      (channel) => channel.id === payload
    )
  }
}

export default {
  namespaced: true, 
  state,
  getters,
  actions,
  mutations
}