const qs = require('qs');
const axios = require('axios');
const res = require('express/lib/response');
const { json } = require('express/lib/response');
const { stringify } = require('qs');


class GmailAPI{

   callback(err,conteudo){
       console.log(err,conteudo)
    
   }
    

    getAcessToken = async ()=> {

    const data = qs.stringify({
        'client_id': '30524331860-ab9d2itcq9upn6abolbj2qmjc8ahvef5.apps.googleusercontent.com',
        'client_secret': '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',
        'refresh_token': '1//04sOMdfgHpV7aCgYIARAAGAQSNwF-L9IrbbcszLG2wK05IRDgLqZg6sebBrrrknylEp5QTIqUKENbmqra2KtBdr9ZA8iUb_avCrE',
        'grant_type': 'refresh_token' 
    });
    const config = {
        method: 'post',
        url: 'https://accounts.google.com/o/oauth2/token',
        headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Cookie': 'NID=511=GolHL-3iiuKiooUauu83K-uqMzMEOosunZVvGp4EMo_q52EKc7xzdXJ82ungomMGXZI0X4XxFUU77gQ3tzkUYiuuemmGuaN4-kCB2ymgdzLWqd8_B-g9-tc_U5Q-tnf2dbnkGU0rJQ4fBW9GUKR1S4gjyjP4W-0pNeWaiu0KFrQ; __Host-GAPS=1:wjJxvxTzfO7fvG51TEzipZ17rR_pQQ:o_EboWxx8Qkxs8_r'
        },
        data : data
    };
  
  
    var access_token = ""
    
    await axios(config)
    .then( async function (response) {
        
        access_token = await response.data.access_token;
        //console.log("Access Token : " + access_token)
    })
    .catch(function (error) {
        console.log(error);
    });

    return access_token
    
    }

    listarMensagens = async()=>{

      
    const listar = {
        method: 'get',
        url: 'https://gmail.googleapis.com/gmail/v1/users/nogueira.nicollasdev@gmail.com/messages',
        headers: { 
            'Authorization': `Bearer ${await this.getAcessToken()}`
        }
        };

    
            
        const mensagens = (await axios(listar)).data.messages

        return mensagens
        
       
        /*await axios(listar)
        .then( function (response) {
           
           const dados = response.data.messages;
            //console.log(dados)
           return dados
        
        })
        .catch(function ( error) {
    console.log(error);
        });*/

    }

    buscarMensagem = async(id)=>{

      
        const listar = {
            method: 'get',
            url: `https://gmail.googleapis.com/gmail/v1/users/nogueira.nicollasdev@gmail.com/messages/${id}`,
            headers: { 
                'Authorization': `Bearer ${await this.getAcessToken()}`
            }
            };
    
        
                
            const mensagem = (await axios(listar))
            
            //console.log('Remetente: ',mensagem.data.payload.headers[0].value)

            const infos = {

                remetente: mensagem.data.payload.headers[18].value,
                assunto: mensagem.data.payload.headers[20].value
            }

            return infos
            //console.log('Remetente: ',mensagem.data.payload.headers[18].value)
            //console.log('Assunto: ',mensagem.data.payload.headers[20].value)
           
           
    
        }

    }

module.exports = new GmailAPI();