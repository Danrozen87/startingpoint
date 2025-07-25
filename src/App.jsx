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

        // IMMEDIATELY notify parent that WebContainer is ready
        window.parent.postMessage({ type: 'ready' }, '*');

        // THEN set up message listener
        window.addEventListener('message', async (event) => {
          console.log('📨 Received message:', event.data);
          
          const { type, payload, id } = event.data;

          if (type === 'MOUNT_FILES') {
            const { files } = payload;
            setStatus('Mounting project files...');
            
            try {
              // Mount all project files
              await webcontainerInstance.mount(files);
              
              // Send success response
              window.parent.postMessage({
                type: 'MOUNT_FILES',
                id,
                success: true
              }, event.origin);
              
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
                
                // Send server URL back to parent
                window.parent.postMessage({
                  type: 'SERVER_URL',
                  payload: { url }
                }, event.origin);
              });
              
            } catch (error) {
              window.parent.postMessage({
                type: 'ERROR',
                id,
                payload: { error: error.message }
              }, event.origin);
            }
          }
        });

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
