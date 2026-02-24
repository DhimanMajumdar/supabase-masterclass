# 🚀 InkSpire: Premium Blog Platform

A state-of-the-art, full-stack blog application built with **Next.js 15**, **Supabase**, and **EditorJS**. This project features a stunning premium dark theme, secure authentication, and a powerful block-based editor.

## ✨ Features

-   **🔐 Secure Authentication**: Complete auth flow using Supabase (Sign Up, Login, Logout) with protected routes via Next.js Middleware.
-   **📝 Advanced Block Editor**: Integrated **EditorJS** supporting:
    -   Rich text formatting
    -   Custom headers and lists
    -   Blockquotes and code snippets
    -   **Image Uploads**: Direct upload to Supabase Storage with automatic URL generation.
-   **🎨 Premium UI/UX**:
    -   Sleek dark mode by default (`#050505`).
    -   **Glassmorphism**: Backdrop blur effects on cards and navigation.
    -   **Radial Gradients**: Dynamic background lighting for a premium feel.
    -   Responsive design for all devices.
-   **🛠️ Post Management**:
    -   Create, Edit, and Delete posts.
    -   Instant redirection and state updates.
    -   Confirmation dialogs for destructive actions.
-   **⚡ High Performance**: Built with Next.js App Router for optimal speed and SEO.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Backend/Auth/Storage**: [Supabase](https://supabase.com/)
-   **Editor**: [EditorJS](https://editorjs.io/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Components**: [Shadcn UI](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Theming**: [Next Themes](https://github.com/pacocoursey/next-themes)

## 🚀 Getting Started

### Prerequisites

-   Node.js 20.x or later
-   A Supabase account and project

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/DhimanMajumdar/supabase-masterclass.git
    cd supabase-masterclass
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

-   `/app`: Next.js App Router pages and layouts.
-   `/components`: Reusable UI components (including Shadcn UI).
-   `/lib/supabase`: Supabase client and middleware configurations.
-   `/public`: Static assets.

## 🛡️ Security

The application uses **Next.js Middleware** to ensure that:
-   Unauthenticated users cannot access the `/editor` or individual post pages.
-   Users are automatically redirected to the login page when attempting to access protected content.

---

Built with ❤️ by [Dhiman Majumdar](https://github.com/DhimanMajumdar)
