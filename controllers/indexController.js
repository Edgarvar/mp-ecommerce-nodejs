const express = require('express');
const mercadopago = require('mercadopago');

mercadopago.configure({
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398'
});



module.exports = {
    home: (req, res) => {
        return res.render('home');
    },
    detail: (req, res) => {
        return res.render('detail', { ...req.query } );
    },
    callback: (req, res) => {
        console.log(req.query)

        if(req.query.status.includes('success')){
            return res.render('success', {
                payment_type : req.query.payment_type,
                external_reference : req.query.external_reference,
                collection_id : req.query.collection_id
            })
        }

        if(req.query.status.includes('pending')) {
            return res.render('pending')
        }

        if(req.query.status.includes('failure')) {
            return res.render('failure')
        }

        return res.status(404).end()
    },
    notifications: (req, res) => {
        console.log(req.body);

        res.status(200).end('OK');
    },
    buy: (req, res) => {

        let host = 'http://localhost:3000/';

        let url = host + 'callback?status=';

        const preference = {

            back_urls: {
                success : url + 'success',
                pending : url + 'pending',
                failure : url + 'failure',
            },

            notification_url: host + 'notifications',

            auto_return: 'approved',

            payment_methods : {
                installments : 6,
                excluded_payment_methods : [
                    { id : 'amex' }
                ],
                excluded_payment_types: [
                    { id : 'atm' }
                ]
            },

            payer : {
                name : 'Lalo',
                surname : 'Landa',
                email : 'test_user_63274575@testuser.com',
                phone : {
                    area_code : '11',
                    number : 22223333
                },
                address : {
                    street_name : 'False',
                    street_number : 850,
                    zip_code : '1111'
                }
            },

            items : [
                {
                    id : '1234',
                    title : req.query.title,
                    description : 'Dispositivo móvil de Tienda e-commerce',
                    picture_url : req.query.img,
                    quantity : 1,
                    unit_price : Number('999')
                }
            ],

            external_reference : 'edgardo_vargas@outlook.com.ar'
            
        }

        mercadopago.preferences.create(preference).then(response => {
            const preference = response.body;
            return res.render('confirm', { ...req.query, preference });

        }).catch(error => {
            console.log(error)
            res.send('error')
        })
    }

}