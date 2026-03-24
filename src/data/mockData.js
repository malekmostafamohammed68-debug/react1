// ====================================================
//  Mock Data Store — simulates a backend API locally
// ====================================================

export const currentUser = {
  _id: "me",
  name: "Ahmed Mohamed",
  email: "ahmed@example.com",
  photo: "https://i.pravatar.cc/150?u=me",
  bio: "Software Engineer 👨‍💻 | Coffee Lover ☕ | Cairo, Egypt 🇪🇬",
  coverPhoto: "https://picsum.photos/seed/cover1/1200/400",
  friends: 248,
  posts_count: 12,
  joined: "January 2020",
};

export const suggestedFriends = [
  { _id: "u1", name: "Sara Ahmed",   photo: "https://i.pravatar.cc/150?u=sara",   mutualFriends: 12 },
  { _id: "u2", name: "Mohamed Ali",  photo: "https://i.pravatar.cc/150?u=moali",  mutualFriends: 8  },
  { _id: "u3", name: "Nour Hassan",  photo: "https://i.pravatar.cc/150?u=nour",   mutualFriends: 5  },
  { _id: "u4", name: "Omar Khaled",  photo: "https://i.pravatar.cc/150?u=omar",   mutualFriends: 3  },
  { _id: "u5", name: "Hana Tarek",   photo: "https://i.pravatar.cc/150?u=hana",   mutualFriends: 7  },
];

export const allUsers = [
  { _id: "me",  name: "Ahmed Mohamed",  photo: "https://i.pravatar.cc/150?u=me"    },
  { _id: "u1",  name: "Sara Ahmed",     photo: "https://i.pravatar.cc/150?u=sara"  },
  { _id: "u2",  name: "Mohamed Ali",    photo: "https://i.pravatar.cc/150?u=moali" },
  { _id: "u3",  name: "Nour Hassan",    photo: "https://i.pravatar.cc/150?u=nour"  },
  { _id: "u4",  name: "Omar Khaled",    photo: "https://i.pravatar.cc/150?u=omar"  },
  { _id: "u5",  name: "Hana Tarek",     photo: "https://i.pravatar.cc/150?u=hana"  },
];

let _posts = [
  {
    _id: "p1",
    body: "Just finished a great React project! 🚀 So excited to share it with everyone. The features are amazing and the UI looks fantastic!",
    image: "https://picsum.photos/seed/p1/800/500",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    likes: 42,
    liked: false,
    user: { _id: "u1", name: "Sara Ahmed", photo: "https://i.pravatar.cc/150?u=sara" },
    comments: [
      { _id: "c1", content: "This looks amazing! 🔥", commentCreator: { _id: "u2", name: "Mohamed Ali", photo: "https://i.pravatar.cc/150?u=moali" } },
      { _id: "c2", content: "Can't wait to try it!", commentCreator: { _id: "u3", name: "Nour Hassan", photo: "https://i.pravatar.cc/150?u=nour" } },
    ],
  },
  {
    _id: "p2",
    body: "Beautiful day in Cairo 🌅 Went to the Nile Corniche today and the view was just breathtaking. Nature never disappoints!",
    image: "https://picsum.photos/seed/p2/800/500",
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    likes: 87,
    liked: false,
    user: { _id: "u2", name: "Mohamed Ali", photo: "https://i.pravatar.cc/150?u=moali" },
    comments: [
      { _id: "c3", content: "Cairo is always beautiful 💙", commentCreator: { _id: "u4", name: "Omar Khaled", photo: "https://i.pravatar.cc/150?u=omar" } },
    ],
  },
  {
    _id: "p3",
    body: "Learning something new every day! Today I explored TailwindCSS and it's absolutely mind-blowing. Productivity has gone up 10x! 💪",
    image: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    likes: 31,
    liked: false,
    user: { _id: "u3", name: "Nour Hassan", photo: "https://i.pravatar.cc/150?u=nour" },
    comments: [],
  },
  {
    _id: "p4",
    body: "Friday vibes! 🎉 Weekend is here and I'm ready to relax. What are your plans for the weekend? Drop them in the comments!",
    image: "https://picsum.photos/seed/p4/800/500",
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    likes: 55,
    liked: false,
    user: { _id: "u4", name: "Omar Khaled", photo: "https://i.pravatar.cc/150?u=omar" },
    comments: [
      { _id: "c4", content: "Staying home and coding! 😄", commentCreator: { _id: "me", name: "Ahmed Mohamed", photo: "https://i.pravatar.cc/150?u=me" } },
    ],
  },
  {
    _id: "p5",
    body: "Just cooked my first homemade pasta from scratch 🍝 It turned out better than I expected! Who knew cooking could be this fun?",
    image: "https://picsum.photos/seed/p5/800/500",
    createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    likes: 120,
    liked: false,
    user: { _id: "u5", name: "Hana Tarek", photo: "https://i.pravatar.cc/150?u=hana" },
    comments: [],
  },
];

