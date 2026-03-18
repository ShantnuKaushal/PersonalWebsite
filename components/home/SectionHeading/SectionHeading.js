import styles from './SectionHeading.module.css';

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className={styles.heading}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
