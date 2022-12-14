const router = require("express").Router();
const { Category } = require("../../../db/models");
const { Item } = require("../../../db/models");
const { WishList } = require("../../../db/models");
router.post("/", async (req, res) => {
  console.log(req.body);
  const numItems = 10;
  const { page, category } = req.body;
  const fixNumberCategory = +category;
  console.log('fixNumberCategory', fixNumberCategory);
  const nextitems = page * numItems - numItems;
  const items = await Item.findAll({
    where: { category_id: fixNumberCategory },
    raw: true,
    offset: nextitems,
    limit: numItems,
  }); 
  // { offset: 5, limit: 5 }
  const itemsNum = await Item.findAll({
    where: { category_id: fixNumberCategory },
    raw: true,
  });
  if(req.session.newUserId){
    const likes = await WishList.findAll({where: { user_id: req.session.newUserId}, raw: true })
  console.log("LIKES", likes);
    const likedItems = items.map(item => {
      likes.forEach(like => {

        if (like.item_id === item.id) {
        
          item.liked = true;

        }

      });
      return item;
    })
    console.log('LIKEDITEMS!!',likedItems);
    res.json({ likedItems, length: itemsNum.length });
  } else{
    const likedItems = items
    res.json({ likedItems, length: itemsNum.length });
  }
});
module.exports = router;











