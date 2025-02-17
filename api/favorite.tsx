const favorite = (axios: any, event: any) => ({
  getFavoritesList() {
    return axios.get(`${event}`);
  },
  addFavorite(id: any) {
    return axios.post(`${event}/${id}`);
  },
  removeFavorite(id: any) {
    return axios.delete(`${event}/${id}`);
  },
  getFavorites() {
    return axios.get(`${event}/showID`);
  },
});

export default favorite;
