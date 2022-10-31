import axios from "axios";
import {toast} from "react-toastify";

const api = axios.create({
    baseURL: `http://127.0.0.1:8000/api`,

})


export default {
    Login: async (formData: any) => {
        try {
            const res = await api.post('/auth/login', formData, {
                headers: {'Accept': 'application/json'},
                transformRequest: formData => formData,
            });

            if (res.data.error){
                return toast.warn('Atenção. Erro verifique a senha ou email!')
            }else{
                if (res.data){

                    sessionStorage.setItem('token', res.data.token);
                    sessionStorage.setItem('user', JSON.stringify(res.data.user));
                    return res.data;
                }
            }
        } catch (e) {
            return alert('Atenção servidor fora do ar!');
        }
    },

    Register: async (data) => {
        const res = await api.post('/auth/register', data);
        try {
            if (res.data.error){
                return toast.error('Atenção. Informações inválidas!');
            }else{
                toast.success('Atenção. Cadastro efetuado com sucesso!')
                return res.data.user;
            }
        } catch (e) {
            return false;
        }
    },
    NewTask: async (data : any, token : string) => {
        const res = await api.post('/create', data, {
            headers: {
                'Accept': 'application/json',
                'Authorization' : 'Bearer '+token
            },
            transformRequest: formData => formData,
        });
        try {
            if (res.data.error){
                return toast.error('Atenção. Erro ao salvar!');
            }else{
                toast.success('Tarefa adicionado com sucesso!')
                return res.data.task;
            }
        } catch (e) {
            return false;
        }
    },
    GetTasks: async (user_id : any, token : string) => {
        const res = await api.get('/getTasks/'+user_id,{
            headers: {
                'Accept': 'application/json',
                'Authorization' : 'Bearer '+token
            },
            transformRequest: formData => formData,
        });
        try {
            if (res.data.error){
                return toast.error('Atenção. Erro ao buscar!');
            }else{
                return res.data;
            }
        } catch (e) {
            return false;
        }
    },
    Delete: async (id : any, token : string) => {
        const res = await api.get('/delete/'+id,{
            headers: {
                'Accept': 'application/json',
                'Authorization' : 'Bearer '+token
            },
            transformRequest: formData => formData,
        });
        try {
            if (res.data.error){
                return toast.error('Atenção. Erro ao buscar!');
            }else{
                toast.success('Tarefa deletada com sucesso!');
                return res.data;
            }
        } catch (e) {
            return false;
        }
    },



}

