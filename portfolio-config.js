/**
 * PORTFOLIO CONFIGURATION FILE
 * ============================
 * Easily edit your personal details, bio, skills, services, projects, and contact info here!
 * Everything on the portfolio updates automatically based on this file.
 */

const PORTFOLIO_DATA = {
  // --- PERSONAL INFORMATION ---
  personal: {
    name: "Anubhav Saini",
    logoText: "Anubhav Saini",
    greeting: "Hello",
    subtitle: "I'm Anubhav Saini",
    role: "Full Stack Developer & AI Enthusiast",
    bio: "I am a B.Tech IT student at IIIT Sonepat with a deep passion for web development, Agentic AI, and workflow automation. I specialize in building high-performance web applications, intelligent agents, and interactive software.",
    profileImage: "assets/images/Profile.png",
    resumeUrl: "assets/Anubhav_Saini_Resume.pdf",
    ctaText: "Got a project?",
    ctaLink: "#contact",
  },

  // --- SKILLS LIST (Displayed in hero marquee ticker) ---
  skills: [
    { name: "HTML5", icon: "code" },
    { name: "CSS", icon: "palette" },
    { name: "Javascript", icon: "js" },
    { name: "Node.js", icon: "node" },
    { name: "React", icon: "react" },
    { name: "Python", icon: "python" },
    { name: "n8n", icon: "workflow" },
    { name: "Agentic AI", icon: "robot" },
    { name: "Git", icon: "git" },
    { name: "Github", icon: "github" },
  ],

  // --- SERVICES OFFERED ---
  services: [
    {
      title: "Website Development",
      icon: "web",
      description: "Custom, responsive, and high-performance websites tailored to your brand."
    },
    {
      title: "Agentic AI",
      icon: "ai",
      description: "Intelligent autonomous agents, LLM integrations, and cognitive workflows."
    },
    {
      title: "Automation",
      icon: "automation",
      description: "End-to-end process automation with n8n, custom APIs, and backend scripts."
    }
  ],

  // --- PROJECTS LIST ---
  projects: [
    {
      id: "n8n-project",
      title: "Lead Generation System with N8N",
      tags: ["N8N", "Javascript"],
      description: "Built an automation system with N8N which runs automatically every 6 hours to collect open-source, internship and job opportunities across the platforms like RemoteOk, Internshala and Github. It sends updates immediately on telegram and the entire day's opportunity summary on email every night",
      githubUrl: "", // No GitHub link for this project
      image: "assets/images/n8n.png"
    },
    {
      id: "expense-tracker",
      title: "Expense Tracker Web App",
      tags: ["HTML", "CSS", "Javascript", "CRUD"],
      description: "Built a responsive Expense Tracker Web App using HTML, CSS, and JavaScript, featuring 4+ modules (dashboard, categories, history, CRUD).",
      githubUrl: "https://github.com/Anubhav-Saini-006/Expense-Tracker",
      image: "assets/images/expense.png"
    },
    {
      id: "arcade-games",
      title: "Interactive Arcade Games (Pygame)",
      tags: ["Python", "Pygame", "Game Loop"],
      description: "Developed two interactive arcade-style games (Snake and Flappy Bird) using Pygame, implementing real-time game loops, collision detection, physics mechanics, and 60 FPS performance optimization.",
      githubLinks: [
        { text: "Snake Github", url: "https://github.com/Anubhav-Saini-006/Snake-Game" },
        { text: "Flappy Bird Github", url: "https://github.com/Anubhav-Saini-006/Flappy-Circle" }
      ],
      images: [
        "assets/images/snake.png",
        "assets/images/flappy.png"
      ]
    },
    {
      id: "personal-diary",
      title: "Personal Diary GUI & CLI Application",
      tags: ["Python", "Tkinter", "File Handling", "CRUD"],
      description: "Developed and upgraded a Python-based diary application into a Tkinter GUI with 4+ CRUD features, secure file handling, automated text storage, and intuitive user interface.",
      githubUrl: "https://github.com/Anubhav-Saini-006/Personal-Diary-GUI",
      image: "assets/images/diary.png"
    }
  ],

  // --- CONTACT & FOOTER ---
  contact: {
    title: "Have a project?",
    subtitle: "Let's talk!",
    email: "anubhavsaini2506@gmail.com",
    socialLinks: [
      { name: "Email", icon: "email", url: "mailto:anubhavsaini2506@gmail.com" },
      { name: "GitHub", icon: "github", url: "https://github.com/Anubhav-Saini-006" },
      { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/anubhav-saini-09946b23b/" }
    ],
    footerText: "Designed with love, all right reserved for Anubhav Saini."
  }
};

if (typeof module !== 'undefined') {
  module.exports = PORTFOLIO_DATA;
}
