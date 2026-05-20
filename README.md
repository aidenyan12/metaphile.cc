Metaphile website structure

homepage-static/
- Static homepage source served from the domain root `/`
- Main files: `index.html`, `homepage.css`, `homepage.js`

gallery-app/
- Vite app source for the project gallery served from `/gallery/`
- Main source code: `gallery-app/apps/web/src/`
- Build command: `cd /home/aiden/apps/metaphile-website/gallery-app/apps/web && npm run build`
- Build output: `gallery-app/dist/gallery/`

site-root/
- Ready-to-serve website files for Nginx
- Homepage files live directly in `site-root/`
- Gallery files live in `site-root/gallery/`

uploads/
- Original zip files are still stored in `/home/aiden/uploads`

working folders kept for safety
- `/home/aiden/apps/merge-work`
- `/home/aiden/apps/metaphile-site`
