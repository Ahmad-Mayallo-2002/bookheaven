"use client";

interface data {
  token: string;
  id: string;
  role: string;
}

interface aboutData {
  head: string;
  paragraph: string;
}

export interface Book {
  createdAt: any;
  url: string;
  title: string;
  author: string;
  price: number;
  language: string;
  desc?: string;
  _id: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  role?: string;
  password: string;
  confirmPassword: string;
}

export interface ErrorMessage {
  msg: string;
}

export interface Order {
  _id: string;
  book: Book;
  user: User;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface LinkObject {
  name: string;
  path: string;
  icon?: any;
}

const aboutData: aboutData[] = [
  {
    head: "About Us",
    paragraph:
      "Welcome to Book Heaven, your gateway to the world of stories, knowledge, and imagination. Whether you're a voracious reader, a curious learner, or just someone looking for that next great book, we are here to serve your literary needs.",
  },
  {
    head: "Our Story",
    paragraph:
      "Founded in 2002, Book Heaven was born out of a passion for books and the joy they bring. What started as a small collection of beloved titles has grown into a vibrant community of readers and authors alike. We believe that every book has the power to change lives, and our mission is to make these transformative experiences accessible to everyone.",
  },
  {
    head: "What We Offer",
    paragraph:
      "At Book Heaven, we curate a diverse selection of books across genres and interests. From timeless classics to the latest bestsellers, our shelves are stocked with titles that cater to all kinds of readers. Whether you’re into fiction, non-fiction, self-help, or academic literature, you’ll find something that resonates with you.",
  },
  {
    head: "Why Choose Us?",
    paragraph:
      "We’re not just a bookstore; we’re a community. Here, you can discover books that inspire, engage in conversations that matter, and connect with fellow readers who share your love for literature. Our friendly and knowledgeable staff are always on hand to help you find your next favorite read or recommend something new.",
  },
  {
    head: "Our Commitment",
    paragraph:
      "We are committed to promoting literacy and a love for reading. That's why we host regular book signings, author talks, and community events to bring readers and writers together. We also support local authors and offer a platform for new voices to be heard.",
  },
  {
    head: "Join Us",
    paragraph:
      "Whether you’re visiting us online or in-store, we invite you to explore our collection and become a part of our reading community. Let’s celebrate the magic of books together!",
  },
];

const defaultUserImage: string =
  "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";

const mainUrl: string = "https://bookheaven-api.vercel.app/api";

function getLocalStorageData(): data {
  if (typeof window !== "undefined") {
    const userDataObject: string | null =
      localStorage.getItem("userAuthentication");

    const data: data = userDataObject
      ? JSON.parse(userDataObject)
      : { token: "", id: "", role: "" };
    return data;
  }

  return { token: "", id: "", role: "" };
}

function converImageToBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
}

export { mainUrl, defaultUserImage, converImageToBase64, aboutData };
export default getLocalStorageData;