// ─── CRUD helpers ────────────────────────────────────────────────────────────

export function getPosts() {
  return [..._posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getUserById(id) {
  if (!id || id === "me") return currentUser;
  
  // Search in all potential user lists
  const match = 
    allUsers.find(u => u._id === id) ||
    friendRequests.find(u => u._id === id) ||
    suggestions.find(u => u._id === id) ||
    myFriendsList.find(u => u._id === id);
    
  return match || null;
}

export function getPostsByUserId(userId) {
  const targetId = (!userId || userId === "me") ? "me" : userId;
  return _posts.filter(p => p.user._id === targetId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addPost(body) {
  const newPost = {
    _id: "p" + Date.now(),
    body,
    image: null,
    createdAt: new Date().toISOString(),
    likes: 0,
    liked: false,
    user: { ...currentUser },
    comments: [],
  };
  _posts = [newPost, ..._posts];
  return newPost;
}

export function toggleLike(postId) {
  _posts = _posts.map(p => {
    if (p._id !== postId) return p;
    return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
  });
}

export function addComment(postId, content) {
  const comment = {
    _id: "c" + Date.now(),
    content,
    commentCreator: { ...currentUser },
  };
  _posts = _posts.map(p => {
    if (p._id !== postId) return p;
    return { ...p, comments: [...p.comments, comment] };
  });
  return comment;
}
// ─── Friends Page Data ───────────────────────────────────────────────────────

export const friendRequests = [
  { _id: "r1", name: "Youssef Tarek",  photo: "https://i.pravatar.cc/150?u=yous",   mutual: 14, since: "2 days ago" },
  { _id: "r2", name: "Mona Ibrahim",   photo: "https://i.pravatar.cc/150?u=monaib", mutual: 7,  since: "5 days ago" },
  { _id: "r3", name: "Khaled Mostafa", photo: "https://i.pravatar.cc/150?u=khal",   mutual: 3,  since: "1 week ago" },
  { _id: "r4", name: "Dina Samy",      photo: "https://i.pravatar.cc/150?u=dina",   mutual: 1,  since: "3 hours ago" },
];

export const suggestions = [
  { _id: "s1", name: "Layla Hassan",   photo: "https://i.pravatar.cc/150?u=lay",  mutual: 22, city: "Cairo, Egypt" },
  { _id: "s2", name: "Samy Nabil",     photo: "https://i.pravatar.cc/150?u=sam",  mutual: 9,  city: "Alexandria" },
  { _id: "s3", name: "Dina Adel",      photo: "https://i.pravatar.cc/150?u=din",  mutual: 5,  city: "Giza, Egypt" },
  { _id: "s4", name: "Ramy Fouad",     photo: "https://i.pravatar.cc/150?u=ram",  mutual: 17, city: "Cairo, Egypt" },
  { _id: "s5", name: "Noha Gamal",     photo: "https://i.pravatar.cc/150?u=noh",  mutual: 4,  city: "Mansoura" },
  { _id: "s6", name: "Adel Mahmoud",   photo: "https://i.pravatar.cc/150?u=adel", mutual: 11, city: "Aswan, Egypt" },
  { _id: "s7", name: "Hoda Zaki",      photo: "https://i.pravatar.cc/150?u=hoda", mutual: 2,  city: "Tanta" },
];

export const myFriendsList = [
  { _id: "f1", name: "Sara Ahmed",    photo: "https://i.pravatar.cc/150?u=sara",  mutual: 12, city: "Cairo" },
  { _id: "f2", name: "Mohamed Ali",   photo: "https://i.pravatar.cc/150?u=moali", mutual: 8,  city: "Giza" },
  { _id: "f3", name: "Nour Hassan",   photo: "https://i.pravatar.cc/150?u=nour",  mutual: 5,  city: "Alexandria" },
  { _id: "f4", name: "Omar Khaled",   photo: "https://i.pravatar.cc/150?u=omar",  mutual: 3,  city: "Cairo" },
  { _id: "f5", name: "Hana Tarek",    photo: "https://i.pravatar.cc/150?u=hana",  mutual: 7,  city: "Mansoura" },
];

// ─── Videos Page Data ────────────────────────────────────────────────────────

export const videos = [
  { _id: "v1", title: "Amazing sunset in Hurghada 🌅", channel: "Sara Ahmed", avatar: "https://i.pravatar.cc/150?u=sara", thumb: "https://picsum.photos/seed/vid1/600/340", views: "125K", duration: "3:42", likes: 4200, category: "Travel" },
  { _id: "v2", title: "React 19 New Features — Full Tutorial", channel: "Mohamed Ali", avatar: "https://i.pravatar.cc/150?u=moali", thumb: "https://picsum.photos/seed/vid2/600/340", views: "89K", duration: "22:15", likes: 3100, category: "Tech" },
  { _id: "v3", title: "Cooking Egyptian Koshari at Home 🍲", channel: "Hana Tarek", avatar: "https://i.pravatar.cc/150?u=hana", thumb: "https://picsum.photos/seed/vid3/600/340", views: "210K", duration: "12:08", likes: 8700, category: "Food" },
  { _id: "v4", title: "Morning Workout Routine — 20 Minutes", channel: "Omar Khaled", avatar: "https://i.pravatar.cc/150?u=omar", thumb: "https://picsum.photos/seed/vid4/600/340", views: "55K",  duration: "20:00", likes: 2100, category: "Fitness" },
  { _id: "v5", title: "Cairo Street Photography Vlog 📸",   channel: "Nour Hassan", avatar: "https://i.pravatar.cc/150?u=nour", thumb: "https://picsum.photos/seed/vid5/600/340", views: "33K",  duration: "8:30",  likes: 1500, category: "Travel" },
  { _id: "v6", title: "JavaScript Tips & Tricks 2025 ⚡",   channel: "Mohamed Ali", avatar: "https://i.pravatar.cc/150?u=moali", thumb: "https://picsum.photos/seed/vid6/600/340", views: "67K",  duration: "15:20", likes: 2900, category: "Tech" },
  { _id: "v7", title: "Top 10 Hidden Gems in Cairo 🇪🇬", channel: "Sara Ahmed", avatar: "https://i.pravatar.cc/150?u=sara", thumb: "https://picsum.photos/seed/vid7/600/340", views: "45K", duration: "10:15", likes: 1800, category: "Travel" },
];

export const videoCategories = ["All", "Travel", "Tech", "Food", "Fitness"];

// ─── Marketplace Page Data ───────────────────────────────────────────────────

export const listings = [
  { _id: "m1", title: "iPhone 15 Pro Max — 256GB", price: "45,000 EGP", location: "Cairo, Nasr City", image: "https://picsum.photos/seed/iphone/400/400", seller: { name: "Youssef T.", avatar: "https://i.pravatar.cc/150?u=yous" }, category: "Electronics", condition: "Used - Like New", date: "2 hours ago" },
  { _id: "m2", title: "MacBook Air M2 — 8GB RAM", price: "55,000 EGP", location: "Giza, Dokki",       image: "https://picsum.photos/seed/mac2/400/400", seller: { name: "Layla H.", avatar: "https://i.pravatar.cc/150?u=lay" },  category: "Electronics", condition: "Used - Good",     date: "5 hours ago" },
  { _id: "m3", title: "Gaming Chair — Black",        price: "3,500 EGP",  location: "Cairo, Heliopolis", image: "https://picsum.photos/seed/chair/400/400", seller: { name: "Samy N.", avatar: "https://i.pravatar.cc/150?u=sam" },  category: "Furniture",    condition: "Used - Fair",     date: "1 day ago" },
  { _id: "m4", title: "Canon EOS R50 Camera",        price: "28,000 EGP", location: "Alexandria",        image: "https://picsum.photos/seed/cam1/400/400", seller: { name: "Dina A.", avatar: "https://i.pravatar.cc/150?u=din" },  category: "Electronics", condition: "Used - Like New", date: "3 hours ago" },
  { _id: "m5", title: "Sofa Set — 3+2+1 Seater",    price: "18,000 EGP", location: "Cairo, Maadi",      image: "https://picsum.photos/seed/sofa/400/400", seller: { name: "Ramy F.", avatar: "https://i.pravatar.cc/150?u=ram" },  category: "Furniture",    condition: "Used - Good",     date: "2 days ago" },
  { _id: "m6", title: "Nike Air Max 270 — Size 43",  price: "2,200 EGP",  location: "Giza, 6th October", image: "https://picsum.photos/seed/nike/400/400", seller: { name: "Noha G.", avatar: "https://i.pravatar.cc/150?u=noh" },  category: "Fashion",      condition: "New",            date: "6 hours ago" },
  { _id: "m7", title: "PlayStation 5 + 2 Controllers", price: "35,000 EGP", location: "Cairo, Zamalek",  image: "https://picsum.photos/seed/ps5m/400/400", seller: { name: "Adel M.", avatar: "https://i.pravatar.cc/150?u=adel" }, category: "Electronics", condition: "Used - Like New", date: "1 hour ago" },
  { _id: "m8", title: "Vintage Leather Jacket",      price: "1,800 EGP",  location: "Cairo, Downtown",   image: "https://picsum.photos/seed/jack/400/400", seller: { name: "Mona I.", avatar: "https://i.pravatar.cc/150?u=monaib" },category: "Fashion",      condition: "Used - Good",     date: "4 hours ago" },
  { _id: "m9", title: "Desk Lamp — LED with USB",    price: "450 EGP",    location: "Giza, Mohandessin", image: "https://picsum.photos/seed/lamp/400/400", seller: { name: "Sara A.", avatar: "https://i.pravatar.cc/150?u=sara" }, category: "Furniture", condition: "New", date: "10 mins ago" },
];

export const marketplaceCategories = ["All", "Electronics", "Furniture", "Fashion", "Vehicles", "Books"];
