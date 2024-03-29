var express = require('express');
var router = express.Router();
var request = require('request');
var getJSON = require('get-json');
var markdown = require("markdown").markdown;
var path = require('path');
router.get('/', (req, res) => {
    let bpost;
    let serv;
    let emp;
    getJSON('http://api:1337/posts/').then((response) => {
        bpost = response;
        getJSON('http://api:1337/services/').then((response) => {
            serv = response;
            getJSON('http://api:1337/employers/').then((response) => {
                emp = response;
                res.render('home', {
                    layout: 'default',
                    blogPost: bpost,
                    services: serv,
                    Team: emp
                });
            })
        })
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/post/:id', (req, res) => {
            let blogpost;
            getJSON('http://api:1337/posts?_id=' + req.params.id).then((response) => {
                blogpost = response[0].content;
                response[0].content = markdown.toHTML(response[0].content);
                res.render('post', {
                    layout: 'default',
                    post: response[0]
                });
            }).then(() => {
                var qs = 'http://api:1337/posts?_sort=_id:DESC&categories.name=' + encodeURIComponent(blogpost.categories[0].name)
                let brelated;
                getJSON(qs).then((response) => {
                        brelated = response;
                        console.log(brelated);
                        res.render('post', {
                            layout: 'default',
                            post: blogpost,
                            related: brelated
                        });
                    })
                    .catch(err => {
                        if (err)
                            console.log(err);
                    });
            });

            module.exports = router;