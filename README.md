# 🚀 Skillsync AI Interviewer – Your Smart Hiring Companion & Job Portal 🤖✨

Skillsync AI Interviewer is a cross-platform (Web + Flutter) application that revolutionizes the hiring process through AI-powered voice interviews, smart analysis, and real-time job scraping using NLP from Indeed and other job portals.

## 🔥 Key Features

- **🧠 AI Interviewer:** Conduct natural, conversational interviews via AI that adapts dynamically to responses.
- **📄 Smart Question Generation:** Instantly generate customized interview questions from job descriptions.
- **🎤 Voice-Driven Interviews:** Engage candidates with voice-based interviews for a seamless experience.
- **📊 Intelligent Scoring:** Get real-time evaluation of candidate responses using AI scoring and sentiment analysis.
- **🔗 One-Click Interview Links:** Share unique interview sessions easily via URL.
- **📈 Interview Dashboard:** Track candidate progress, compare performances, and manage interviews.
- **🌐 Real-Time Job Scraper:** Live NLP-powered scraping of jobs from Indeed and other portals.
- **📱 Mobile & Web Support:** Built with Flutter for mobile and web for universal access.

## 📦 Tech Stack

- **Frontend (Web):** Next.js, TailwindCSS
- **Mobile:** Flutter (Android & iOS)
- **Backend:** Node.js / Express
- **Voice AI:** Retell AI
- **NLP & Interview Analysis:** OpenAI GPT models
- **Authentication:** Clerk
- **Database:** Supabase
- **Job Scraping:** BeautifulSoup, Selenium, and NLP-based matching

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Skillsync/SkillsyncAI.git
cd SkillsyncAI
```

### 2. Create an Environment File

```bash
cp .env.example .env
```

Fill in the required values such as:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RETELL_API_KEY`
- `OPENAI_API_KEY`

### 3. Install dependencies

```bash
yarn
```

### 4. Start the development server

```bash
yarn dev
```

Visit `http://localhost:3000` in your browser to view the app.

## 📲 Flutter Mobile Setup

```bash
flutter pub get
flutter run
```

Ensure you have Flutter installed and configured for mobile development.

## 📤 Deployment

We recommend using [Vercel](https://vercel.com/) for the web version and standard app stores for mobile apps. Set environment variables via the dashboard.

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit pull requests.

## ⭐ Show Your Support

Give a ⭐️ if this project helped you or inspired you!
