const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const authRouter = require('./controllers/auth/router')
const renderUIRouter = require('./controllers/ui-render/router')
const userRouter = require('./controllers/user/router')
const messageRouter = require('./controllers/message/router')
const assetsDirectoryPath = path.join(__dirname,'..','/assets')



/**
 * use assets folder
 */
app.use(express.static(assetsDirectoryPath))

/**
 * setup for express-handlebars
 */
app.engine('hbs', hbs({
    layoutsDir: path.join(__dirname, '..', '/views/layouts/'), 
    partialsDir: path.join(__dirname, '..', '/views/partials/'),
    extname:'hbs', 
    defaultLayout: 'main'
}))

app.set('views', path.join(__dirname ,'..', 'views'));
app.set('view engine', 'hbs')

/**
 * setup for body-parser
 */
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * create new session each time new client connects to server and store sessionId in its cookies. 
 */
app.use(session({
    name: 'sessionId',
    // cookie: { maxAge: Date.now() + (1 * 24 * 60 * 60 * 1000) },
    cookie: { maxAge: 10 * 60 * 1000 },
    secret: 'keyboard cat',
    resave: false, //Prevent session being saved back to the session store when it is not modified during request
    saveUninitialized: false, //do not save new session which is not modified 
}))

/**
 * use authentication router
 */
app.use("/auth", authRouter)

/**
 * check login middleware
 */
app.use(function(req, res, next){
    if(req.session.user){
        next()
    }else{
        res.redirect('/auth/login')
    }
})
/**
 * Ui render router
 */
app.use("/", renderUIRouter)

app.use("/user", userRouter)

app.use("/message", messageRouter)

app.use("/", (req, res) => {
    res.send('hihihihihi')
})
app.listen(process.env.PORT || 3000)