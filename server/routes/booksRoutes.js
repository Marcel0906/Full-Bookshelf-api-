import express from "express";
import Books from "../model/Books.js";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.json());

router
  .get("/", async (req, res) => {
    try {
      const books = await Books.find();
      res.send(books);
    } catch (error) {
      res.send({ message: error });
    }
  })
  .post("/", async (req, res) => {
    const books = await Books.create({
      title: req.body.title, // title is the key in the request body
      author: req.body.author,
      country: req.body.country,
      imageLink: req.body.imageLink,
      language: req.body.language,
      link: req.body.link,
      year: req.body.year,
      pages: req.body.pages,
    });
 
    try {
      // const response = {
      //   title: result.title, // title is the key in the request body
      //   author: result.author,
      //   country: result.country,
      //   imageLink: result.imageLink,
      //   language: result.language,
      //   link: result.link,
      //   year: result.year,
      //   pages: result.pages,
      // };
      res.send(books);
      console.log(books);
    } catch (error) {
      res.send(error);
    }
  })
  .delete("/", async (req, res) => {
    try {
      const result = await Books.deleteMany({});
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  });

router
  .get("/:id", async (req, res) => {
    // logic for getting a single book
    const booksID = req.params.id;
    try {
      const result = await Books.findById({ _id: booksID });
      res.send(result);
    } catch (error) {
      res.status(404).send("Doesn't exist");
    }
  })
  .put("/:id", async (req, res) => {
    
    try {
      const booksID = req.params.id;
      const result = await Books.findByIdAndUpdate(booksID, {
          title: req.body.title, // title is the key in the request body
          author: req.body.author,
          country: req.body.country,
          imageLink: req.body.imageLink,
          language: req.body.language,
          link: req.body.link,
          year: req.body.year,
          created_at: req.body.created_at,
          updated_at: req.body.updated_at,
          pages: req.body.pages,
        }
      );
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  })
  .delete("/:id", async (req, res) => {
    // logic for deleting a book
    try {
      const booksID = req.params.id;
      await Books.findByIdAndDelete(booksID);
      res.send(`Delete was successfully ${booksID}`);
    } catch (error) {
      res.send(error);
    }
  });

// router.put("/", async (req, res) => {
//   try {
//     const result = await Books.replaceOne({});
//   } catch (error) {}
// });

export default router;
