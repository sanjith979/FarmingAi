'use client';

import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export const dynamic = 'force-dynamic';

interface SoilAnalysisData {
  qualityScore: number;
  deficiencies: string[];
  recommendations: string[];
  soilType: string;
  phStatus: string;
}

export default function SoilAnalysisCard() {
  const theme = useTheme();
  const { isReady, getToolOutput } = useWidgetSDK();

  const data = getToolOutput<SoilAnalysisData>();

  if (!isReady || !data) {
    return (
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
          color: theme === 'dark' ? '#fff' : '#000',
        }}
      >
        Loading soil analysis...
      </div>
    );
  }

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f9fafb';
  const textColor = isDark ? '#ffffff' : '#000000';
  const borderColor = isDark ? '#374151' : '#e5e7eb';
  const accentColor = '#10B981';

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#ef4444';
    return '#dc2626';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div
      style={{
        padding: '24px',
        background: bgColor,
        borderRadius: '12px',
        border: `1px solid ${borderColor}`,
        color: textColor,
        maxWidth: '500px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600' }}>
          🌱 Soil Analysis Report
        </h2>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
          Comprehensive soil quality assessment
        </p>
      </div>

      {/* Quality Score */}
      <div
        style={{
          background: isDark ? '#111827' : '#ffffff',
          border: `2px solid ${getScoreColor(data.qualityScore)}`,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>
          Soil Quality Score
        </div>
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: getScoreColor(data.qualityScore),
            marginBottom: '8px',
          }}
        >
          {data.qualityScore}
        </div>
        <div
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: getScoreColor(data.qualityScore),
          }}
        >
          {getScoreLabel(data.qualityScore)}
        </div>
      </div>

      {/* Soil Info */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            background: isDark ? '#111827' : '#ffffff',
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            padding: '12px',
          }}
        >
          <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '4px' }}>
            Soil Type
          </div>
          <div style={{ fontSize: '16px', fontWeight: '600' }}>
            {data.soilType.charAt(0).toUpperCase() + data.soilType.slice(1)}
          </div>
        </div>
        <div
          style={{
            background: isDark ? '#111827' : '#ffffff',
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            padding: '12px',
          }}
        >
          <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '4px' }}>
            pH Status
          </div>
          <div style={{ fontSize: '16px', fontWeight: '600' }}>
            {data.phStatus.charAt(0).toUpperCase() + data.phStatus.slice(1)}
          </div>
        </div>
      </div>

      {/* Deficiencies */}
      {data.deficiencies && data.deficiencies.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
            ⚠️ Deficiencies
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.deficiencies.map((deficiency, idx) => (
              <div
                key={idx}
                style={{
                  background: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '13px',
                }}
              >
                • {deficiency}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <div>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
            ✅ Recommendations
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.recommendations.map((rec, idx) => (
              <div
                key={idx}
                style={{
                  background: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '13px',
                }}
              >
                • {rec}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
