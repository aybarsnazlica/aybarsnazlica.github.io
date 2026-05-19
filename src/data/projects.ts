export type Project = {
    slug: string;
    title: string;
    summary: string;
    year: string;
    status: string;
    stack: string[];
    accent: string;
    href: string;
    link?: string;
};

export const featuredProjects: Project[] = [
    {
        slug: 'jpinky',
        title: 'jpinky',
        summary:
            'A small interpreted language implemented in Java, with a lexer, parser, AST model, and tree-walking interpreter. This is a browser-hosted playground backed by the same core runtime.',
        year: '2026',
        status: 'Active',
        stack: ['Java', 'Gradle', 'Astro', 'React'],
        accent: 'linear-gradient(135deg, #b6542b 0%, #23677d 100%)',
        href: '/projects/jpinky',
        link: 'https://github.com/aybarsnazlica/jpinky',
    },
];

export function findProject(slug: string) {
    return featuredProjects.find((project) => project.slug === slug);
}