import Api from '@/services/Api';

export default {
  getClasses () {
    return Api().get('class');
  },

  addClass (params) {
    return Api().post('class', params);
  },

  updateClass (params) {
    return Api().put('class/' + params.id, params);
  },

  getClass (params) {
    return Api().get('class/' + params.id);
  },

  deleteClass (id) {
    return Api().delete('class/' + id);
  }
};