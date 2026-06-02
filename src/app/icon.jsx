import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#f97316',
          borderRadius: 8,
          color: '#ffffff',
          display: 'flex',
          fontFamily: 'Arial Black, Arial, sans-serif',
          fontSize: 20,
          fontWeight: 900,
          height: '32px',
          justifyContent: 'center',
          lineHeight: 1,
          width: '32px',
        }}
      >
        D
      </div>
    ),
    size
  )
}
