import axios from 'axios';

export default {
    sendImage(pic, token) {
        return axios.post('https://ded-ai-api-server.onrender.com/analysis', {raw: pic}, {
            headers: {
                'Authorization' : `Bearer ${token}`,
            }
        })
    },

    sendFeedback(sample, feedback, token){
        sample.feedbackResult = feedback;

        return axios.put('https://ded-ai-api-server.onrender.com/analysis', sample, {
            headers: {
                'Authorization' : `Bearer ${token}`,
            }
        })
    }
};