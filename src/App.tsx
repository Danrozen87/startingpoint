import { useEffect, useRef, useState } from 'react';
import { WebContainer } from '@webcontainer/api';

function App() {
  const [instance, setInstance] = useState(null);
  const [output, setOutput] = useState('');

  useEffect(() => {
    let webcontainerInstance;

    async function init() {
      webcontainerInstance = await WebContainer.boot();
      setInstance(webcontainerInstance);

      // Listen for messages from parent
      window.addEventListener('message', async (event) => {
        if (event.data.action === 'runCode') {
          await webcontainerInstance.mount({
            'index.js': {
              file: { contents: event.data.code }
            }
          });

          const process = await webcontainerInstance.spawn('node', ['index.js']);
          
          process.output.pipeTo(new WritableStream({
            write(data) {
              setOutput(prev => prev + data);
              window.parent.postMessage({
                type: 'output',
                data: data
              }, event.origin);
            }
          }));
        }
      });

      // Notify parent that WebContainer is ready
      window.parent.postMessage({ type: 'ready' }, '*');
    }

    init();

    return () => {
      webcontainerInstance?.teardown();
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h3>WebContainer Host</h3>
      <pre style={{ background: '#f0f0f0', padding: '10px' }}>
        {output || 'Waiting for code...'}
      </pre>
    </div>
  );
}

export default App;
