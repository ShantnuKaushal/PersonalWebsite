'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { projects } from '../../../content/projects';
import ScrollReveal from '../../ui/ScrollReveal/ScrollReveal';
import styles from './Projects.module.css';

function ProjectActions({ githubUrl, liveUrl, statusText }) {
  if (!githubUrl && !liveUrl && !statusText) {
    return null;
  }

  return (
    <div className={styles.projectActions}>
      {githubUrl ? (
        <a href={githubUrl} target="_blank" rel="noreferrer" className={styles.primaryAction}>
          <span>View GitHub</span>
        </a>
      ) : null}
      {liveUrl ? (
        <a href={liveUrl} target="_blank" rel="noreferrer" className={styles.secondaryAction}>
          Live preview
        </a>
      ) : null}
      {!githubUrl && !liveUrl && statusText ? (
        <span className={styles.staticAction}>{statusText}</span>
      ) : null}
    </div>
  );
}

function LocalVideoProjectFrame({ project, isPlaybackActive }) {
  const videoRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const updateAutoPlayPreference = () => {
      setShouldAutoPlay(mediaQuery.matches);
    };

    updateAutoPlayPreference();
    mediaQuery.addEventListener('change', updateAutoPlayPreference);

    return () => {
      mediaQuery.removeEventListener('change', updateAutoPlayPreference);
    };
  }, []);

  useEffect(() => {
    if (!hasMounted) {
      return undefined;
    }

    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    if (isPlaybackActive || shouldAutoPlay) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {});
      }
      return undefined;
    }

    video.pause();
    return undefined;
  }, [hasMounted, isPlaybackActive, shouldAutoPlay]);

  return (
    <div className={styles.mediaShell}>
      <div className={styles.mediaViewport} aria-label={`${project.title} demo reel`}>
        {hasMounted ? (
          <video
            ref={videoRef}
            className={styles.mediaVideo}
            src={project.videoSrc}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        ) : (
          <div className={styles.mediaVideoMountPlaceholder} aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

function SkillScanConceptArtwork() {
  return (
    <div className={styles.conceptScene}>
      <div className={styles.skillscanCanvas} aria-hidden="true">
        <span className={styles.skillscanTileRear} />
        <span className={styles.skillscanTileSide} />
        <span className={styles.skillscanTilePrimary} />
      </div>
    </div>
  );
}

function PneumoraConceptArtwork() {
  return <SkillScanConceptArtwork />;
}

function PlaceholderProjectFrame({ project, index }) {
  const frameClassName = styles[`placeholderStage${project.slug}`] ?? '';
  const isSkillScan = project.slug === 'skillscan';
  const isPneumora = project.slug === 'pneumora';

  return (
    <div className={styles.mediaShell}>
      <div className={styles.mediaViewport} role="img" aria-label={`${project.title} placeholder preview`}>
        <div className={`${styles.placeholderStage} ${frameClassName}`}>
          {isSkillScan ? <SkillScanConceptArtwork /> : null}
          {isPneumora ? <PneumoraConceptArtwork /> : null}
          {!isSkillScan && !isPneumora ? (
            <>
              <div className={styles.placeholderGrid} />
              <span className={styles.placeholderCrosshairHorizontal} />
              <span className={styles.placeholderCrosshairVertical} />

              <div className={styles.placeholderLayout}>
                <div className={styles.placeholderHero}>
                  <strong>{project.title}</strong>
                  <div className={styles.placeholderBars} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className={styles.placeholderPanels} aria-hidden="true">
                  {project.tags.slice(0, 3).map((tag) => (
                    <div key={tag} className={styles.placeholderPanel}>
                      <span>{tag}</span>
                      <em />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ProjectFrame({ project, index, isPlaybackActive }) {
  if (project.videoSrc) {
    return <LocalVideoProjectFrame project={project} isPlaybackActive={isPlaybackActive} />;
  }

  return <PlaceholderProjectFrame project={project} index={index} />;
}

export default function Projects() {
  const [activeProjectSlug, setActiveProjectSlug] = useState(null);

  return (
    <section className={styles.section} id="projects">
      <ScrollReveal as="div" variant="soft" distance={18}>
        <SectionHeading title="Projects" />
      </ScrollReveal>
      <ScrollReveal as="div" className={styles.sectionMeta} variant="rise" delay={50} distance={16}>
        <span className={styles.fileLabel}>portfolio.manifest</span>
      </ScrollReveal>

      <div className={styles.projectList}>
        {projects.map((project, index) => {
          const isMediaRight = index % 2 === 0;
          const rowClassName = `${styles.projectRow}${isMediaRight ? ` ${styles.projectRowReversed}` : ''}`;
          const mediaVariant = isMediaRight ? 'pop' : 'tilt';
          const copyVariant = isMediaRight ? 'driftLeft' : 'driftRight';
          const revealDelay = index * 70;

          return (
            <article
              key={project.slug}
              className={rowClassName}
              onMouseEnter={project.videoSrc ? () => setActiveProjectSlug(project.slug) : undefined}
              onMouseLeave={project.videoSrc ? () => setActiveProjectSlug(null) : undefined}
            >
              <ScrollReveal
                as="div"
                className={styles.mediaColumn}
                variant={mediaVariant}
                delay={revealDelay}
                distance={18}
              >
                <ProjectFrame
                  project={project}
                  index={index}
                  isPlaybackActive={activeProjectSlug === project.slug}
                />
              </ScrollReveal>

              <ScrollReveal
                as="div"
                className={styles.copyColumn}
                variant={copyVariant}
                delay={revealDelay + 90}
                distance={22}
              >
                <div className={styles.projectHeader}>
                  <h3>{project.title}</h3>
                  <div className={styles.tagList}>
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.projectBody}>
                  <p className={styles.projectSummary}>{project.summary}</p>
                </div>

                <ProjectActions
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                  statusText={project.statusText}
                />
              </ScrollReveal>
            </article>
          );
        })}
      </div>
    </section>
  );
}
