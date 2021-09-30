//biblioteca
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connection = require("./database/database");

const ArticlesController = require("./aticles/ArticlesController");
const CategoriesController = require("./categories/CategoriesController");

const Article = require("./aticles/Article");
const Category = require("./categories/Category");

//view engine
app.set('view engine','ejs');

//Static
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database

connection
 .authenticate()
 .then(() => {
    console.log("Conexão feita com sucesso!");
 }).catch((error) =>{
     console.log("error");
 });


app.use("/", CategoriesController);
app.use("/", ArticlesController);



//rotas
app.get("/", (req, res) =>{
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4
    }).then(articles =>{

        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
    });
})

app.get("/:slug", (req, res) =>{
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article =>{
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", {article: article,categories: categories});
            })
        }else {
            res.redirect("/");
        }
    }).catch(erro => {
        res.redirect("/");
    });
})

app.get("/category/:slug", (req, res) =>{
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then( category => {
        if (category != undefined) {

            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles,categories: categories});
            });
        }else {
            res.redirect("/");
        }
    }).catch(erro => {
        res.redirect("/");
    });
})

//porta do servidor
app.listen(8080, () =>{
    console.log("O servidor esta rodando!");
})