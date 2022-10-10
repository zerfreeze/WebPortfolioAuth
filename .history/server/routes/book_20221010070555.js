let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//connect to our book model
let Book = require('../model/books');
let bookController = require('../controllers/book');
//GET ROUTE for the book list page - READ OPERATION
router.get('/',bookController.displayBookList);
/*GET Route for displaying the Add page - CREATE operation*/
router.get('/add',bookController.displayAddPage);

/*POST Route for processing the Add page - CREATE operation*/
router.post('/add',bookController.processAddPage);



/*GET Route for displaying the Edit page - UPDATE operation*/
router.get('/edit/:id',(req,res,next)=>{
let id = req.params.id;
Book.findById(id,(err,bookToEdit)=>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        res.render('/book/edit',{title:'Edit Book', book: bookToEdit});
        
    }
});
});
/*POST Route for processing the Edit page - UPDATE operation*/
router.post('/edit/:id',(req,res,next)=>{
    let id = req.params.id
    let updatedBook = Book({
        "_id":id,
        "name":req.body.name,
        "author":req.body.author,
        "published":req.body.author,
        "description":req.body.description,
        "price":req.body.price
    });
    Book.updateOne({_id:id}, updatedBook,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/bookList');
        }
    });
});
/*GET to perform Deletion - DELETE operation*/
router.get('/delete/:id',(req,res,next)=>{
let id = req.params.id;
Book.remove({_id:id},(err)=>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        res.redirect('/bookList');
    }
});
});
module.exports = router;