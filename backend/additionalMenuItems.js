const imagePool = [
  'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&auto=format&fit=crop',
  'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900&auto=format&fit=crop',
];

const biryaniImagePool = [
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Biryani_chicken.jpg/960px-Biryani_chicken.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/A_home_made_plate_of_mutton_biryani_served_with_chicken_kassa_cooked_in_the_bengali_style.jpg/960px-A_home_made_plate_of_mutton_biryani_served_with_chicken_kassa_cooked_in_the_bengali_style.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Egg_Biryani_in_a_restaurant.jpg/960px-Egg_Biryani_in_a_restaurant.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Biryani_1.jpg/960px-Biryani_1.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Vegetable_Biryani_IMG_001.jpg/960px-Vegetable_Biryani_IMG_001.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Biryani_from_Tamilnadu.jpg/960px-Biryani_from_Tamilnadu.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Biryani_from_Tamilnadu_2.jpg/960px-Biryani_from_Tamilnadu_2.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/960px-%22Hyderabadi_Dum_Biryani%22.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Biryani_2.jpg/960px-Biryani_2.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Chicken_Biryani_with_Banana_and_Salad.jpg/960px-Chicken_Biryani_with_Banana_and_Salad.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Biryani_from_kolkata.jpg/960px-Biryani_from_kolkata.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Biryani_from_Kolkata_2.jpg/960px-Biryani_from_Kolkata_2.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Biryani_ready_to_serve.JPG/960px-Biryani_ready_to_serve.JPG',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Biryani_rice.JPG/960px-Biryani_rice.JPG',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Shrimp_Biriyani.JPG/960px-Shrimp_Biriyani.JPG',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Biryani_with_chicken.jpg/960px-Biryani_with_chicken.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Chicken_Dum_Biryani_03.jpg/960px-Chicken_Dum_Biryani_03.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Dum_Biryani_Plate.jpg/960px-Dum_Biryani_Plate.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Biryani_Kebab_onionsF.jpg/960px-Biryani_Kebab_onionsF.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Biryani_Kebab_vegiesD.jpg/960px-Biryani_Kebab_vegiesD.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Biryani_in_Hyderabad.jpg/960px-Biryani_in_Hyderabad.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Biryani_in_khartoum.JPG/960px-Biryani_in_khartoum.JPG',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Biryani_lahore.jpg/960px-Biryani_lahore.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Biryani_of_Lahore.jpg/960px-Biryani_of_Lahore.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Biryani_rice_3.JPG/960px-Biryani_rice_3.JPG',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Biryani_BY_Fatima.jpg/960px-Biryani_BY_Fatima.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Biryani_By_Fatima.jpg/960px-Biryani_By_Fatima.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Kacchi_Biryani_with_Jali_Kabab.jpg/960px-Kacchi_Biryani_with_Jali_Kabab.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Kacchi_Biryani_01.jpg/960px-Kacchi_Biryani_01.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Kacchi_Biryani_04.jpg/960px-Kacchi_Biryani_04.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Kacchi_Biryani_Homemade.jpg/960px-Kacchi_Biryani_Homemade.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Kacchi_Biryani_and_Borhani.jpg/960px-Kacchi_Biryani_and_Borhani.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Lahori_Biryani%2C_Folk_Cuisine_of_Pakistan.jpg/960px-Lahori_Biryani%2C_Folk_Cuisine_of_Pakistan.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Lamb_Biryani_-_Biryani_House_AUD8.50_%283643374430%29.jpg/960px-Lamb_Biryani_-_Biryani_House_AUD8.50_%283643374430%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/1e/Biryani_Raita.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/Biryani_Rice.jpg/960px-Biryani_Rice.jpg',
];

