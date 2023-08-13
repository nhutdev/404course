import axios from 'axios'

class courseService {
    url = `${import.meta.env.VITE_API_BASE_URL}`;
    async getCourse(query) {
        try {
            const result = await axios.get(`${this.url}course/get?page=${query}`);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async check_course(id)
    {
        try {
            const result = await axios.put(`${this.url}course/check/`+id);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
    async getCourse_Index(id)
    {
        try {
            const result = await axios.get(`${this.url}course/index/get/`+id);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async getContent()
    {
        try {
            const result = await axios.get(`${this.url}course/index/content/get`);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
   
}
export default new courseService();