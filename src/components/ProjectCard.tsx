import type { Project } from '../data/projects';

type ProjectCardProps = {
    project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
    const href = `${import.meta.env.BASE_URL}${project.href.replace(/^\//, '')}`;

    return (
        <a className="project-card" href={href}>
            <div className="project-card__glow" style={{ background: project.accent }} />
            <div className="project-card__meta">
                <span>{project.year}</span>
                <span>{project.status}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <ul className="project-card__stack" aria-label={`${project.title} technology stack`}>
                {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <span className="project-card__cta">Open project page</span>
        </a>
    );
}
