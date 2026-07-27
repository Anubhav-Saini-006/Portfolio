# Portfolio Project Documentation

Welcome to your new portfolio website! This portfolio has been custom-crafted using **pure HTML5, CSS3, and Vanilla JavaScript**—making it lightning-fast, ultra-lightweight, and 100% free of heavy external frameworks or unnecessary distracting animations.

---

## 📁 Project Structure

```
Portfolio/
├── index.html            # Main HTML layout & semantic structure
├── style.css             # Vanilla CSS design system & custom variables
├── portfolio-config.js   # ⭐️ CENTRAL CONFIG FILE (Edit your details here!)
├── main.js               # Interactive script (scroll reveal, form handler, nav)
└── assets/
    └── images/           # Profile photo & project screenshots
        ├── profile.png
        ├── battleship.png
        ├── movies.png
        └── saas.png
```

---

## ⚡️ How to Edit & Update Your Portfolio

You do **NOT** need to edit complex HTML code to update your portfolio. Everything is managed through the single, easy-to-read `portfolio-config.js` file!

### 1. Update Your Name, Bio, or Profile Picture
Open `portfolio-config.js` and modify the `personal` block:
```js
personal: {
  name: "Your Name",
  logoText: "Your Name",
  greeting: "Hello",
  subtitle: "I'm Your Name",
  role: "Full Stack Developer",
  bio: "Your personalized bio text goes here...",
  profileImage: "assets/images/profile.png", // Replace with your image
  resumeUrl: "assets/resume.pdf",            // Add your PDF resume link
}
```

### 2. Update Your Metrics / Experience Stats
```js
stats: [
  { value: "120", suffix: "+", label: "Completed Projects" },
  { value: "95", suffix: "%", label: "Client satisfaction" },
  { value: "10", suffix: "+", label: "Years of experience" },
]
```

### 3. Add or Remove Projects
To add a new project in the future, simply copy and append a new project block in `portfolio-config.js`:
```js
{
  id: "my-new-project",
  title: "My Awesome Project",
  tags: ["React", "Node.js", "MongoDB"],
  description: "Description of what this project does and technologies used.",
  githubUrl: "https://github.com/yourusername/project",
  liveUrl: "https://yourproject.com",
  image: "assets/images/my-project.png"
}
```

---

## 🚀 How to Run Locally

You can preview this portfolio locally using any static web server:

**Option A (Using http-server / Node)**:
```bash
npx http-server -p 8080
```
Then open `http://localhost:8080` in your browser.

**Option B (Live Server in VS Code)**:
Right-click `index.html` and select **"Open with Live Server"**.
