# MarketingHub Online Platform
### Real-Time Marketing & Multi-Vendor E-Commerce Platform (CSE Final Year Project)

এটি একটি সম্পূর্ণ **Multi-Vendor E-Commerce Platform** যাতে রয়েছে **Grocery & Essentials, Cosmetics & Skincare, Furniture & Living, Electronics & Appliances, Ladies Dress & One-Piece, Handlooms & Organic Agro**, পাশাপাশি **Real-Time Marketing**, **bKash & Nagad Payment Sandbox**, **Admin, Seller, Customer, ও Delivery Manager Dashboard** এবং **CSE Defense Hub**।

---

## 💻 ১. VS Code-এ কীভাবে প্রজেক্টটি চালাবেন (Run Locally in VS Code)

### প্রয়োজনীয় সফটওয়্যার (Prerequisites)
1. **Node.js** (Version 18 বা তার বেশি): [https://nodejs.org](https://nodejs.org) থেকে LTS ভার্সন ইনস্টল করুন।
2. **Visual Studio Code (VS Code)**: [https://code.visualstudio.com](https://code.visualstudio.com)
3. **Git**: [https://git-scm.com](https://git-scm.com)

### সেটআপ ও রান করার ধাপ:
1. ডাউনলোড করা `marketinghub-project.zip` ফাইলটি **Extract / Unzip** করুন।
   *(Windows-এ Extract না হলে ফাইলটির ওপর Right-Click ➔ Properties ➔ **Unblock** টিক দিয়ে OK করুন, অথবা 7-Zip/WinRAR ব্যবহার করুন।)*
2. **VS Code** ওপেন করে **File ➔ Open Folder...** দিয়ে আনজিপ করা ফোল্ডারটি খুলুন।
3. VS Code-এ টার্মিনাল ওপেন করুন (`Ctrl + ~` বা `Terminal ➔ New Terminal`) এবং কমান্ড দিন:
   ```bash
   npm install --legacy-peer-deps
   ```
4. ইনস্টলেশন শেষ হলে ডেভেলপমেন্ট সার্ভার চালু করুন:
   ```bash
   npm run dev
   ```
5. ব্রাউজারে গিয়ে **`http://localhost:3000`** ওপেন করুন!

---

## 🌐 ২. GitHub-এ কীভাবে প্রজেক্টটি Upload ও Publish করবেন (GitHub Pages)

এই প্রজেক্টে অটোমেটিক **GitHub Actions (`.github/workflows/deploy.yml`)** ও `vite.config.ts` (`base: './'`) আগে থেকেই কনফিগার করা আছে, তাই খুব সহজেই ফ্রিতে লাইভ হোস্ট করতে পারবেন!

### ধাপ ১: GitHub-এ নতুন Repository তৈরি করুন
1. [https://github.com](https://github.com)-এ লগইন করে উপরের ডানে `+` চিহ্ন ➔ **New repository** সিলেক্ট করুন।
2. Repository name দিন: `marketinghub-online-platform` (Public রাখুন) এবং **Create repository** চাপুন।

### ধাপ ২: VS Code Terminal থেকে কোড GitHub-এ Push করুন
VS Code টার্মিনালে নিচের কমান্ডগুলো একে একে রান করুন (`YOUR_USERNAME` এর জায়গায় আপনার গিটহাব ইউজারনেম লিখুন):

```bash
git init
git add .
git commit -m "Initial commit: MarketingHub Online Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/marketinghub-online-platform.git
git push -u origin main
```

### ধাপ ৩: GitHub Pages লাইভ পাবলিশ চালু করুন
1. আপনার GitHub Repository-র পেজে গিয়ে উপরের **Settings** ট্যাবে ক্লিক করুন।
2. বাম পাশের মেনু থেকে **Pages**-এ ক্লিক করুন।
3. **Build and deployment** এর নিচে **Source** ড্রপডাউন থেকে **GitHub Actions** সিলেক্ট করুন।
4. এবার **Actions** ট্যাবে গেলে দেখবেন *"Deploy MarketingHub Online Platform to GitHub Pages"* ওয়ার্কফ্লো রান হচ্ছে।
5. ১–২ মিনিট পর সবুজ টিক চিহ্ন এলে আপনার ওয়েবসাইটটি লাইভ হয়ে যাবে:
   👉 **`https://YOUR_USERNAME.github.io/marketinghub-online-platform/`**

*(বিকল্পভাবে আপনি চাইলে [Vercel](https://vercel.com) বা [Netlify](https://netlify.com)-তে আপনার GitHub রিপোজিটরি কানেক্ট করেও ১-ক্লিকে পাবলিশ করতে পারেন!)*

---

## 🛠️ প্রজেক্ট ফোল্ডার স্ট্রাকচার

```text
marketinghub-online-platform/
├── .github/workflows/deploy.yml # Auto-deploy to GitHub Pages
├── .npmrc                       # Peer dependency compatibility
├── index.html                   # HTML Entry Point
├── package.json                 # Dependencies & scripts
├── vite.config.ts               # Vite + Tailwind 4 + relative base path
├── src/
│   ├── main.tsx                 # React DOM render entry
│   ├── App.tsx                  # Root Layout & Role Switcher
│   ├── data/mockData.ts         # Grocery, Cosmetics, Furniture, Electronics, Ladies Dress & Schemas
│   ├── context/AppContext.tsx   # Global State (Cart, bKash/Nagad, Orders, Roles)
│   └── components/              # Storefront, Dashboards, PaymentModal & ProjectHub
