'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { projects } from '../../../content/projects';
import styles from './Projects.module.css';

const LOOP_HANDOFF_WINDOW_SECONDS = 0.58;
const LOOP_CROSSFADE_DURATION_MS = 520;

function formatProjectIndex(index) {
  return String(index + 1).padStart(2, '0');
}

function ProjectActions({ githubUrl, liveUrl }) {
  if (!githubUrl && !liveUrl) {
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
    </div>
  );
}

function LocalVideoProjectFrame({ project, isPlaybackActive }) {
  const primaryVideoRef = useRef(null);
  const secondaryVideoRef = useRef(null);
  const animationFrameRef = useRef(null);
  const crossfadeTimeoutRef = useRef(null);
  const durationRef = useRef(0);
  const activeIndexRef = useRef(0);
  const crossfadeStateRef = useRef(null);
  const isPlaybackActiveRef = useRef(isPlaybackActive);
  const [hasMounted, setHasMounted] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);

  const getVideoRefs = () => [primaryVideoRef, secondaryVideoRef];

  const cancelPlaybackMonitor = () => {
    if (!animationFrameRef.current) {
      return;
    }

    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
  };

  const clearCrossfadeTimeout = () => {
    if (!crossfadeTimeoutRef.current) {
      return;
    }

    clearTimeout(crossfadeTimeoutRef.current);
    crossfadeTimeoutRef.current = null;
  };

  const finalizeCrossfade = () => {
    const crossfadeState = crossfadeStateRef.current;

    if (!crossfadeState) {
      return;
    }

    const videoRefs = getVideoRefs();
    const fromVideo = videoRefs[crossfadeState.fromIndex].current;
    const toVideo = videoRefs[crossfadeState.toIndex].current;

    clearCrossfadeTimeout();

    if (fromVideo) {
      fromVideo.pause();
      fromVideo.currentTime = 0;
    }

    if (toVideo) {
      toVideo.muted = true;
    }

    activeIndexRef.current = crossfadeState.toIndex;
    crossfadeStateRef.current = null;
    setVisibleIndex(crossfadeState.toIndex);
  };

  const scheduleCrossfadeFinalize = (durationMs) => {
    clearCrossfadeTimeout();
    crossfadeTimeoutRef.current = setTimeout(() => {
      finalizeCrossfade();
    }, durationMs);
  };

  const startCrossfade = () => {
    if (crossfadeStateRef.current) {
      return;
    }

    const videoRefs = getVideoRefs();
    const fromIndex = activeIndexRef.current;
    const toIndex = fromIndex === 0 ? 1 : 0;
    const fromVideo = videoRefs[fromIndex].current;
    const toVideo = videoRefs[toIndex].current;

    if (!fromVideo || !toVideo) {
      return;
    }

    toVideo.pause();
    toVideo.currentTime = 0;
    toVideo.muted = true;

    const playPromise = toVideo.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }

    crossfadeStateRef.current = {
      fromIndex,
      toIndex,
      durationMs: LOOP_CROSSFADE_DURATION_MS,
      remainingMs: LOOP_CROSSFADE_DURATION_MS,
      startedAt: performance.now(),
    };

    setVisibleIndex(toIndex);
    scheduleCrossfadeFinalize(LOOP_CROSSFADE_DURATION_MS);
  };

  const monitorLoopBoundary = () => {
    cancelPlaybackMonitor();

    const tick = () => {
      if (!isPlaybackActiveRef.current) {
        animationFrameRef.current = null;
        return;
      }

      const activeVideo = getVideoRefs()[activeIndexRef.current].current;
      const duration = durationRef.current || activeVideo?.duration || 0;

      if (
        activeVideo &&
        duration > LOOP_HANDOFF_WINDOW_SECONDS &&
        !crossfadeStateRef.current &&
        duration - activeVideo.currentTime <= LOOP_HANDOFF_WINDOW_SECONDS
      ) {
        startCrossfade();
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);
  };

  const pauseAllVideos = () => {
    cancelPlaybackMonitor();

    const crossfadeState = crossfadeStateRef.current;
    if (crossfadeState && crossfadeState.startedAt !== null) {
      const elapsedMs = Math.max(0, performance.now() - crossfadeState.startedAt);
      crossfadeState.remainingMs = Math.max(0, crossfadeState.durationMs - elapsedMs);
      crossfadeState.startedAt = null;
      clearCrossfadeTimeout();
    }

    getVideoRefs().forEach((videoRef) => {
      videoRef.current?.pause();
    });
  };

  const resumeVideos = () => {
    const videoRefs = getVideoRefs();
    let crossfadeState = crossfadeStateRef.current;

    if (crossfadeState) {
      if (crossfadeState.remainingMs <= 40) {
        finalizeCrossfade();
        crossfadeState = crossfadeStateRef.current;
      }
    }

    if (crossfadeState) {
      const fromVideo = videoRefs[crossfadeState.fromIndex].current;
      const toVideo = videoRefs[crossfadeState.toIndex].current;

      if (fromVideo) {
        fromVideo.muted = true;
        const fromPlayPromise = fromVideo.play();
        if (fromPlayPromise?.catch) {
          fromPlayPromise.catch(() => {});
        }
      }

      if (toVideo) {
        toVideo.muted = true;
        const toPlayPromise = toVideo.play();
        if (toPlayPromise?.catch) {
          toPlayPromise.catch(() => {});
        }
      }

      crossfadeState.durationMs = Math.max(crossfadeState.remainingMs, 40);
      crossfadeState.startedAt = performance.now();
      scheduleCrossfadeFinalize(crossfadeState.durationMs);
      monitorLoopBoundary();
      return;
    }

    const activeVideo = videoRefs[activeIndexRef.current].current;
    if (!activeVideo) {
      return;
    }

    activeVideo.muted = true;
    const playPromise = activeVideo.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }

    monitorLoopBoundary();
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    isPlaybackActiveRef.current = isPlaybackActive;

    if (!hasMounted) {
      return undefined;
    }

    if (isPlaybackActive) {
      resumeVideos();
      return undefined;
    }

    pauseAllVideos();
    return undefined;
  }, [hasMounted, isPlaybackActive]);

  useEffect(() => {
    return () => {
      cancelPlaybackMonitor();
      clearCrossfadeTimeout();
    };
  }, []);

  return (
    <div className={styles.mediaShell}>
      <div className={styles.mediaViewport} aria-label={`${project.title} demo reel`}>
        {hasMounted ? (
          <>
            <video
              ref={primaryVideoRef}
              className={`${styles.mediaVideo} ${styles.mediaVideoLayer} ${
                visibleIndex === 0 ? styles.mediaVideoVisible : ''
              }`}
              src={project.videoSrc}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              onLoadedMetadata={(event) => {
                durationRef.current = event.currentTarget.duration || durationRef.current;
              }}
            />
            <video
              ref={secondaryVideoRef}
              className={`${styles.mediaVideo} ${styles.mediaVideoLayer} ${
                visibleIndex === 1 ? styles.mediaVideoVisible : ''
              }`}
              src={project.videoSrc}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              onLoadedMetadata={(event) => {
                durationRef.current = event.currentTarget.duration || durationRef.current;
              }}
            />
          </>
        ) : (
          <div className={styles.mediaVideoMountPlaceholder} aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

function PlaceholderProjectFrame({ project, index }) {
  const indexLabel = formatProjectIndex(index);
  const frameClassName = styles[`placeholderStage${project.slug}`] ?? '';

  return (
    <div className={styles.mediaShell}>
      <div className={styles.mediaViewport} role="img" aria-label={`${project.title} placeholder preview`}>
        <div className={`${styles.placeholderStage} ${frameClassName}`}>
          <div className={styles.placeholderGrid} />
          <span className={styles.placeholderCrosshairHorizontal} />
          <span className={styles.placeholderCrosshairVertical} />

          <div className={styles.placeholderHud}>
            <span>{`Fig. ${indexLabel} // Display`}</span>
            <span>Preview Mode</span>
          </div>

          <div className={styles.placeholderLayout}>
            <div className={styles.placeholderHero}>
              <span className={styles.placeholderSerial}>{`P${indexLabel}`}</span>
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

          <span className={styles.playButton} aria-hidden="true">
            <span className={styles.playGlyph} />
          </span>
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
      <SectionHeading title="Projects" />
      <div className={styles.sectionMeta}>
        <span className={styles.fileLabel}>portfolio.manifest</span>
      </div>

      <div className={styles.projectList}>
        {projects.map((project, index) => {
          const isMediaRight = index % 2 === 0;
          const rowClassName = `${styles.projectRow}${isMediaRight ? ` ${styles.projectRowReversed}` : ''}`;

          return (
            <article
              key={project.slug}
              className={rowClassName}
              onMouseEnter={project.videoSrc ? () => setActiveProjectSlug(project.slug) : undefined}
              onMouseLeave={project.videoSrc ? () => setActiveProjectSlug(null) : undefined}
            >
              <div className={styles.mediaColumn}>
                <ProjectFrame
                  project={project}
                  index={index}
                  isPlaybackActive={activeProjectSlug === project.slug}
                />
              </div>

              <div className={styles.copyColumn}>
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

                <ProjectActions githubUrl={project.githubUrl} liveUrl={project.liveUrl} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
