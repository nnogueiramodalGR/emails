const email = require('nodemailer')

module.exports = function(app){

  
    app.get('/newmessage',function(req,res){
    
        res.render('pages/newmessage')
    
    
    })


    app.post('/enviaremail',function(req,res){

    const corpo = req.body
    const mensagem = corpo.mensagem


    const remetente = email.createTransport({

        host:'smtp.office365.com',
        service:'smtp.office365.com',
        port: 587,
        secure:false,
        sender: "Formulário do Site",
        auth:{

            user:'enviotestesmodal@outlook.com',
            pass:'Modalgr2022'
        }


    }) 
    
    const emailenviado = {

        from:'"CONTATO SITE" enviotestesmodal@outlook.com',
        to:'nogueira.nicollasdev@gmail.com',
        subject:'[FORMULÁRIO DO SITE] - ' + corpo.nome + ' - '+ corpo.emailcontato,
        text: mensagem
    }

    remetente.sendMail(emailenviado,(error)=> {
        if(error){
            console.log('Deu Erro')
        }else{
            console.log('Email enviado com sucesso')
        }
    })

    
    
    res.redirect('/newmessage')

    })

    
    }