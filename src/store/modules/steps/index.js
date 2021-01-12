// STEPS MODULE
import axios from "../../../axios.js";

export default {
  namespaced: true,
  state() {
    return {
      steps: []
    };
  },
  getters: {
    steps(state) {
      return state.steps;
    }
  },
  mutations: {
    setSteps(state, payload) {
      state.steps = payload;
    }
  },
  actions: {
    async getTodaysSteps(context) {
      const userId = context.rootGetters.userId;
      try {
        const response = await axios(
          `${userId}/steps.json?orderBy=%22dateTime%22&endAt=%22${context.rootGetters.currentTime.format()}%22`
        );
        if (response.status < 200 || response.status >= 300)
          throw new Error(response.status);

        const steps = [];
        for (const key in response.data) {
          steps.push({
            id: key,
            ...response.data[key]
          });
        }
        context.commit("setSteps", steps);
      } catch (error) {
        console.error(error.message);
      }
    },
    async markDone(context, payload) {
      const userId = context.rootGetters.userId;
      try {
        const response = await axios.patch(
          `${userId}/steps/${payload.id}.json`,
          {
            done: true
          }
        );
        console.log('markDone steps state')
          console.log(response);
        if (response.status < 200 || response.status >= 300)
          throw new Error(response.status);
        else {
          context.dispatch('goals/updateGoalStepCount', payload.goalId, { root: true })
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  }
};
