export type Project = {
    slug: string;
    title: string;
    summary: string;
    year: string;
    status: string;
    stack: string[];
    accent: string;
    href: string;
    detail: {
        problem: string;
        work: string[];
        nextSteps: string[];
    };
};

export const featuredProjects: Project[] = [
    {
        slug: 'jpinky',
        title: 'jpinky',
        summary:
            'A small interpreted language implemented in Java, with a lexer, parser, AST model, and tree-walking interpreter. The current direction is a browser-hosted playground backed by the same core runtime.',
        year: '2026',
        status: 'Active',
        stack: ['Java', 'Gradle', 'Astro', 'React'],
        accent: 'linear-gradient(135deg, #b6542b 0%, #23677d 100%)',
        href: '/projects/jpinky',
        detail: {
            problem:
                'Build a compact language implementation that stays readable, testable, and ready for a browser-facing demo without discarding the current Java core.',
            work: [
                'Lexer and parser for a compact custom language syntax.',
                'AST model and interpreter for expressions, control flow, functions, and scoped state.',
                'Portfolio page architecture that can evolve into a live playground once the browser runner is wired in.',
            ],
            nextSteps: [
                'Extract a browser-safe runSource API from the CLI entrypoint.',
                'Compile the Java runtime for client-side execution with a browser-targeted toolchain.',
                'Embed an editor and output panel directly on the project page.',
            ],
        },
    },
];

export function findProject(slug: string) {
    return featuredProjects.find((project) => project.slug === slug);
}