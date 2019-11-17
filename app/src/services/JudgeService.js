import Api from '@/services/Api';

export default {
  getJudges() {
    return Api().get('judge');
  },

  addJudge(params) {
    return Api().post('judge', params);
  },

  updateJudge(params) {
    return Api().put('judge/' + params.id, params);
  },

  getJudge(params) {
    return Api().get('judge/' + params.id);
  },

  deleteJudge(id) {
    return Api().delete('judge/' + id);
  }
};