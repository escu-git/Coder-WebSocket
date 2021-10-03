const hbs = require('express-handlebars');
const path = require('path');

const handlebarsEngine = (app) =>{
    app.engine(
        'hbs',
        hbs({
            extname: '.hbs',
            defaultLayout: 'index.hbs',
            layoutsDir:"views/layouts",
            partialsDir: "views/partials",      
        })
    )
    app.set('views', './views');
    app.set('view engine', 'hbs');
}

module.exports=handlebarsEngine;