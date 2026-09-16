# Aswin Sagar portfolio

- `Frontend`: React and Vite website
- `Backend`: Sanity Studio and content schemas

Run the website:

```sh
npm --prefix Frontend ci
npm --prefix Frontend run dev
```

Run Sanity Studio with Node 22:

```sh
PATH="/opt/homebrew/opt/node@22/bin:$PATH" npm --prefix Backend ci
PATH="/opt/homebrew/opt/node@22/bin:$PATH" npm --prefix Backend run start
```

Frontend production build:

```sh
npm --prefix Frontend run build
```

Sanity production build:

```sh
PATH="/opt/homebrew/opt/node@22/bin:$PATH" npm --prefix Backend run build -- --yes
```

Vercel settings: use `Frontend` as the Root Directory, `npm run build` as the build command, and `build` as the output directory.
