import SectionHeading from '../SectionHeading/SectionHeading';
import { featuredProjects, projectArchive } from '../../../content/projects';
import styles from './Projects.module.css';

function ProjectLinks({ githubUrl, liveUrl }) {
  return (
    <div className={styles.projectActions}>
      {githubUrl ? (
        <a href={githubUrl} target="_blank" rel="noreferrer" className={styles.inlineLink}>
          GitHub
        </a>
      ) : (
        <span className={styles.inlineNote}>GitHub link pending</span>
      )}
      {liveUrl ? (
        <a href={liveUrl} target="_blank" rel="noreferrer" className={styles.inlineLink}>
          Live preview
        </a>
      ) : (
        <span className={styles.inlineNote}>Demo optional</span>
      )}
    </div>
  );
}

function ProjectMeta({ items, className }) {
  return (
    <dl className={className}>
      {items.map((item) => (
        <div key={item.label} className={styles.metaItem}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Projects() {
  return (
    <section className={styles.section} id="projects">
      <SectionHeading
        eyebrow="Repository index"
        title="Projects"
        description="Selected work framed like active repos and casefiles, so the section feels closer to how the projects are actually built and documented."
      />

      <div className={styles.featuredProjectList}>
        {featuredProjects.map((project) => {
          const metaItems = [
            { label: 'type', value: project.projectType },
            { label: 'stack', value: project.primaryStack },
            { label: 'role', value: project.role },
            { label: 'status', value: project.status },
          ];

          return (
            <article key={project.title} className={styles.featuredProject}>
              <div className={styles.projectVisual}>
                <div className={styles.visualFrame}>
                  <div className={styles.repoHeader}>
                    <span className={styles.repoLabel}>{project.repoLabel}</span>
                    <span className={styles.repoState}>{project.buildState}</span>
                  </div>
                  <div className={styles.repoBody}>
                    <div className={styles.repoIdentity}>
                      <span className={styles.repoSlash}>/</span>
                      <p>{project.title}</p>
                    </div>
                    <span className={styles.repoBranch}>branch: {project.branch}</span>
                    <div className={styles.repoTree} aria-label={`${project.title} file preview`}>
                      {project.previewFiles.map((file) => (
                        <span key={file}>{file}</span>
                      ))}
                    </div>
                    <div className={styles.snapshotList} aria-label={`${project.title} snapshot notes`}>
                      {project.snapshot.map((item) => (
                        <div key={item} className={styles.snapshotItem}>
                          <span />
                          <small>{item}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.projectCopy}>
                <div className={styles.projectHeader}>
                  <span className={styles.casefileLabel}>casefile</span>
                  <span className={styles.projectStatus}>{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <ProjectMeta items={metaItems} className={styles.metaRail} />
                <p className={styles.projectSummary}>{project.summary}</p>
                <p className={styles.projectDetail}>{project.detail}</p>
                <div className={styles.tagList}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.archiveGrid}>
        {projectArchive.map((project) => {
          const metaItems = [
            { label: 'type', value: project.projectType },
            { label: 'stack', value: project.primaryStack },
            { label: 'role', value: project.role },
          ];

          return (
            <article key={project.title} className={styles.archiveCard}>
              <div className={styles.archiveTopline}>
                <span className={styles.archiveRepo}>{project.repoLabel}</span>
                <span className={styles.archiveStatus}>{project.status}</span>
              </div>
              <h3>{project.title}</h3>
              <ProjectMeta items={metaItems} className={styles.archiveMeta} />
              <p>{project.summary}</p>
              <div className={styles.archiveFooter}>
                <span className={styles.archiveBuild}>{project.buildState}</span>
              </div>
              <div className={styles.tagList}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <ProjectLinks githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
