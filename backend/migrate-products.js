// Migration script to import products from hardcoded data to database
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "yunojewels",
});

// Products data to migrate
const productsData = [
  {
    id: 1,
    name: "My Melody Bracelet",
    price: 5,
    category: "Bracelets",
    fandom: "Sanrio",
    color: "Pink",
    images: ["MyMelody.jpeg"]
  },
  {
    id: 2,
    name: "Kuromi Bracelet",
    price: 5,
    category: "Bracelets",
    fandom: "Sanrio",
    color: "Purple",
    images: ["Kuromi1.jpeg"]
  },
  {
    id: 3,
    name: "Cinnamoroll Bracelet",
    price: 5,
    category: "Bracelets",
    fandom: "Sanrio",
    color: "Blue",
    images: ["Cinnamoroll.jpeg"]
  },
  {
    id: 4,
    name: "Pochacco Bracelet",
    price: 5,
    category: "Bracelets",
    fandom: "Sanrio",
    color: "Black",
    images: ["Pochacco.jpeg"]
  },
  {
    id: 5,
    name: "Pompompurin Bracelet",
    price: 5,
    category: "Bracelets",
    fandom: "Sanrio",
    color: "Yellow",
    images: ["Pompompurin.jpeg"]
  },
  {
    id: 6,
    name: "Keroppi Bracelet",
    price: 5,
    category: "Bracelets",
    fandom: "Sanrio",
    color: "Green",
    images: ["Keroppi.jpeg"]
  },
  {
    id: 7,
    name: "Strawberry Earrings",
    price: 3,
    category: "Earrings",
    fandom: "",
    color: "Red",
    images: ["earrings.jpg", "earrings1.jpg"]
  },
  {
    id: 8,
    name: "Periwinkle Bow Keychain",
    price: 6,
    category: "Keychains",
    fandom: "",
    color: "Blue",
    images: ["PeriwinkleBowKeychain.jpg", "PeriwinkleBowKeychain2.jpg"]
  },
  {
    id: 9,
    name: "Lilac Bow Keychain",
    price: 6,
    category: "Keychains",
    fandom: "",
    color: "Purple",
    images: ["LilacBowKeychain.jpg", "LilacBowKeychain2.jpg"]
  },
  {
    id: 10,
    name: "Geto and Gojo Matching Bracelets",
    price: 6,
    category: "Bracelets",
    fandom: "Jujutsu Kaisen",
    color: "",
    images: ["GegoBracelets.jpg"]
  },
  {
    id: 11,
    name: "Sylus Bracelet",
    price: 4,
    category: "Bracelets",
    fandom: "Love and Deepspace",
    color: "Red",
    images: ["sylus.jpeg"]
  },
  {
    id: 12,
    name: "Caleb Bracelet",
    price: 4,
    category: "Bracelets",
    fandom: "Love and Deepspace",
    color: "Red",
    images: ["caleb.jpeg"]
  },
  {
    id: 13,
    name: "Rafayel Bracelet",
    price: 4,
    category: "Bracelets",
    fandom: "Love and Deepspace",
    color: "Pink",
    images: ["rafayel.jpeg"]
  },
  {
    id: 14,
    name: "Xavier Bracelet",
    price: 4,
    category: "Bracelets",
    fandom: "Love and Deepspace",
    color: "Blue",
    images: ["xavier.jpeg"]
  },
  {
    id: 15,
    name: "Zayne Bracelet",
    price: 4,
    category: "Bracelets",
    fandom: "Love and Deepspace",
    color: "Blue",
    images: ["zayne.jpeg"]
  },
  {
    id: 16,
    name: "Peach Bow Keychain",
    price: 6,
    category: "Keychains",
    fandom: "",
    color: "Pink",
    images: ["PeachBowKeychain.jpeg", "PeachBowKeychain2.jpeg"]
  },
  {
    id: 17,
    name: "Pink Bow Keychain",
    price: 6,
    category: "Keychains",
    fandom: "",
    color: "Pink",
    images: ["PinkBowKeychain.jpeg", "PinkBowKeychain2.jpeg"]
  },
  {
    id: 18,
    name: "Yellow Bow Keychain",
    price: 6,
    category: "Keychains",
    fandom: "",
    color: "Yellow",
    images: ["YellowBowKeychain.jpeg", "YellowBowKeychain2.jpeg"]
  },
  {
    id: 19,
    name: "Stars Phone Charms",
    price: 5,
    category: "Keychains",
    fandom: "",
    color: "",
    images: ["StarPhoneCharms.jpeg", "StarPhoneCharms2.jpeg"]
  },
  {
    id: 20,
    name: "Butterfly Necklace",
    price: 5,
    category: "Necklaces",
    fandom: "",
    color: "Blue",
    images: ["Necklace.jpeg", "Necklace2.jpeg"]
  }
];

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    process.exit(1);
  }
  console.log("✅ MySQL Connected");

  // Clear existing products (optional - comment out if you want to keep existing data)
  db.query("DELETE FROM products", (err) => {
    if (err) {
      console.error("❌ Failed to clear products:", err);
    } else {
      console.log("🧹 Cleared existing products");
    }

    // Insert products
    const insertPromises = productsData.map((product) => {
      return new Promise((resolve, reject) => {
        const sql = "INSERT INTO products (id, name, price, category, fandom, color, images) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const imagesJson = JSON.stringify(product.images);
        
        db.query(sql, [product.id, product.name, product.price, product.category, product.fandom, product.color, imagesJson], (err, result) => {
          if (err) {
            console.error(`❌ Failed to insert ${product.name}:`, err.message);
            reject(err);
          } else {
            console.log(`✅ Inserted: ${product.name}`);
            resolve(result);
          }
        });
      });
    });

    Promise.all(insertPromises)
      .then(() => {
        console.log("\n🎉 Migration completed successfully!");
        db.end();
      })
      .catch((err) => {
        console.error("\n❌ Migration failed:", err);
        db.end();
      });
  });
});
