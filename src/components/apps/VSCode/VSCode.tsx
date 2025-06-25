import React from 'react';

const VSCode: React.FC = () => {
  return (
    <div style={{
      height: '100%',
      background: '#1e1e1e',
      color: '#d4d4d4',
      fontFamily: 'Monaco, Menlo, monospace',
      fontSize: '14px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Tab Bar */}
      <div style={{
        background: '#2d2d30',
        borderBottom: '1px solid #3e3e42',
        padding: '0',
        display: 'flex',
      }}>
        <div style={{
          padding: '12px 16px',
          background: '#1e1e1e',
          borderRight: '1px solid #3e3e42',
          borderBottom: '2px solid #007acc',
          color: '#ffffff',
        }}>
          App.tsx
        </div>
        <div style={{
          padding: '12px 16px',
          color: '#cccccc',
          opacity: 0.7,
        }}>
          main.tsx
        </div>
      </div>

      {/* Editor */}
      <div style={{
        flex: 1,
        padding: '20px',
        lineHeight: '1.6',
      }}>
        <div style={{ color: '#569cd6' }}>import</div>
        <div style={{ marginLeft: '20px' }}>
          <span style={{ color: '#d4d4d4' }}>React </span>
          <span style={{ color: '#569cd6' }}>from</span>
          <span style={{ color: '#ce9178' }}> 'react'</span>
          <span style={{ color: '#d4d4d4' }}>;</span>
        </div>
        <br />
        <div style={{ color: '#569cd6' }}>const</div>
        <div style={{ marginLeft: '20px' }}>
          <span style={{ color: '#4fc1ff' }}>App</span>
          <span style={{ color: '#d4d4d4' }}>: </span>
          <span style={{ color: '#4ec9b0' }}>React.FC</span>
          <span style={{ color: '#d4d4d4' }}> = () =&gt; {`{`}</span>
        </div>
        <div style={{ marginLeft: '40px' }}>
          <span style={{ color: '#c586c0' }}>return</span>
          <span style={{ color: '#d4d4d4' }}> (</span>
        </div>
        <div style={{ marginLeft: '60px' }}>
          <span style={{ color: '#808080' }}>&lt;</span>
          <span style={{ color: '#4fc1ff' }}>div</span>
          <span style={{ color: '#808080' }}>&gt;</span>
        </div>
        <div style={{ marginLeft: '80px', color: '#ce9178' }}>
          "Hello, macOS!"
        </div>
        <div style={{ marginLeft: '60px' }}>
          <span style={{ color: '#808080' }}>&lt;/</span>
          <span style={{ color: '#4fc1ff' }}>div</span>
          <span style={{ color: '#808080' }}>&gt;</span>
        </div>
        <div style={{ marginLeft: '40px', color: '#d4d4d4' }}>);</div>
        <div style={{ marginLeft: '20px', color: '#d4d4d4' }}>{`}`};</div>
        <br />
        <div style={{ color: '#569cd6' }}>export default</div>
        <div style={{ marginLeft: '20px', color: '#4fc1ff' }}>App;</div>
        
        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: '#252526',
          borderRadius: '8px',
          border: '1px solid #3e3e42',
        }}>
          <p style={{ margin: 0, color: '#cccccc' }}>
            💻 VS Code editor functionality coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default VSCode;