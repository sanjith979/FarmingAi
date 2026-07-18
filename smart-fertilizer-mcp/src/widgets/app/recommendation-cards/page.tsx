'use client';

import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export const dynamic = 'force-dynamic';

interface FertilizerRecommendation {
  fertilizerId: string;
  name: string;
  imageUrl: string;
  npkRatio: string;
  price: number;
  confidence: number;
  reason: string;
  expectedYieldIncrease: number;
  applicationRate: number;
}

interface RecommendationData {
  recommendations: FertilizerRecommendation[];
  cropName: string;
  totalRecommendations: number;
}

export default function RecommendationCards() {
  const theme = useTheme();
  const { isReady, getToolOutput } = useWidgetSDK();

  const data = getToolOutput<RecommendationData>();

  if (!isReady || !data) {
    return (
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
          color: theme === 'dark' ? '#fff' : '#000',
        }}
      >
        Loading recommendations...
      </div>
    );
  }

  if (!data.recommendations || data.recommendations.length === 0) {
    return (
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
          color: theme === 'dark' ? '#fff' : '#000',
        }}
      >
        No fertilizer recommendations available for your budget.
      </div>
    );
  }

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1f2937' : '#f9fafb';
  const textColor = isDark ? '#ffffff' : '#000000';
  const borderColor = isDark ? '#374151' : '#e5e7eb';
  const cardBg = isDark ? '#111827' : '#ffffff';

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return '#10b981';
    if (confidence >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80) return 'High';
    if (confidence >= 60) return 'Medium';
    return 'Low';
  };

  return (
    <div
      style={{
        padding: '24px',
        background: bgColor,
        borderRadius: '12px',
        border: `1px solid ${borderColor}`,
        color: textColor,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600' }}>
          🌾 Fertilizer Recommendations
        </h2>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
          Top {data.recommendations.length} options for {data.cropName}
        </p>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {data.recommendations.map((rec, idx) => (
          <div
            key={rec.fertilizerId}
            style={{
              background: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {/* Rank Badge */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#10B981',
                color: 'white',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              #{idx + 1}
            </div>

            {/* Image */}
            <div
              style={{
                width: '100%',
                height: '160px',
                background: isDark ? '#1f2937' : '#e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {rec.imageUrl ? (
                <img
                  src={rec.imageUrl}
                  alt={rec.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div style={{ fontSize: '48px' }}>🌾</div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: '16px' }}>
              {/* Name */}
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                {rec.name}
              </h3>

              {/* NPK Ratio */}
              <div
                style={{
                  background: isDark ? '#1f2937' : '#f3f4f6',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  marginBottom: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                  textAlign: 'center',
                  fontFamily: 'monospace',
                }}
              >
                NPK: {rec.npkRatio}
              </div>

              {/* Reason */}
              <p
                style={{
                  margin: '0 0 12px 0',
                  fontSize: '13px',
                  opacity: 0.8,
                  lineHeight: '1.4',
                }}
              >
                {rec.reason}
              </p>

              {/* Stats Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    background: isDark ? '#1f2937' : '#f3f4f6',
                    borderRadius: '6px',
                    padding: '8px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '11px', opacity: 0.7 }}>Confidence</div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: getConfidenceColor(rec.confidence),
                    }}
                  >
                    {rec.confidence}%
                  </div>
                </div>
                <div
                  style={{
                    background: isDark ? '#1f2937' : '#f3f4f6',
                    borderRadius: '6px',
                    padding: '8px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '11px', opacity: 0.7 }}>Yield +</div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#10b981',
                    }}
                  >
                    {rec.expectedYieldIncrease}%
                  </div>
                </div>
              </div>

              {/* Price and Application */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  paddingTop: '12px',
                  borderTop: `1px solid ${borderColor}`,
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: '4px' }}>
                    Total Cost
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>
                    ${rec.price.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: '4px' }}>
                    Application
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>
                    {rec.applicationRate} bags
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
