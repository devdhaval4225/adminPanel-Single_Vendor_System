var router = require('express').Router();
const { verifyUser } = require("../middleware/user.auth");
const { insert, edit, show, userDelete, totalCount, showOne } = require("../controller/user.controller");
const upload = require("../utils/upload.image");

router.post('/insert', upload.single("image"), insert);
router.post('/user/:id', upload.single("image"), edit)
router.get('/show', show);
router.delete('/tables/:id', userDelete);
router.get('/', totalCount);
router.get('/profile/:id', showOne);



const { itemShow, itemById, deleteItem } = require("../controller/item.controller");
const { showOneCategory, showCategory, deleteCategory } = require("../controller/category.controller");
const { allContect, showContect } = require("../controller/contectus.controller");
const { testID, allTest, testDelete } = require("../controller/testimonial.controller");

//? HOME ROUTE
router.get('/', verifyUser, totalCount, async (req, res) => {
  total = req.total
  res.render('dashboard.ejs', { total });
});

//? LOG IN
router.get('/sign-in', async (req, res) => {
  res.render('sign-in.ejs', { title: 'Express' });
});







//  ============================================= INSERT =================================================================================

//? USER
router.get('/user', verifyUser, async (req, res) => {
  res.render('user.ejs');
});

//? ITEM
router.get('/itemInsert', verifyUser, async (req, res) => {
  res.render('itemInsert.ejs');
});

//? CATEGORY
router.get('/categoryInsert', verifyUser, async (req, res) => {
  res.render('categoryInsert.ejs');
});

//? TESTIMONIAL
router.get('/testimonialInsert', verifyUser, async (req, res) => {
  res.render("testimonialInsert.ejs")
})

//  ======================================================================================================================================




//* ======================================== All Data Show ======================================== 
//? USER
router.get('/tables', verifyUser, show, async (req, res) => {
  allUser = req.data
  res.render("tables", { allUser })
});

//? ITEM
router.get('/item', verifyUser, itemShow, async (req, res) => {
  item = req.item
  res.render('item.ejs', { item });
});

//? CATEGORY
router.get('/category', verifyUser, showCategory, async (req, res) => {
  categoryAll = req.category
  res.render('category.ejs', { categoryAll });
});

//? CONTECT_US
router.get('/contectus', verifyUser, allContect, async (req, res) => {
  contectAllData = req.all
  res.render('contectus.ejs', { contectAllData });
});

//? TESTIMONIAL
router.get('/testimonial', verifyUser, allTest, async (req, res) => {
  test = req.sTestimonial
  res.render('testimonial.ejs', { test });
});
//* ==================================================================================== 





//* ======================================== Edit By Id ===================================================================================
//? USER
router.get('/profile-view/:id', verifyUser, showOne, function (req, res, next) {
  one = req.nOne
  res.render("userEdit.ejs", { one });
});

//? ITEM
router.get('/item-view/:id', verifyUser, itemById, async (req, res) => {
  itemID = req.itembyid
  res.render('itemEdit.ejs', { itemID });
});

//? CATEGORY
router.get('/cate-view/:id', verifyUser, showOneCategory, async (req, res) => {
  cateID = req.cateOne
  res.render('categoryEdit.ejs', { cateID });
});

//? CONTECT_US
router.get('/cont-view/:id', verifyUser, showContect, async (req, res) => {
  CONTID = req.showC
  res.render('contectusEdit.ejs', { CONTID });
});

//! TESTIMONIAL
router.get('/testEdit/:id', verifyUser, testID, async (req, res) => {
  showIDTest = req.testId 
  res.render('testimonialEdit.ejs', { showIDTest });
});

//*  ======================================================================================================================================





//* ======================================== Show By Id ======================================== 

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

//? CONTECT_US
router.get('/contectusEdit/:id', verifyUser, showContect, async (req, res) => {
  CONTID = req.showC
  res.render('contectusEdit.ejs', { CONTID });
});

//* ============================================================================================ 




//* ======================================== Delete By Id ======================================== 
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

//! TESTIMONIAL
router.get("/testDelete/:id", verifyUser, testDelete, async (req, res) => {
  res.render("testimonial")
})
//* ============================================================================================ 



module.exports = router;
