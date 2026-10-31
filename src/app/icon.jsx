import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#ffffff',
          borderRadius: 8,
          display: 'flex',
          height: '32px',
          justifyContent: 'center',
          overflow: 'hidden',
          width: '32px',
        }}
      >
        <img src="/dineflow-logo.png" width="32" height="32" alt="Dineflow" style={{ objectFit: 'cover' }} />
      </div>
    ),
    size
  )
}
