import { Activity, BarChart2, Clock, Zap } from 'lucide-react';
import type { VisualizationData } from '../../data/scienceArticles';
import styles from './DataVisualizer.module.css';

interface Props {
  visualization: VisualizationData;
}

export default function DataVisualizer({ visualization }: Props) {
  const { type, title, caption, dataPoints } = visualization;

  const maxVal = Math.max(...dataPoints.map((d) => d.value), 1);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          {type === 'latency-breakdown' && <Zap size={18} color="#3b82f6" />}
          {type === 'circadian-clock' && <Clock size={18} color="#3b82f6" />}
          {(type === 'bar-comparison' || type === 'formula-box') && <BarChart2 size={18} color="#3b82f6" />}
          {type === 'timeline-decay' && <Activity size={18} color="#3b82f6" />}
          <span>{title}</span>
        </h4>
        <p className={styles.caption}>{caption}</p>
      </div>

      {/* ── Type 1: Bar Comparison & Formula Box ── */}
      {(type === 'bar-comparison' || type === 'formula-box') && (
        <div className={styles.barList}>
          {dataPoints.map((item, idx) => {
            const percentage = Math.min(100, Math.max(8, (item.value / maxVal) * 100));
            const barColor = item.color || '#3b82f6';
            return (
              <div key={idx} className={styles.barItem}>
                <div className={styles.barMeta}>
                  <span className={styles.barLabel}>{item.label}</span>
                  <span className={styles.barValue}>{item.displayValue}</span>
                </div>
                <div className={styles.barTrack}>
                  <div 
                    className={styles.barFill} 
                    style={{ width: `${percentage}%`, backgroundColor: barColor }} 
                  />
                </div>
                {item.note && <span className={styles.barNote}>{item.note}</span>}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Type 2: Latency Breakdown Timeline ── */}
      {type === 'latency-breakdown' && (
        <div className={styles.latencyTimeline}>
          {dataPoints.map((item, idx) => (
            <div key={idx} className={styles.latencyNode}>
              <div className={styles.latencyDot} style={{ backgroundColor: item.color || '#3b82f6' }} />
              <div className={styles.latencyNodeHeader}>
                <span className={styles.latencyNodeLabel}>{item.label}</span>
                <span className={styles.latencyNodeVal}>{item.displayValue}</span>
              </div>
              {item.note && <div className={styles.latencyNodeDesc}>{item.note}</div>}
            </div>
          ))}
        </div>
      )}

      {/* ── Type 3: Timeline Decay (Ebbinghaus) ── */}
      {type === 'timeline-decay' && (
        <div className={styles.timelineGrid}>
          {dataPoints.map((item, idx) => {
            const fillPct = Math.min(100, Math.max(4, item.value));
            const color = item.color || '#3b82f6';
            return (
              <div key={idx} className={styles.timelineCard}>
                <span className={styles.timelineLabel}>{item.label}</span>
                <span className={styles.timelineVal} style={{ color }}>{item.displayValue}</span>
                <div className={styles.timelineGauge}>
                  <div 
                    className={styles.timelineGaugeFill} 
                    style={{ width: `${fillPct}%`, backgroundColor: color }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Type 4: Circadian Clock ── */}
      {type === 'circadian-clock' && (
        <div className={styles.circadianList}>
          {dataPoints.map((item, idx) => (
            <div key={idx} className={styles.circadianItem}>
              <div className={styles.circadianTime}>
                <Clock size={15} color={item.color || '#3b82f6'} />
                <span>{item.label}</span>
              </div>
              <span 
                className={styles.circadianBadge} 
                style={{ 
                  backgroundColor: `${item.color || '#3b82f6'}18`, 
                  color: item.color || '#3b82f6' 
                }}
              >
                {item.displayValue}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
