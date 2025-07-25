import { useEffect, useState } from 'react';
import { WebContainer } from '@webcontainer/api';

function App() {
  const [status, setStatus] = useState('Initializing...');
  const [instance, setInstance] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    let webcontainerInstance;

    async function init() {
      try {
        // Boot WebContainer
        webcontainerInstance = await WebContainer.boot();
        setInstance(webcontainerInstance);
        setStatus('WebContainer ready');

        // Listen for messages from parent (Lovable)
        window.addEventListener('message', async (event) => {
          // Accept messages from any origin during development
          const { action, files } = event.data;

          if (action === 'mountProject') {
            setStatus('Mounting project files...');
            
            // Mount all project files
            await webcontainerInstance.mount(files);
            
            // Install dependencies
            setStatus('Installing dependencies...');
            const installProcess = await webcontainerInstance.spawn('npm', ['install']);
            
            installProcess.output.pipeTo(new WritableStream({
              write(data) {
                console.log(data);
              }
            }));
            
            const installExitCode = await installProcess.exit;
            
            if (installExitCode !== 0) {
              setStatus('Failed to install dependencies');
              return;
            }
            
            // Start dev server
            setStatus('Starting development server...');
            const devProcess = await webcontainerInstance.spawn('npm', ['run', 'dev']);
            
            devProcess.output.pipeTo(new WritableStream({
              write(data) {
                console.log(data);
              }
            }));
            
            // Wait for server to be ready
            webcontainerInstance.on('server-ready', (port, url) => {
              setStatus('Server ready!');
              setPreviewUrl(url);
              
              // Send preview URL back to parent
              window.parent.postMessage({
                type: 'previewReady',
                url: url
              }, event.origin);
            });
          }
        });

        // Notify parent that WebContainer is ready
        window.parent.postMessage({ type: 'ready' }, '*');
      } catch (error) {
        setStatus(`Error: ${error.message}`);
        console.error('WebContainer initialization failed:', error);
      }
    }

    init();

    return () => {
      webcontainerInstance?.teardown();
    };
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'monospace',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3>External WebContainer Host</h3>
      <p>Status: {status}</p>
      
      {previewUrl && (
        <iframe
          src={previewUrl}
          style={{
            width: '100%',
            flex: 1,
            border: '1px solid #ccc',
            marginTop: '20px'
          }}
          title="Preview"
        />
      )}
    </div>
  );
}

export default App;
