# 06 — Submission & Demo Guide: AWS Student Builder Challenge

This guide provides the presentation script, project description copy, and pre-submission checklist for the **AWS Student Builder Challenge: Build Your Tech Superpower**.

---

## 🎬 3-Minute Video Demo Script

Judges want to see three things: who you are, how you deployed on AWS Amplify, and how your interactive superpower works.

```
⏱️ 0:00 - 0:30 | Introduction & Personal Narrative
"Hi everyone! My name is [Your Name], a Computer Science and Cloud Computing student. 
Like many students, I wanted a portfolio that didn't just list my resume points, but tangibly demonstrated my engineering mindset. 
Welcome to my personal cloud portfolio, built from scratch and continuously deployed using AWS Amplify Hosting."

⏱️ 0:30 - 1:15 | The Portfolio Walkthrough
"As you scroll through the homepage, notice the clean, responsive design. 
- In the Skills section, I break down my core strengths in AWS serverless architectures, TypeScript, and distributed systems.
- In the Projects section, you can explore live case studies of my past builds, complete with architecture diagrams, GitHub repositories, and live links.
- At the bottom, our live visitor counter is powered by a serverless AWS Lambda and Amazon DynamoDB pipeline."

⏱️ 1:15 - 2:15 | The Tech Superpower in Action (The Interactive Terminal)
"Now, let's explore my Tech Superpower: an interactive, full-featured developer terminal embedded directly into the browser.
- Typing 'help' reveals the available bash commands.
- Typing 'skills --category=cloud' generates an ASCII-styled breakdown of my AWS proficiencies.
- Typing 'whoami' prints my philosophy on building scalable, fault-tolerant software.
- And for recruiters, typing 'sudo hire' triggers a live confetti celebration and opens a direct scheduling link!
Visitors can also toggle between this authentic terminal interface and the modern visual GUI at any time."

⏱️ 2:15 - 2:45 | The AWS Amplify Hosting Architecture
"Under the hood, this entire platform is powered by AWS:
- Deployed on AWS Amplify Hosting with automatic continuous integration from GitHub. Every commit automatically builds and deploys to CloudFront's global edge network in under 90 seconds.
- Integrated with DynamoDB for sub-5ms telemetry.
- Zero idle hosting cost, fully protected under AWS Free Tier safeguards."

⏱️ 2:45 - 3:00 | Call to Action & Conclusion
"You can explore the live site right now at my Amplify domain, inspect the open-source code on GitHub, and connect with me on LinkedIn. 
Thank you to AWS for organizing the Student Builder Challenge!"
```

---

## 📝 AWS Builder Center Submission Form Copy

### Project Title
`[Your Name] — Interactive Cloud Developer Portfolio & Tech Superpower`

### Short Description (Max 150 characters)
`Personal student portfolio featuring an interactive developer CLI terminal superpower, deployed with automated CI/CD on AWS Amplify Hosting.`

### Tell Your Story (Long Description)
```markdown
### About Me
I am a student developer passionate about cloud engineering, distributed systems, and building intuitive user experiences. 

### My Tech Superpower: The Interactive Cloud CLI
Instead of presenting a static list of resume bullets, I built an interactive terminal engine into my portfolio. Visitors can execute commands like `skills`, `projects`, `cat bio.txt`, `aws-check`, and `sudo hire`. It includes full tab-completion, command history, and custom easter eggs.

### How I Built It on AWS
- **Hosting & CI/CD:** Hosted on **AWS Amplify Hosting**, connected directly to GitHub for automated zero-downtime builds upon git push.
- **Global CDN:** Accelerated via Amazon CloudFront edge nodes with automatic SSL encryption.
- **Serverless Telemetry:** An AWS Lambda function connected to Amazon DynamoDB captures visitor metrics atomically with zero race conditions.
- **Code Quality:** Written in TypeScript + React + Tailwind CSS with a 98+ Google Lighthouse score.
```

### URLs
- **Live AWS Amplify URL:** `https://main.<your-id>.amplifyapp.com`
- **GitHub Repository URL:** `https://github.com/<your-username>/student-portfolio-aws`
- **Demo Video Link:** `https://youtu.be/...`

---

## 📋 Pre-Submission Checklist

- [ ] Is the site hosted and accessible on an **Amplify domain** (`*.amplifyapp.com`)?
- [ ] Does refreshing sub-routes (e.g. `/projects` or `/about`) work without 404 errors?
- [ ] Is your personal story, education, and skill set clearly showcased?
- [ ] Is the interactive superpower functioning cleanly without JavaScript console errors?
- [ ] Is the GitHub repository public with a comprehensive `README.md` and screenshot?
- [ ] Is the video under 3 minutes, with crisp audio and clear screen recording?
- [ ] Are you submitting as an individual student before the November 6, 2026 deadline?

