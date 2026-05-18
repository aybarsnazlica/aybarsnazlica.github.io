// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const repository = process.env.GITHUB_REPOSITORY;
const repoName = repository?.split('/')[1];
const base = process.env.SITE_BASE ?? (repoName && repoName !== 'aybarsnazlica.github.io' ? `/${repoName}/` : '/');
const site = process.env.SITE_URL ?? 'https://aybarsnazlica.github.io';

// https://astro.build/config
export default defineConfig({
    site,
    base,
    integrations: [react()],
});
