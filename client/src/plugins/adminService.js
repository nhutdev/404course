import axios from 'axios'

class userService {
    url = `${import.meta.env.VITE_API_BASE_URL}`;
    async getRole() {
        try {
            const result = await axios.get(`${this.url}role/get`);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async getUR()
    {
        try {
            const result = await axios.get(`${this.url}roleuser/get`);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async getUserByRole(id)
    {
        try {
            const result = await axios.post(`${this.url}user/getByRole/`+id);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
}
export default new userService();