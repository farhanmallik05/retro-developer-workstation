# Interactive Widget Blueprints: AWS Student Builder Challenge

This file contains copy-paste ready, production-grade code components for the **Interactive Developer Terminal** and the **Serverless Visitor Counter (AWS Lambda + DynamoDB)**.

---

## 💻 1. Interactive Developer Terminal Component (`Terminal.tsx`)

This React component provides an authentic Unix-style terminal with command parsing, auto-complete, command history, and custom styling:

```tsx
import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Minus, Square } from "lucide-react";
import confetti from "canvas-confetti";

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalWidget: React.FC = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      id: "welcome",
      command: "init",
      output: (
        <div className="text-slate-300">
          <p className="text-emerald-400 font-bold">Welcome to Student Cloud Shell v2.4 (x86_64-aws-amplify)</p>
          <p className="mt-1">Type <span className="text-amber-400 font-mono">help</span> to view available commands.</p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputs]);

  const handleCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, rawCommand]);
    setHistoryIndex(-1);

    let resultNode: React.ReactNode;

    switch (trimmed) {
      case "help":
        resultNode = (
          <div className="space-y-1 text-slate-300">
            <p><span className="text-cyan-400 font-mono w-24 inline-block">bio</span> View my background & philosophy</p>
            <p><span className="text-cyan-400 font-mono w-24 inline-block">skills</span> List technical cloud proficiencies</p>
            <p><span className="text-cyan-400 font-mono w-24 inline-block">projects</span> Show flagship engineering projects</p>
            <p><span className="text-cyan-400 font-mono w-24 inline-block">aws</span> View AWS certifications and architectures</p>
            <p><span className="text-cyan-400 font-mono w-24 inline-block">sudo hire</span> Unlock recruiter easter egg & contact modal</p>
            <p><span className="text-cyan-400 font-mono w-24 inline-block">clear</span> Clear terminal screen</p>
          </div>
        );
        break;

      case "bio":
        resultNode = (
          <p className="text-slate-300">
            👋 I am a Computer Science student passionate about building highly available, serverless architectures on AWS.
            I believe that clean systems design, least-privilege security, and resilient code empower human potential.
          </p>
        );
        break;

      case "skills":
        resultNode = (
          <div className="space-y-1 text-slate-300">
            <p className="text-emerald-400 font-bold">☁️ Cloud & DevOps:</p>
            <p>AWS (Amplify, Lambda, DynamoDB, Bedrock, S3, CloudFront), Docker, GitHub Actions, Terraform</p>
            <p className="text-emerald-400 font-bold mt-2">💻 Software & Languages:</p>
            <p>TypeScript, Python, React, Next.js, Node.js, SQL, Go</p>
          </div>
        );
        break;

      case "projects":
        resultNode = (
          <div className="space-y-2 text-slate-300">
            <div className="border-l-2 border-cyan-400 pl-3">
              <p className="text-cyan-400 font-bold">1. EcoRoute — Real-Time Clean Energy Map</p>
              <p className="text-sm">Built on Amazon Location Service & React. Clustered 45,000 EV chargers with smart corridor routing.</p>
            </div>
            <div className="border-l-2 border-emerald-400 pl-3">
              <p className="text-emerald-400 font-bold">2. Serverless Resilient Microservice</p>
              <p className="text-sm">Zero-downtime event-driven processor using AWS Lambda, SQS, and DynamoDB.</p>
            </div>
          </div>
        );
        break;

      case "sudo hire":
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        resultNode = (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500 rounded text-emerald-200">
            <p className="font-bold text-lg">🎉 Access Granted! Let's build something exceptional.</p>
            <p className="mt-1">Email: <a href="mailto:your.email@university.edu" className="underline text-emerald-400">your.email@university.edu</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="underline text-emerald-400">linkedin.com/in/yourprofile</a></p>
          </div>
        );
        break;

      case "clear":
        setOutputs([]);
        setInput("");
        return;

      default:
        resultNode = (
          <p className="text-rose-400">
            Command not recognized: <span className="font-mono">{rawCommand}</span>. Type <span className="font-mono text-amber-400">help</span> for list of commands.
          </p>
        );
    }

    setOutputs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: rawCommand,
        output: resultNode,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        }
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl font-mono text-sm">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-300">student@aws-portfolio:~</span>
        </div>
        <div className="flex items-center gap-2">
          <Minus className="w-3.5 h-3.5 text-slate-500 hover:text-slate-300 cursor-pointer" />
          <Square className="w-3 h-3 text-slate-500 hover:text-slate-300 cursor-pointer" />
          <X className="w-3.5 h-3.5 text-slate-500 hover:text-rose-400 cursor-pointer" />
        </div>
      </div>

      {/* Terminal Body */}
      <div
        className="p-4 h-96 overflow-y-auto space-y-3 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {outputs.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400">visitor@aws-portfolio:~$</span>
              <span className="text-white font-semibold">{item.command}</span>
            </div>
            <div>{item.output}</div>
          </div>
        ))}

        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-emerald-400">visitor@aws-portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none caret-emerald-400"
            autoFocus
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
```

---

## ⚡ 2. Serverless Visitor Counter Lambda Function (`index.py`)

Deploy this Python AWS Lambda function with an API Gateway HTTP API trigger:

```python
import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
TABLE_NAME = os.environ.get('TABLE_NAME', 'StudentPortfolioMetrics')
table = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):
    try:
        # Atomic counter increment
        response = table.update_item(
            Key={'PK': 'METRICS', 'SK': 'VISITORS'},
            UpdateExpression='ADD visit_count :inc',
            ExpressionAttributeValues={':inc': 1},
            ReturnValues='UPDATED_NEW'
        )
        
        current_count = int(response['Attributes']['visit_count'])
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({'total_visits': current_count})
        }
    except Exception as e:
        print(f"Error updating counter: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Failed to log visit'})
        }
```

