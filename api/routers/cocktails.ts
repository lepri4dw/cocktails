import express from "express";
import Cocktail from "../models/Cocktail";
import user from "../middleware/user";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import permit from "../middleware/permit";

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', user, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (user && user.role === 'admin') {
      const cocktails = await Cocktail.find({}, 'image name isPublished');
      return res.send(cocktails);
    }

    const cocktails = await Cocktail.find({isPublished: true}, 'image name isPublished');
    return res.send(cocktails);
  } catch (e) {
    return next(e);
  }
});

cocktailsRouter.get('/one/:id', async (req, res, next) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) {
      return res.sendStatus(404);
    }

    return res.send(cocktail);
  } catch (e) {
    return next(e);
  }
});

cocktailsRouter.get('/user', auth, async (req, res, next) => {
  try {
     const user = (req as RequestWithUser).user;

     const cocktails = await Cocktail.find({ user: user._id });
     return res.send(cocktails);
  } catch (e) {
    return next(e);
  }
});

// cocktailsRouter.get('/by-user/', auth, async (req, res, next) => {
//   try {
//     const user = (req as RequestWithUser).user;
//
//     const cocktails = await Cocktail.find({ user: user._id });
//     console.log(user, cocktails);
//     return res.send(cocktails);
//   } catch (e) {
//     return next(e);
//   }
// });

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const cocktail = await Cocktail.create({
      name: req.body.name,
      recipe: req.body.recipe,
      user: user._id,
      ingredients: JSON.parse(req.body.ingredients),
      image: req.file ? req.file.filename : null,
    });

    return res.send(cocktail);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) {
      return res.sendStatus(404);
    }

    cocktail.isPublished = !cocktail.isPublished;

    await cocktail.save();
    return res.send({message: 'Album was published!'});
  } catch (e) {
    return next(e);
  }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    await Cocktail.deleteOne({_id: req.params.id});
    return res.send({message: 'Deleted'});
  } catch (e) {
    return next(e);
  }
});

export default cocktailsRouter;
