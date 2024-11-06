const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  fs.readdir(`./uploads`,{withFileTypes : true},function(err,files){
    res.render('index', {files});
  })
});

app.get('/new-note',(req,res)=>{
  res.render('new');
})
app.get('/newbanao',(req,res)=>{
  fs.writeFile(`./uploads/${req.query.noteName}`,req.query.noteContent,(err)=>{
    if(err) console.log(err);
    else res.redirect('/');
  })
})
app.get('/view-note/:noteName',(req,res)=>{
  fs.readFile(`./uploads/${req.params.noteName}`,(err,data)=>{
    res.render('viewNote',{noteName : req.params.noteName,noteContent : data});
  })
});

app.get('/delete-note/:noteName',(req,res)=>{
  fs.unlink(`./uploads/${req.params.noteName}`,(err)=>{
    if(err) console.log(err);
    else res.redirect('/');
  })
});
app.get('/edit-note/:noteName',(req,res)=>{
  res.render('edit',{noteName : req.params.noteName});
})
app.post('/edit-note/:noteName', (req, res) => {
  const { noteName } = req.params;
  const { noteContent } = req.body;

  fs.writeFile(`./uploads/${noteName}`, noteContent, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating note');
    } else {
      res.redirect('/');
    }
  });
});


app.listen(3000);