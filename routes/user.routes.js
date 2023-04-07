var router = require('express').Router();
const { verifyUser } = require("../middleware/user.auth");
const { insert,edit, show, userDelete, totalCount, showOne } = require("../controller/user.controller");
const upload = require("../utils/upload.image");

router.post('/insert', upload.single("image"), insert);
router.put('/user/:id',upload.single("image"), edit)
router.get('/show', show);
router.delete('/tables/:id', userDelete);
router.get('/', totalCount);
router.get('/profile/:id', showOne);



const { itemShow, itemById ,deleteItem } = require("../controller/item.controller");

const { showCategory, deleteCategory } = require("../controller/category.controller");



router.get('/', verifyUser, totalCount, async (req, res) => {
  total = req.total
  res.render('dashboard.ejs', { total });
});



router.get('/category-insert', verifyUser, function (req, res, next) {
  res.render('categoryInsert.ejs', { title: 'Express' });
});

router.get('/item-insert', verifyUser, function (req, res, next) {
  res.render('itemInsert.ejs', { title: 'Express' });
});

router.get('/user', verifyUser, function (req, res, next) {
  res.render('user.ejs', { title: 'Express' });
});

router.get('/sign-in', function (req, res, next) {
  res.render('sign-in.ejs', { title: 'Express' });
});

router.get('/template', verifyUser, function (req, res, next) {
  res.render('user.ejs', { title: 'Express' });
});



/* ======================================== All Data Show ======================================== */
router.get('/tables', verifyUser, show, async (req, res) => {
  data = req.data
  res.render("tables", { data })
});

router.get('/item', verifyUser, itemShow, async (req, res) => {
  item = req.item
  res.render('item.ejs', { item });
});

router.get('/category', verifyUser, showCategory, async (req, res) => {
  categoryAll = req.category
  res.render('category.ejs', { categoryAll });
});
/* ==================================================================================== */



/* ======================================== Edit By Id ======================================== */
//? USER
router.get('/userEdit/:id', verifyUser, edit,  function (req, res, next) {
  editUser = req.edit
  res.render('userEdit.ejs' , { editUser });
});


//? ITEM
router.get('/itemEdit/:id', verifyUser,   function (req, res, next) {
  editItem = req.itemedit
  res.render('item.ejs' , { editItem });
});

//? CATEGORY
router.get('/categoryEdit/:id', verifyUser,   function (req, res, next) {
  editCategory = req.categoryedit
  res.render('categoty.ejs' , { editCategory });
});
/* ==================================================================================== */



/* ======================================== Show By Id ======================================== */
//? USER  
router.get('/profile/:id', verifyUser, showOne, function (req, res, next) {
  one = req.nOne
  res.render("profile.ejs", { one })
});

//? ITEM
router.get('/itemshow/:id', verifyUser, itemById, async (req, res) => {
  itemID = req.itembyid
  res.render('itemshow.ejs', { itemID });
});
/* ==================================================================================== */




/* ======================================== Delete By Id ======================================== */
//? USER
router.get('/tables/:id', verifyUser, userDelete, async (req, res) => {
  res.render("tables")
});

//? ITEM
router.get('/item/:id', verifyUser, deleteItem, async (req, res) => {
  res.render("item")
});

//? CATEGORY
router.get('/category/:id', verifyUser, deleteCategory, async (req, res) => {
  res.render("category")
});
/* ==================================================================================== */



module.exports = router;
