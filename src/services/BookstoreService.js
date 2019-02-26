export default class BookstoreService {
  data = [
    {
      id: 1,
      title: "ES6 & Beyond",
      author: "Kyle Simpson",
      price: 11,
      coverImage:
        "https://d188rgcu4zozwl.cloudfront.net/content/B019HRGOPQ/resources/998206158"
    },
    {
      id: 2,
      title: "Async & Performance",
      author: "Kyle Simpson",
      price: 14,
      coverImage:
        "https://d188rgcu4zozwl.cloudfront.net/content/B00TXVCJ7O/resources/1104122073"
    },
    {
      id: 3,
      title: "Scope & Closures",
      author: "Kyle Simpson",
      price: 12,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/41mXGJV8PbL._SX331_BO1,204,203,200_.jpg"
    },
    {
      id: 4,
      title: "this & Object Prototypes",
      author: "Kyle Simpson",
      price: 20,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/51yxb7ke2vL._SX331_BO1,204,203,200_.jpg"
    },
    {
      id: 5,
      title: "Up & Going",
      author: "Kyle Simpson",
      price: 8,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/41L18FvA5rL._SX331_BO1,204,203,200_.jpg"
    },
    {
      id: 6,
      title: "Types & Grammar",
      author: "Kyle Simpson",
      price: 18,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/41cRygYTmeL._SX331_BO1,204,203,200_.jpg"
    }
  ];

  getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve(this.data);
        } else {
          reject(new Error("Something was error"));
        }
      }, 1000);
    });
  }
}