const categoryItems = {
  Biryani: [
    ['Chicken Biryani', 180], ['Mutton Biryani', 260], ['Egg Biryani', 140], ['Fish Biryani', 240],
    ['Vegetable Biryani', 150], ['Ambur Chicken Biryani', 220], ['Dindigul Chicken Biryani', 230],
    ['Hyderabadi Chicken Biryani', 240], ['Thalassery Biryani', 220], ['Donne Biryani', 210],
    ['Kolkata Chicken Biryani', 230], ['Malabar Chicken Biryani', 240], ['Mughlai Chicken Biryani', 250],
    ['Paneer Biryani', 170], ['Mushroom Biryani', 160], ['Prawn Biryani', 280],
    ['Chicken 65 Biryani', 220], ['Special Chicken Biryani', 300], ['Family Chicken Biryani', 420],
    ['Mini Chicken Biryani', 120],
    ['Hyderabadi Mutton Biryani', 300], ['Ambur Mutton Biryani', 280], ['Dindigul Mutton Biryani', 290],
    ['Thalappakatti Chicken Biryani', 260], ['Thalappakatti Mutton Biryani', 320],
    ['Chettinad Chicken Biryani', 250], ['Chettinad Mutton Biryani', 310], ['Malabar Mutton Biryani', 300],
    ['Kolkata Mutton Biryani', 290], ['Lucknowi Chicken Biryani', 260], ['Lucknowi Mutton Biryani', 320],
    ['Mughlai Mutton Biryani', 330], ['Tandoori Chicken Biryani', 280], ['Pepper Chicken Biryani', 250],
    ['Special Mutton Biryani', 360], ['Egg Chicken Biryani', 210],
  ],
  'South Indian': [
    ['Masala Dosa', 80], ['Plain Dosa', 65], ['Ghee Roast Dosa', 130], ['Onion Dosa', 95],
    ['Rava Dosa', 100], ['Onion Rava Dosa', 110], ['Podi Dosa', 90], ['Mysore Masala Dosa', 120],
    ['Set Dosa', 100], ['Neer Dosa', 95], ['Idli', 50], ['Kanchipuram Idli', 80],
    ['Podi Idli', 75], ['Mini Idli', 70], ['Idiyappam', 100], ['Appam', 90], ['Egg Appam', 130],
    ['Vegetable Uttapam', 110], ['Onion Uttapam', 105], ['Tomato Uttapam', 105], ['Podi Uttapam', 115],
    ['Ven Pongal', 95], ['Lemon Rice', 80], ['Tamarind Rice', 85], ['Curd Rice', 80],
    ['Tomato Rice', 85], ['Coconut Rice', 90], ['Vegetable Upma', 75], ['Rava Upma', 70], ['Medu Vada', 65],
  ],
  'North Indian': [
    ['Butter Chicken', 240], ['Kadai Chicken', 230], ['Chicken Tikka Masala', 250], ['Chicken Handi', 260],
    ['Chicken Do Pyaza', 240], ['Chicken Lababdar', 270], ['Chicken Korma', 260], ['Chicken Saagwala', 250],
    ['Chicken Rara', 280], ['Tandoori Chicken', 260], ['Chicken Tikka', 220], ['Malai Chicken Tikka', 240],
    ['Mutton Rogan Josh', 320], ['Mutton Korma', 330], ['Mutton Do Pyaza', 320], ['Mutton Handi', 340],
    ['Mutton Masala', 330], ['Mutton Keema', 300], ['Mutton Nihari', 350], ['Dal Makhani', 160],
    ['Dal Tadka', 120], ['Dal Fry', 110], ['Rajma Masala', 130], ['Chole Masala', 120],
    ['Paneer Butter Masala', 150], ['Kadai Paneer', 160], ['Shahi Paneer', 170], ['Palak Paneer', 155],
    ['Matar Paneer', 150], ['Paneer Tikka Masala', 190], ['Paneer Lababdar', 180], ['Malai Kofta', 180],
    ['Navratan Korma', 190], ['Aloo Gobi', 120], ['Aloo Matar', 120], ['Baingan Bharta', 130],
    ['Jeera Aloo', 110], ['Mix Vegetable Curry', 140], ['Vegetable Korma', 160], ['Dum Aloo', 150],
    ['Butter Naan', 50], ['Garlic Naan', 60], ['Plain Naan', 45], ['Tandoori Roti', 40],
    ['Missi Roti', 55], ['Lachha Paratha', 75], ['Aloo Paratha', 100], ['Paneer Paratha', 130],
    ['Amritsari Kulcha', 140], ['Stuffed Kulcha', 150],
  ],
  Pizza: [
    ['Margherita Pizza', 220], ['Farmhouse Pizza', 260], ['Veggie Supreme Pizza', 250], ['Paneer Tikka Pizza', 280],
    ['Corn Cheese Pizza', 230], ['Mushroom Pizza', 240], ['Chicken Tikka Pizza', 300], ['Chicken Pepperoni Pizza', 340],
    ['BBQ Chicken Pizza', 320], ['Chicken Supreme Pizza', 350],
  ],
  Beverages: [
    ['Masala Tea', 50], ['Ginger Tea', 55], ['Cardamom Tea', 60], ['Black Tea', 45], ['Green Tea', 60],
    ['Filter Coffee', 70], ['Cold Coffee', 120], ['Cappuccino', 140], ['Espresso', 100], ['Hot Chocolate', 150],
    ['Fresh Lime Soda', 80], ['Sweet Lime Juice', 90], ['Orange Juice', 100], ['Apple Juice', 110],
    ['Watermelon Juice', 90], ['Mango Juice', 100], ['Pineapple Juice', 110], ['Strawberry Milkshake', 160],
    ['Chocolate Milkshake', 160], ['Mango Milkshake', 150],
  ],
  Desserts: [
    ['Gulab Jamun', 80], ['Rasgulla', 90], ['Jalebi', 85], ['Brownie', 140], ['Chocolate Cake', 180],
    ['Ice Cream', 100], ['Kulfi', 110], ['Falooda', 180], ['Carrot Halwa', 120], ['Gajar Halwa', 120],
    ['Rasmalai', 150], ['Kheer', 100], ['Fruit Salad', 110], ['Chocolate Mousse', 160], ['Cheesecake', 220],
  ],
  Chinese: [
    ['Veg Fried Rice', 140], ['Chicken Fried Rice', 180], ['Egg Fried Rice', 160], ['Schezwan Fried Rice', 170],
    ['Veg Noodles', 130], ['Chicken Noodles', 180], ['Hakka Noodles', 150], ['Schezwan Noodles', 170],
    ['Gobi Manchurian', 150], ['Chicken Manchurian', 210], ['Paneer Manchurian', 180], ['Chilli Chicken', 220],
    ['Chilli Paneer', 180], ['Spring Rolls', 130], ['Dragon Chicken', 240],
  ],
  'Fast Food': [
    ['Veg Burger', 120], ['Chicken Burger', 160], ['Cheese Burger', 150], ['Paneer Burger', 150],
    ['French Fries', 100], ['Peri Peri Fries', 120], ['Chicken Nuggets', 170], ['Chicken Sandwich', 160],
    ['Veg Sandwich', 110], ['Grilled Sandwich', 140], ['Chicken Wrap', 180], ['Paneer Wrap', 160],
    ['Chicken Shawarma', 190], ['Veg Roll', 100], ['Chicken Roll', 150],
  ],
  Snacks: [
    ['Samosa', 40], ['Onion Pakoda', 60], ['Paneer Pakoda', 100], ['Chicken 65', 180], ['Chicken Wings', 220],
    ['French Fries', 100], ['Masala Vada', 45], ['Bajji', 50], ['Bonda', 45], ['Cutlet', 70],
    ['Corn', 80], ['Pani Puri', 70], ['Bhel Puri', 80], ['Masala Peanuts', 60], ['Spring Roll', 130],
  ],
};

