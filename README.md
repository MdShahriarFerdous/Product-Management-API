# Product-Management-API

(1) **It is not mentioned in assignment but I have added
router.get("/products", authenticate, isAdmin, getProducts);
get ==> "/product" route will check if the user is registered or not + admin or not, then they can see all the products.

# Added a simple get ==> "/product" route inside comment as per assignment. 
// router.get("/products", getProducts);

(2) **When a user wii insert a product details they must have to be authenticate (Not mentioned in assignment)
router.post("/products", authenticate, insertProductDetails);
