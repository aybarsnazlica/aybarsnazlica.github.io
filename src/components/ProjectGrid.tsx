import './project-grid.css';
import ProjectCard from './ProjectCard';
import type { Project } from '../data/projects';

type ProjectGridProps = {
    projects: Project[];
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
    return (
        <div className="project-grid">
            {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
            ))}
        </div>
    );
}
