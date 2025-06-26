import React, { useState, useEffect, useRef } from 'react';
import { useAppsStore } from '@/stores/useAppsStore';

interface TerminalEntry {
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

const Terminal: React.FC = () => {
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [promptPrefix] = useState('user@local');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { closeApp } = useAppsStore();

  // Stub backend for testing
  const stubBackend = {
    async execute(command: string) {
      const [cmd, ...args] = command.trim().split(' ');
      
      switch (cmd.toLowerCase()) {
        case 'ls':
          return {
            stdout: 'Documents\nDownloads\nDesktop\nfile1.txt\nfile2.js\nREADME.md',
            stderr: '',
            exit_code: 0,
            pwd: currentDirectory
          };
        case 'pwd':
          return {
            stdout: currentDirectory,
            stderr: '',
            exit_code: 0,
            pwd: currentDirectory
          };
        case 'cd':
          const newDir = args[0] || '~';
          const updatedDir = newDir === '..' ? '/home/user' : newDir === '~' ? '~' : `${currentDirectory}/${newDir}`;
          return {
            stdout: '',
            stderr: '',
            exit_code: 0,
            pwd: updatedDir
          };
        case 'whoami':
          return {
            stdout: 'user',
            stderr: '',
            exit_code: 0,
            pwd: currentDirectory
          };
        case 'echo':
          return {
            stdout: args.join(' '),
            stderr: '',
            exit_code: 0,
            pwd: currentDirectory
          };
        case 'date':
          return {
            stdout: new Date().toString(),
            stderr: '',
            exit_code: 0,
            pwd: currentDirectory
          };
        case 'uname':
          return {
            stdout: 'Linux container 5.4.0 #1 SMP x86_64 GNU/Linux',
            stderr: '',
            exit_code: 0,
            pwd: currentDirectory
          };
        case 'clear':
          return {
            stdout: '__CLEAR__',
            stderr: '',
            exit_code: 0,
            pwd: currentDirectory
          };
        case 'help':
          return {
            stdout: 'Available commands:\n  ls - list files\n  pwd - current directory\n  cd - change directory\n  whoami - current user\n  echo - display text\n  date - show date\n  uname - system info\n  clear - clear terminal\n  exit - close terminal\n  help - show this help',
            stderr: '',
            exit_code: 0,
            pwd: currentDirectory
          };
        case 'exit':
          return {
            stdout: '__EXIT__',
            stderr: '',
            exit_code: 0,
            pwd: currentDirectory
          };
        default:
          return {
            stdout: '',
            stderr: `bash: ${cmd}: command not found`,
            exit_code: 127,
            pwd: currentDirectory
          };
      }
    }
  };

  useEffect(() => {
    // Auto-focus terminal input
    setTimeout(() => inputRef.current?.focus(), 100);
    
    // Add welcome message
    addToHistory('output', 'Container Terminal v1.0.0');
    addToHistory('output', 'Type "help" for available commands');
    addToHistory('output', 'Stub mode: try "ls", "pwd", "whoami", "echo hello", "date"');
    addToHistory('output', '');
  }, []);

  const addToHistory = (type: 'input' | 'output' | 'error', content: string) => {
    setTerminalHistory(prev => [...prev, {
      type,
      content,
      timestamp: new Date()
    }]);
    
    // Auto-scroll to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 10);
  };

  const executeCommand = async (command: string) => {
    // Add command to history
    addToHistory('input', `${promptPrefix}:${currentDirectory}$ ${command}`);
    
    try {
      const result = await stubBackend.execute(command);
      
      if (result.stdout === '__CLEAR__') {
        setTerminalHistory([]);
        return;
      }
      
      if (result.stdout === '__EXIT__') {
        addToHistory('output', 'Terminal session ended. Goodbye!');
        setTimeout(() => {
          closeApp('terminal');
        }, 1000);
        return;
      }
      
      if (result.stdout) {
        result.stdout.split('\n').forEach(line => {
          if (line.trim()) addToHistory('output', line);
        });
      }
      
      if (result.stderr) {
        result.stderr.split('\n').forEach(line => {
          if (line.trim()) addToHistory('error', line);
        });
      }
      
      // Update current directory if it changed
      if (result.pwd && result.pwd !== currentDirectory) {
        setCurrentDirectory(result.pwd);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addToHistory('error', `Failed to execute command: ${errorMessage}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentInput.trim()) {
        executeCommand(currentInput);
        setCurrentInput('');
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#1e1e1e',
      color: '#ffffff',
      fontFamily: 'Monaco, Menlo, "SF Mono", Consolas, monospace',
      fontSize: '13px',
      lineHeight: '1.4',
    }}>
      {/* Terminal Header */}
      <div style={{
        background: '#2d2d2d',
        padding: '8px 16px',
        borderBottom: '1px solid #404040',
        fontSize: '12px',
        fontWeight: '600',
      }}>
        Terminal
      </div>
      
      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        style={{
          flex: 1,
          padding: '16px',
          overflow: 'auto',
          cursor: 'text',
        }}
        onClick={handleTerminalClick}
      >
        {/* Terminal History */}
        {terminalHistory.map((entry, index) => (
          <div
            key={index}
            style={{
              margin: '2px 0',
              whiteSpace: 'pre-wrap',
              color: entry.type === 'error' ? '#ef4444' : 
                   entry.type === 'input' ? '#ffffff' : '#e5e5e5',
            }}
          >
            {entry.content}
          </div>
        ))}
        
        {/* Current Input Line */}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
          <span style={{ color: '#4ade80', marginRight: '8px' }}>
            {promptPrefix}:{currentDirectory}$
          </span>
          <input
            ref={inputRef}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              flex: 1,
              lineHeight: 'inherit',
            }}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;