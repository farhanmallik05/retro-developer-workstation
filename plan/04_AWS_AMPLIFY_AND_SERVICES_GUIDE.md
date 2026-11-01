# 04 — AWS Amplify & Services Guide: AWS Student Builder Challenge

This guide provides practical instructions for deploying your portfolio on **AWS Amplify Hosting**, configuring custom build pipelines, and provisioning backend services safely within the AWS Free Tier.

---

## 🚀 1. AWS Amplify Hosting Step-by-Step Setup

AWS Amplify Hosting is the mandatory hosting platform for this challenge. Setting it up takes less than 5 minutes:

### Step 1: Connect Your Code Repository
1. Log in to the [AWS Management Console](https://console.aws.amazon.com) and search for **AWS Amplify**.
2. Click **Host web app**.
3. Choose your Git provider (**GitHub**, **GitLab**, or **AWS CodeCommit**) and authorize AWS Amplify.
4. Select your portfolio repository and choose the target branch (`main`).

### Step 2: Configure Build Settings (`amplify.yml`)
Amplify will automatically detect your framework (Vite, Next.js, React). Create or verify your `amplify.yml` file in the root of your project:

#### For Vite + React (TypeScript):
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

#### For Next.js (Static Export / SSG):
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
    baseDirectory: out
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Step 3: Redirects and Rewrites (Single-Page App Routing)
To ensure client-side routing works smoothly without 404 errors on page refresh:
1. In the Amplify Console, navigate to **Hosting** -> **Rewrites and redirects**.
2. Add a rule:
   - **Source address:** `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>`
   - **Target address:** `/index.html`
   - **Type:** `200 (Rewrite)`

---

## 🤖 2. Enabling Amazon Bedrock for the AI Superpower

If you include the AI Twin superpower:

1. **Request Model Access:**
   - In the AWS Console, search for **Amazon Bedrock** (ensure you are in `us-east-1` or `us-west-2`).
   - In the left sidebar, click **Model access** -> **Modify model access**.
   - Check **Anthropic Claude 3.5 Haiku** (or Titan Text) and click **Save changes**. (Access is typically granted instantly for students).
2. **Lambda IAM Policy:**
   - Ensure your backend Lambda execution role has permission to invoke Bedrock:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": "bedrock:InvokeModel",
         "Resource": "arn:aws:bedrock:*::foundation-model/anthropic.claude-3-5-haiku-*"
       }
     ]
   }
   ```

---

## 📊 3. DynamoDB Visitor Counter Setup

1. In the AWS Console -> **DynamoDB** -> **Create table**.
2. Table name: `StudentPortfolioMetrics`.
3. Partition key: `PK` (String), Sort key: `SK` (String).
4. Table class: **Standard**, Capacity mode: **On-demand** (Pay-per-request).
5. Zero idle cost; free tier includes 25 GB of storage and 200 million requests/month!

---

## 💰 4. Zero-Cost Free Tier Safeguards

All services used in this architecture fit 100% inside the **AWS Free Tier**:

| AWS Service | Free Tier Allocation | Estimated Hackathon Usage | Estimated Bill |
| :--- | :--- | :--- | :--- |
| **AWS Amplify Hosting** | 1,000 build minutes/month, 15 GB served/month | ~40 build minutes, <2 GB served | **\$0.00** |
| **AWS Lambda** | 1,000,000 requests/month, 3.2M seconds compute | ~10,000 requests | **\$0.00** |
| **Amazon DynamoDB** | 25 GB storage, 200M read/write units/month | <1 MB, ~10,000 operations | **\$0.00** |
| **Amazon Bedrock** | Pay-as-you-go (~$0.00025 per 1K input tokens) | ~100 demo queries (~$0.05) | **< \$0.10** |
| **CloudFront / S3** | Included with Amplify Hosting | Included | **\$0.00** |

> **Pro Tip:** Set up an **AWS Budget Alert** in AWS Billing for **\$1.00** with email notification to guarantee zero unexpected charges during development!

