# 03 — System Architecture: AWS Student Builder Challenge

This document provides the full cloud architecture for the portfolio website, covering frontend delivery, automated CI/CD pipeline, serverless backend microservices, and AI model integration on AWS.

---

## 🏛️ End-to-End System Architecture Diagram

```mermaid
flowchart TD
    subgraph Developer["Student Developer Environment"]
        GitRepo["GitHub / GitLab Repository"]
        DevMachine["Localhost Development (Vite/Next.js)"]
    end

    subgraph AmplifyPlatform["AWS Amplify Cloud Platform"]
        Webhook["Amplify CI/CD Webhook"]
        BuildEnv["Amplify Build Engine (amplify.yml)"]
        AmplifyHost["AWS Amplify Hosting"]
        CloudFrontCDN["Amazon CloudFront CDN (Global Edge)"]
        SSLCert["AWS Certificate Manager (Automated SSL)"]
    end

    subgraph Client["Visitor Browser / Mobile"]
        SPA["Modern Responsive UI (React + Tailwind)"]
        TerminalWidget["Interactive Terminal Superpower"]
        ChatWidget["AI Twin Assistant Drawer"]
    end

    subgraph ServerlessBackend["AWS Serverless Backend Tier"]
        APIGW["Amazon API Gateway (HTTP API)"]
        VisitorLambda["AWS Lambda: Visitor Counter & Metrics"]
        ChatLambda["AWS Lambda: Bedrock Streaming Gateway"]
        DynamoDB[("Amazon DynamoDB: Telemetry & Rate Limits")]
    end

    subgraph GenAI["AWS Generative AI Tier"]
        Bedrock["Amazon Bedrock (Claude 3.5 Haiku)"]
        ResumeContext["Student Knowledge Base & Prompt Context"]
    end

    DevMachine -->|git push origin main| GitRepo
    GitRepo -->|Trigger Webhook| Webhook
    Webhook --> BuildEnv
    BuildEnv --> AmplifyHost
    AmplifyHost --> CloudFrontCDN
    CloudFrontCDN --- SSLCert

    Client -->|1. HTTPS Request| CloudFrontCDN
    CloudFrontCDN --> SPA
    
    SPA --> TerminalWidget
    SPA --> ChatWidget

    TerminalWidget -->|2. Get Visitor Count / Telemetry| APIGW
    ChatWidget -->|3. Ask AI Twin Question| APIGW
    
    APIGW --> VisitorLambda
    APIGW --> ChatLambda
    
    VisitorLambda -->|Atomic Counter Increment| DynamoDB
    ChatLambda -->|Query Rate Limits| DynamoDB
    ChatLambda -->|Invoke Model with System Prompt| Bedrock
    Bedrock --> ResumeContext
```

---

## 🔍 Architecture Component Deep Dive

### 1. Edge & Hosting Tier (AWS Amplify Hosting)
- **Git-Integrated Continuous Deployment:** Every `git push` to `main` automatically triggers a zero-downtime build and deployment on Amplify.
- **Global Edge Caching:** Assets (HTML, JS, CSS, images, WebP icons) are distributed across Amazon CloudFront's global network of 400+ points of presence.
- **Custom Domain & SSL:** Automated SSL certificate provisioning via AWS Certificate Manager (ACM) with free renewal and HSTS encryption.
- **Preview Environments:** Pull requests can generate instant preview branch URLs (`https://pr-2.<id>.amplifyapp.com`) for testing before merging.

### 2. Frontend Client Architecture
- **Framework:** React 18 with Vite or Next.js 14 (Static Site Generation / Export mode).
- **Styling:** Tailwind CSS with a calibrated dark-mode palette (`slate-950` background, `emerald-400` / `cyan-400` accents).
- **Animations:** Lucide React icons + Framer Motion for smooth micro-interactions.
- **State Management:** Lightweight React Hooks (`useState`, `useReducer`) managing terminal command history and chat messages.

### 3. Serverless Backend Tier (Visitor Counter & Contact Hub)
- **Amazon API Gateway (HTTP API):** Low-latency, cost-effective API endpoint with built-in CORS configuration.
- **AWS Lambda (`VisitorCounterFunction`):** Node.js 20 or Python 3.12 runtime. Performs an atomic `UpdateItem` on DynamoDB to increment the visitor counter and log country/browser metadata without race conditions.
- **Amazon DynamoDB (`PortfolioTable`):** Single-table design with on-demand capacity mode:
  - `PK: "METRICS"`, `SK: "VISITORS"`, `count: 1420`
  - `PK: "MESSAGE#<timestamp>"`, `SK: "<email>"`, `content: "..."`

### 4. Generative AI Superpower Tier (Amazon Bedrock)
- **Model:** Anthropic Claude 3.5 Haiku via Amazon Bedrock. (Blazing fast ~300ms latency, fraction of a cent per query).
- **Prompt Isolation:** System instructions strictly restrict answers to your professional portfolio context, preventing prompt injections or off-topic hallucinations.
- **Rate-Limiting:** IP-hashed DynamoDB records enforce a cap of 10 requests per user per hour to prevent accidental API credit exhaustion.

