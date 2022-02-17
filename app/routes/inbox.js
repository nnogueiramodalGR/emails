const { kill } = require('nodemon/lib/monitor/run');
const gmailAPI = require('./classes//gmailAPI');
const GmailAPI = require('./classes//gmailAPI')
module.exports = function(app){


    app.get('/inbox', function(req,res){

      var infos_totais = []
  
    GmailAPI.listarMensagens().then( v => {
      
      
      const qtd_mensagens = v.length;
      

      for (var i = 0 ; i < 3; i++){

        console.log( v[i].id)
        
        gmailAPI.buscarMensagem(v[i].id).then(infos =>{

          //console.log(infos)
          infos_totais.push(infos)
          console.log(infos_totais)
          
        })

        

       
        
        

      }

      res.render('pages/inbox',{dados: v,infos: infos_totais})
      

      
    
    
    } )          

    

         
    
    
    })
    
    }