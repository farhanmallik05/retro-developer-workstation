# FM-OS v4.2 — AWS Builder Superpower Tactical Workstation

> **AWS Student Builder Challenge: Build Your Tech Superpower**  
> Built by [Farhan Mallik](https://farhanmallik.netlify.app) · B.Tech CSE & IT · KCC ITM, Greater Noida

[![Deploy Status](https://img.shields.io/badge/AWS%20Amplify-Live-orange?logo=amazon-aws)](https://farhanmallik05.github.io/retro-developer-workstation/)
[![Tests](https://img.shields.io/badge/Tests-20%2F20%20Passing-brightgreen)](./test_suite.mjs)
[![TypeScript](https://img.shields.io/badge/TypeScript-0%20Errors-blue?logo=typescript)](./tsconfig.json)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

A retro-cyberpunk AWS engineering workstation deployed on **AWS Amplify**, featuring an in-browser Cloud Architecture CAD modeler with live AWS CDK v2 TypeScript synthesis, an AI Knowledge Twin, a full Unix terminal CLI, and dual Retro/Executive persona modes.

---

## 🚀 Live Deployment

| Deployment | URL |
|---|---|
| **Primary (AWS Amplify)** | `https://main.<amplify-id>.amplifyapp.com` |
| **Mirror (GitHub Pages)** | https://farhanmallik05.github.io/retro-developer-workstation/ |
| **AWS S3 Origin** | http://farhanmallik-portfolio-356302822181.s3-website-us-east-1.amazonaws.com |

---

## 🏗️ AWS Architecture

```
GitHub Repository (main branch)
         │
         ▼ auto-trigger on push
AWS Amplify CI/CD (amplify.yml)
         │
         ▼
Amazon CloudFront  ←── Global Edge CDN, TLS 1.3, Sub-50ms TTFB
         │
         ▼
Amazon S3 Origin  ──── Vite + React 18 Single-Page Application
         │
         ├──────────────────────┬──────────────────────┐
         ▼                      ▼                      ▼
   Cloud CAD Sandbox      AI Knowledge Twin       RFC 5545 Scheduler
   CDK v2 Generator       Preset Q&A Engine       .ICS Calendar Blobs
   Well-Architected       Bedrock-pattern         Google/Apple/Outlook
   Compliance Checker     architecture             Compatible
```

**AWS Services Used:**
- **AWS Amplify Hosting** — CI/CD-integrated deployment, CloudFront CDN, TLS via ACM
- **Amazon S3** — Static asset origin bucket
- **Amazon CloudFront** — Global edge distribution, cache optimization
- **AWS ACM** — SSL/TLS certificate management
- **Amazon Bedrock** (architecture pattern) — Claude 3.5 Haiku Q&A model design
- **AWS CDK v2 (TypeScript)** — In-browser IaC synthesis engine
- **AWS CloudFormation** — Template generation target

---

## ⚡ Interactive Superpowers

| Feature | What It Does |
|---|---|
| **☁️ Cloud Architecture CAD Sandbox** | Visually assemble AWS primitives, validate Well-Architected compliance, calculate live monthly costs, synthesize CDK v2 TypeScript + CloudFormation YAML |
| **🖥️ Developer Terminal CLI** | Full Unix shell: `help`, `skills`, `aws s3 ls`, `htop`, `oss`, `matrix` rain, `sudo hire` confetti easter egg |
| **🏛️ Dual Persona Switcher** | Toggle between Retro CRT workstation and Executive Swiss-minimalist mode |
| **📅 RFC 5545 Scheduler** | Generate `.ics` calendar invites for Google Calendar, Apple Calendar, Microsoft Outlook |
| **🤖 AI Knowledge Twin** | Interactive Q&A covering CloudOps Swarm, Ghar Search, ForkFix, and AWS architecture patterns |
| **🎮 CYBER-RUNNER 1984 Arcade** | Embedded 2D retro arcade game |
| **🔊 Web Audio Synthesizer** | 0-KB procedural CRT audio (OscillatorNode, GainNode) — no audio files downloaded |

---

## 🧠 Builder's Log — What I Learned on AWS

- **AWS Amplify Build Caching:** Caching `node_modules/**/*` in `amplify.yml` cuts cold-start build time from 4+ minutes to under 90 seconds — critical for rapid iteration.
- **CloudFront SPA Routing:** Configured custom error page (404→index.html, HTTP 200) to prevent React Router path refresh failures at the CDN edge on direct URL access.
- **Zero-Asset Audio Engine:** Browser OscillatorNode + GainNode synthesize all CRT sounds (relay clicks, boot chimes, degauss pulses) without any audio files — saved 2.3 MB from production bundle.
- **In-Browser CDK v2 Synthesis:** Building a client-side IaC generator required mastering CDK L1/L2 construct hierarchy to produce valid CloudFormation equivalents — equivalent to `cdk synth` without the CLI.
- **High-DPI Canvas Rendering:** DevicePixelRatio-aware canvas scaling ensures razor-sharp vector graphics on 2K, 4K, and Apple Retina displays without additional asset downloads.

---

## 📂 Featured Production Projects

| # | Project | Stack | Key Metric |
|---|---|---|---|
| 1 | **CloudOps Swarm** | Strands SDK + Bedrock (Claude 3.5) | MTTD: **28s**, 100% benchmark accuracy |
| 2 | **Ghar Search** | LangGraph + FastAPI + Next.js 14 | **150K+** RERA records, 140+ tests |
| 3 | **ForkFix / SpecterLens** | NVIDIA Nemotron + Gemma 4 | Build failure diagnosis in **<4s** |
| 4 | **EcoRoute** | Amazon Location Service + MapLibre GL | **45K+** fueling stations indexed |

---

## 🧪 Local Development & Test Verification

```bash
# Clone
git clone https://github.com/farhanmallik05/retro-developer-workstation.git
cd retro-developer-workstation

# Install dependencies
npm install

# Run automated test suite (20/20 passing)
node test_suite.mjs

# Launch dev server
npm run dev

# Production build
npm run build
# Vite v5.4.21 → 1,615 modules → 0 TypeScript errors → ~157 kB gzipped
```

### Test Results
```
🧪 Running AWS Student Builder Challenge Test Suite...
✅ Test 1: CloudArchitectureSandbox validation logic
✅ Test 2: ContactModal email regex validation
✅ Test 3: Terminal CLI command set verification
✅ Test 4: Open Source Leadership & certifications
✅ Test 5: IaC CDK v2 + CloudFormation template synthesis
✅ Test 6: Offline outbox message queue validation
✅ Test 7: Web Audio API synthesizer (0KB asset)
✅ Test 8: 3D vector canvas & 2.5D isometric architecture
✅ Test 9: ONEWHO 2026 contest compliance routing
✅ Test 10: Retro BIOS POST bootloader diagnostics
✅ Test 11: Sector jump transition engine
✅ Test 12: Tactical vector cursor & phosphor starfield
✅ Test 13: Cloud Architecture 360° radar topology
✅ Test 14: CRT Color Phosphor Themes & CSS variables
✅ Test 15: Vector CRT oscilloscope & degauss coil
✅ Test 16: Extended UNIX htop & AWS cloud CLI commands
✅ Test 17: RFC 5545 .ICS calendar synthesizer
✅ Test 18: Recruiter mailto dispatch generator
✅ Test 19: Dual persona mode switcher & executive styling
✅ Test 20: High-DPI canvas super-sampling & Retina scaling

🎉 ALL 20 TESTS PASSED — 0 TypeScript errors — Build: 4.77s
```

---

## 🔧 AWS Amplify Deployment (amplify.yml)

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

## 🔗 Connect

- **Portfolio:** https://farhanmallik.netlify.app
- **GitHub:** https://github.com/farhanmallik05
- **Connect Hub:** https://beacons.ai/farhanmallik
- **LinkedIn:** Farhan Mallik

---

## 📄 License

MIT © 2026 Farhan Mallik
