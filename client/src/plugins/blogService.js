import axios from 'axios'

class blogService {
    url = `${import.meta.env.VITE_API_BASE_URL}`;
    async getblog(query,status) {
        try {
            const result = await axios.get(`${this.url}blog/get?page=${query}&&status=${status}`);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async check_blog(id)
    {
        try {
            const result = await axios.put(`${this.url}blog/check/`+id);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
}
export default new blogService();