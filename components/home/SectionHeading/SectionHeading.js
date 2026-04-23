import styles from './SectionHeading.module.css';

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className={styles.heading}>
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
