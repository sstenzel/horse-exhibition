import Api from '@/services/Api';

export default {
  getHorses() {
    return Api().get('horse');
  },

  addHorse(params) {
    return Api().post('horse', params);
  },

  updateHorse(params) {
    return Api().put('horse/' + params.id, params);
  },

  getHorse(params) {
    return Api().get('horse/' + params.id);
  },

  findHorseByClass(params) {
    return Api().get('horse/findByClass/' + params.id);
  },

  deleteHorse(id) {
    return Api().delete('horse/' + id);
  }
};