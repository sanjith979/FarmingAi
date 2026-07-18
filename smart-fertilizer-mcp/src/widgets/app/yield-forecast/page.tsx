'use client';

import { useTheme, useWidgetSDK } from '@nitrostack/widgets';

export const dynamic = 'force-dynamic';

interface YieldForecastData {
  predictedYield: number;
  confidence: number;
  factors: {
    soilQuality: number;
    nutrientBalance: number;
    phOptimality: number;
  };
  recommendations: string[];
  cropName: string;
}

export default function YieldForecast() {
  const theme = useTheme();
  const { isReady, getToolOutput } = useWidgetSDK();

  const data = getToolOutput<YieldForecastData>();

  if (!isReady || !data) {
    return (
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
          color: theme === 'dark' ? '#fff' : '#000',
        }}
      >
        Loading yield forecast...
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

  const getFactorColor = (factor: number) => {
    if (factor >= 80) return '#10b981';
    if (factor >= 60) return '#f59e0b';
    if (factor >= 40) return '#ef4444';
    return '#dc2626';
  };

  return (
    <div
      style={{
        padding: '24px',
        background: bgColor,
        borderRadius: '12px',
        border: `1px solid ${borderColor}`,
        color: textColor,
        maxWidth: '600px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600' }}>
          📊 Yield Forecast
        </h2>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.7 }}>
          Predicted yield for {data.cropName}
        </p>
      </div>

      {/* Main Forecast Card */}
      <div
        style={{
          background: cardBg,
          border: `2px solid ${getConfidenceColor(data.confidence)}`,
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '12px' }}>
          Predicted Yield
        </div>
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: getConfidenceColor(data.confidence),
            marginBottom: '8px',
          }}
        >
          {data.predictedYield.toFixed(1)}
        </div>
        <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '16px' }}>
          units per hectare
        </div>
        <div
          style={{
            display: 'inline-block',
            background: getConfidenceColor(data.confidence),
            color: 'white',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '600',
          }}
        >
          {data.confidence >= 80
            ? '✓ High Confidence'
            : data.confidence >= 60
              ? '◐ Medium Confidence'
              : '✗ Low Confidence'}
          {' '}
          ({data.confidence}%)
        </div>
      </div>

      {/* Contributing Factors */}
      <div
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
        }}
      >
        <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600' }}>
          📈 Contributing Factors
        </h3>

        {/* Soil Quality */}
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '6px',
              fontSize: '13px',
            }}
          >
            <span>Soil Quality</span>
            <span
              style={{
                fontWeight: '600',
                color: getFactorColor(data.factors.soilQuality),
              }}
            >
              {data.factors.soilQuality}%
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              background: isDark ? '#374151' : '#e5e7eb',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${data.factors.soilQuality}%`,
                height: '100%',
                background: getFactorColor(data.factors.soilQuality),
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Nutrient Balance */}
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '6px',
              fontSize: '13px',
            }}
          >
            <span>Nutrient Balance</span>
            <span
              style={{
                fontWeight: '600',
                color: getFactorColor(data.factors.nutrientBalance),
              }}
            >
              {data.factors.nutrientBalance}%
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              background: isDark ? '#374151' : '#e5e7eb',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${data.factors.nutrientBalance}%`,
                height: '100%',
                background: getFactorColor(data.factors.nutrientBalance),
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* pH Optimality */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '6px',
              fontSize: '13px',
            }}
          >
            <span>pH Optimality</span>
            <span
              style={{
                fontWeight: '600',
                color: getFactorColor(data.factors.phOptimality),
              }}
            >
              {data.factors.phOptimality}%
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              background: isDark ? '#374151' : '#e5e7eb',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${data.factors.phOptimality}%`,
                height: '100%',
                background: getFactorColor(data.factors.phOptimality),
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <div>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
            💡 Recommendations
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.recommendations.map((rec, idx) => (
              <div
                key={idx}
                style={{
                  background: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  lineHeight: '1.4',
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
