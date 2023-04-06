var router = require('express').Router();
const { verifyUser } = require("../middleware/user.auth");
const { insert, show, userDelete, userCount } = require("../controller/user.controller");
const upload = require("../utils/upload.image");

router.post('/insert', upload.single("image"), insert);
router.get('/show', show);
router.delete('/delete', userDelete);
router.get('/count', userCount);



const {itemShow} = require("../controller/item.controller") ;
const { showCategory} = require("../controller/category.controller") ;



router.get('/', verifyUser, async  (req, res) => {
  res.render('dashboard.ejs', );
});

router.get('/billing', function (req, res, next) {
  res.render('billing.ejs', { title: 'Express' });
});


router.get('/category-insert', function (req, res, next) {
  res.render('categoryInsert.ejs', { title: 'Express' });
});

router.get('/item-insert', function (req, res, next) {
  res.render('itemInsert.ejs', { title: 'Express' });
});

router.get('/user', function (req, res, next) {
  res.render('user.ejs', { title: 'Express' });
});

router.get('/profile', function (req, res, next) {
  res.render('profile.ejs', { title: 'Express' });
});

router.get('/sign-in', function (req, res, next) {
  res.render('sign-in.ejs', { title: 'Express' });
});

router.get('/template', function (req, res, next) {
  res.render('user.ejs', { title: 'Express' });
});




router.get('/tables', show, async (req, res) => {
  data = req.data
  res.render("tables", { data })
});

router.get('/item', itemShow,  async (req, res) => {
  item = req.item
  res.render('item.ejs', { item });
});

router.get('/category', showCategory,  async (req, res) => {
  categoryAll = req.category
  res.render('category.ejs', { categoryAll });
});




module.exports = router;
