require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Costume = require('./models/costume');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

(async () => {
  await connectDB();
  await Costume.deleteMany({});
  await User.deleteMany({});

  const costumes = [
    {
      title:'Red Velvet Gown',
      category:'Party',
      sizes:['S','M','L'],
      pricePerDay:500,
      deposit:1000,
      description:'Elegant red gown',
      images:['https://res.cloudinary.com/dpfeypetr/image/upload/v1756241769/redvelvet.png_iscla8.jpg'],
      quantityAvailable:3
    },
    {
      title:'Knight Armor (Kids)',
      category:'Cosplay',
      sizes:['XS','S'],
      pricePerDay:300,
      deposit:500,
      description:'Lightweight costume',
      images:['https://res.cloudinary.com/dpfeypetr/image/upload/v1756242035/knightarmor.png_u8imeg.jpg'],
      quantityAvailable:2
    },
    {
        title: 'White Sequin Bodycon Dress',
        category: 'Bodycons',
        sizes: ['S','M'],
        pricePerDay: 700,
        deposit: 1500,
        description: 'Stylish bodycon dress for parties',
        images: ['https://res.cloudinary.com/dpfeypetr/image/upload/v1756242018/whitebodycon_ibzcec.jpg'],
        quantityAvailable: 4
      },{
        title: 'Classic Black Blazer',
        category: 'Blazers',
        sizes: ['M','L','XL'],
        pricePerDay: 600,
        deposit: 1200,
        description: 'Formal black blazer for women',
        images: ['https://res.cloudinary.com/dpfeypetr/image/upload/v1756242049/blackblazor_ml0ebh.jpg'],
        quantityAvailable: 5
      },
       {
        title: 'Traditional Sherwani',
        category: 'Ethnic',
        sizes: ['M','L'],
        pricePerDay: 1000,
        deposit: 2000,
        description: 'Royal sherwani for weddings',
        images: ['https://res.cloudinary.com/dpfeypetr/image/upload/v1756242058/shervanimale_p9stwu.jpg'],
        quantityAvailable: 2
      },
      {
        title: 'Designer Lehenga',
        category: 'Ethnic',
        sizes: ['S','M','L'],
        pricePerDay: 1500,
        deposit: 3000,
        description: 'Beautiful lehenga with embroidery',
        images: ['https://res.cloudinary.com/dpfeypetr/image/upload/v1756242014/lehnga_v59gyy.jpg'],
        quantityAvailable: 3
      },
       {
        title: 'Saree',
        category: 'Ethnic',
        sizes: ['Free Size'],
        pricePerDay: 800,
        deposit: 2000,
        description: 'Elegant silk saree for festive occasions',
        images: ['https://res.cloudinary.com/dpfeypetr/image/upload/v1756242069/silksaree_qezzil.jpg'],
        quantityAvailable: 4
      },
      {
        title: 'Kurta set',
        category: 'Ethnic',
        sizes: ['M','L','XL'],
        pricePerDay: 400,
        deposit: 1000,
        description: 'Simple yet stylish kurta',
        images: ['https://res.cloudinary.com/dpfeypetr/image/upload/v1756242060/kurta_fm7rgy.jpg'],
        quantityAvailable: 6
      },
      {
        title: 'Fairy Princess Dress (Kids)',
        category: 'Kids',
        sizes: ['XS','S','M'],
        pricePerDay: 350,
        deposit: 700,
        description: 'Cute fairy princess dress with wings',
        images: ['https://res.cloudinary.com/dpfeypetr/image/upload/v1756242045/fairyprincess_jorzyx.jpg'],
        quantityAvailable: 3
      }
  ];
  await Costume.insertMany(costumes);

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('admin123', salt);
  const admin = new User({ name: 'Admin', email: 'admin@example.com', passwordHash, role: 'admin' });
  await admin.save();

  console.log('Seeded DB. Admin email: admin@example.com / password: admin123');
  process.exit(0);
})();
