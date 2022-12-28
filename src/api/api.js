import axios from 'axios';

export async function getData() {
    try {
        const response = await axios.get('./data.json');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
