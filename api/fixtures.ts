import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import User from "./models/User";
import Cocktail from "./models/Cocktail";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('cocktails');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [Admin, Artem] = await User.create({
    username: 'admin@gmail.com',
    password: '12345',
    token: crypto.randomUUID(),
    role: 'admin',
    displayName: 'Admin',
    avatar: 'fixtures/avatar.png',
  }, {
    username: 'artem@gmail.com',
    password: 'qwerty123',
    token: crypto.randomUUID(),
    displayName: 'Artem',
    avatar: 'fixtures/avatar.png',
  });

  await Cocktail.create({
    user: Artem._id,
    name: 'Long Island Iced Tea',
    image: 'fixtures/Long-Island.jpg',
    recipe: 'Fill a cocktail shaker with ice. Pour vodka, rum, gin, tequila, triple sec, and sour mix over ice, cover and shake.' +
      ' Pour cocktail into a Collins or hurricane glass, top with splash of cola for color. Garnish with a lemon slice.',
    ingredients: [{
      name: 'White rum',
      amount: '15ml',
    }, {
      name: 'Tequila',
      amount: '15ml',
    }, {
      name: 'Vodka',
      amount: '15ml',
    }, {
      name: 'Triple sec',
      amount: '15ml',
    }, {
      name: 'Gin',
      amount: '15ml',
    }, {
      name: 'Sour mix',
      amount: '30ml',
    }, {
      name: 'Cola',
      amount: '50ml',
    }, {
      name: 'Lime',
      amount: '2 slices',
    }],
    isPublished: true,
  }, {
    user: Admin._id,
    name: 'Margarita',
    image: 'fixtures/Margarita.webp',
    recipe: 'Tequila and triple sec combine in this fabulous margarita cocktail recipe, mixed with lime juice. ' +
      'Garnish the rim of the glass with salt for that extra punch.',
    ingredients: [{
      name: 'Ice',
      amount: '100 gram',
    }, {
      name: 'Tequila',
      amount: '50ml',
    }, {
      name: 'Lime Juice',
      amount: '25ml',
    }, {
      name: 'Triple sec',
      amount: '20ml',
    }, {
      name: 'Lime',
      amount: '2 slices',
    }],
    isPublished: true,
  }, {
    user: Artem._id,
    name: 'Mojito',
    image: 'fixtures/Mojito.webp',
    recipe: 'Place mint leaves and 1 lime wedge into a sturdy glass. Use a muddler and crush to release' +
      ' mint oils and lime juice. Add remaining lime wedges and 2 tablespoons sugar, and muddle again to ' +
      'release the lime juice. Do not strain the mixture. Fill the glass almost to the top with ice. Pour in rum and fill the glass with club soda.' +
      'Stir, taste, and add more sugar if desired.',
    ingredients: [{
      name: 'Fresh mint leaves',
      amount: '10 pieces',
    }, {
      name: 'White rum',
      amount: '1,5 fluid ounces',
    }, {
      name: 'Sugar',
      amount: '2 tablespoons',
    }, {
      name: 'Ice',
      amount: '1 cup',
    }, {
      name: 'Lime',
      amount: '3 wedges',
    }, {
      name: 'Club soda',
      amount: '0,5 cup',
    }],
    isPublished: false,
  });

  await db.close();
}

run().catch(console.error);
