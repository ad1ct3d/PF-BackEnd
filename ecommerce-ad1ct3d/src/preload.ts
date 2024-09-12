import { DataSource, getRepository } from 'typeorm';
import { Product } from './products/products.entity';
import { Category } from './Categories/categories.entity';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const products = [
  {
    name: 'Dragonslayer Sword',
    description: "Guts's legendary sword, capable of cutting through anything.",
    price: 199.99,
    stock: true,
    category: 'weapon',
    imgUrl: 'https://example.com/dragonslayer.jpg',
  },
  {
    name: 'Berserker Armor',
    description: 'The armor that grants immense power at the cost of sanity.',
    price: 150.0,
    stock: true,
    category: 'armor',
    imgUrl: 'https://example.com/berserker_armor.jpg',
  },
  {
    name: 'Behelit',
    description: 'A mysterious artifact with the power to summon the God Hand.',
    price: 179.89,
    stock: true,
    category: 'artifact',
    imgUrl: 'https://example.com/behelit.jpg',
  },
  {
    name: "Guts' Cannon Arm",
    description: "A powerful cannon embedded in Guts' prosthetic arm.",
    price: 299.99,
    stock: true,
    category: 'weapon',
    imgUrl: 'https://example.com/cannon_arm.jpg',
  },
  {
    name: 'Brand of Sacrifice',
    description:
      'A mark that signifies being chosen as a sacrifice for the God Hand.',
    price: 199.99,
    stock: true,
    category: 'mark',
    imgUrl: 'https://example.com/brand_of_sacrifice.jpg',
  },
  {
    name: "Griffith's Helmet",
    description:
      'The iconic helmet worn by Griffith, leader of the Band of the Hawk.',
    price: 150.0,
    stock: true,
    category: 'armor',
    imgUrl: 'https://example.com/griffith_helmet.jpg',
  },
  {
    name: "Casca's Sword",
    description: 'The weapon of choice for the fierce warrior Casca.',
    price: 99.99,
    stock: true,
    category: 'weapon',
    imgUrl: 'https://example.com/casca_sword.jpg',
  },
  {
    name: "Skull Knight's Shield",
    description: 'The shield carried by the enigmatic Skull Knight.',
    price: 79.99,
    stock: true,
    category: 'armor',
    imgUrl: 'https://example.com/skull_knight_shield.jpg',
  },
  {
    name: "Zodd's Horns",
    description: 'The fearsome horns of the apostle Nosferatu Zodd.',
    price: 59.99,
    stock: true,
    category: 'artifact',
    imgUrl: 'https://example.com/zodd_horns.jpg',
  },
  {
    name: "Puck's Elf Dust",
    description: 'Healing dust from the elf companion Puck.',
    price: 49.99,
    stock: true,
    category: 'healing',
    imgUrl: 'https://example.com/puck_elf_dust.jpg',
  },
  {
    name: "Farnese's Whip",
    description: 'The whip used by Farnese during her time with the Holy See.',
    price: 39.99,
    stock: true,
    category: 'weapon',
    imgUrl: 'https://example.com/farnese_whip.jpg',
  },
  {
    name: "Serpico's Rapier",
    description: 'The elegant rapier wielded by Serpico.',
    price: 29.99,
    stock: true,
    category: 'weapon',
    imgUrl: 'https://example.com/serpico_rapier.jpg',
  },
];

async function seedDB() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const productsRepository = dataSource.getRepository(Product);
  const categoryRepository = dataSource.getRepository(Category);

  for (const productData of products) {
    let category = await categoryRepository.findOne({
      where: { name: productData.category },
    });
    if (!category) {
      category = categoryRepository.create({ name: productData.category });
      await categoryRepository.save(category);
    }

    const product = productsRepository.create({
      name: productData.name,
      description: productData.description,
      price: Number(productData.price),
      stock: productData.stock,
      imgUrl: productData.imgUrl,
      category: category,
      orderDetail: [],
    });

    await productsRepository.save(product);
  }

  console.log('Database seeding completed');
}

seedDB().catch((err) => {
  console.error('Error during DB seeding', err);
});
