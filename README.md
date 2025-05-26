# Lupa - Cultural Alignment Platform

Lupa is a modern web platform designed to evaluate cultural alignment between companies and individuals. The system is based on psychological archetypes, behavioral insights, and custom questionnaires. It matches a person's answers with the company's defined culture to generate compatibility scores and visual insights.

## Features

- **Cultural Alignment Assessment**: Evaluate how well candidates align with your company culture
- **Interactive Dashboard**: Visualize match scores and cultural traits
- **Candidate Management**: Track and review all evaluated candidates
- **Company Profile**: Define your company's cultural values and priorities
- **Detailed Reports**: Get comprehensive insights on alignment and potential friction points

## Tech Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Authentication & Database**: Supabase
- **Processing Logic**: n8n for chat workflows and evaluation processing

## Getting Started

### Prerequisites

- Node.js 18.x or later
- Supabase account for authentication and database
- n8n instance for processing logic (optional for local development)

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/src/app`: Next.js App Router pages and layouts
- `/src/components`: Reusable UI components
- `/src/lib/supabase`: Supabase client and utilities

## Pages

| URL                         | Description                  |
|----------------------------|------------------------------|
| `/`                        | Landing Page (public)         |
| `/login`                   | Login Page                   |
| `/p/:token`                | Person Evaluation            |
| `/p/:token/resultado`      | Person Result Page           |
| `/dashboard`               | Company Dashboard            |
| `/avaliacao`               | Company Evaluation Form      |
| `/perfil`                  | Company Profile             |
| `/pessoas`                 | People List                  |
| `/resultado/:matchid`      | Final Match Result Page      |

## Database Models

- `users`: Authentication and user roles
- `companies`: Company information and profile
- `questions`: Evaluation questions
- `answers`: User responses to questions
- `matches`: Match results between people and companies
- `people`: Information about evaluated individuals

## Deployment

The application can be deployed to Vercel or any other platform that supports Next.js applications.

```bash
# Build for production
npm run build

# Start production server
npm start
```