let itemNumber = 1;
const additionalMenuItems = Object.entries(categoryItems).flatMap(([category, items]) => items.map(([name, price], index) => ({
  _id: `additional-${itemNumber++}`,
  restaurant: `r${(index % 3) + 1}`,
  name,
  category,
  description: `${name} prepared with fresh ingredients and traditional flavors.`,
  price,
  image: category === 'Biryani'
    ? `/biryani/${index + 1}.jpg`
    : category === 'South Indian'
      ? `/south-indian/${index + 1}.jpg`
      : category === 'North Indian'
        ? `/north-indian/${index + 1}.jpg`
        : category === 'Pizza'
          ? `/pizza/${index + 1}.jpg`
      : category === 'Beverages'
        ? `/beverages/${index + 1}.jpg`
      : category === 'Fast Food' && name === 'Paneer Burger'
        ? '/fast-food/paneer-burger.jpg'
      : category === 'Fast Food' && name === 'Paneer Wrap'
        ? '/fast-food/paneer-wrap.jpg'
      : category === 'Snacks' && name === 'Masala Vada'
        ? '/snacks/masala-vada.jpg'
      : category === 'Snacks' && name === 'Paneer Pakoda'
        ? '/snacks/paneer-pakoda.jpg'
    : imagePool[(itemNumber + index) % imagePool.length],
})));

module.exports = additionalMenuItems;
