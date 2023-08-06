import axios from 'axios';

export default{
    getSessionToken(credentials){
        const params = {
            grant_type: 'password',
            username: credentials.user,
            password: credentials.pass
        }

        //clientKeySecret

        return axios.post('https://ded-ai-api-server.onrender.com/auth', params, {
            headers: {
                'Authorization' : `Basic ${clientKeySecret}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}