import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import 'firebase/storage';

const Progress = ({ file, setFile }) => {
  const { url } = useStorage(file);
  console.log(url)

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return null;
      // <motion.div className="progress-bar"
    //   initial={{ width: 0 }}
    //   animate={{ width: progress + '%' }}
    // ></motion.div>
//   );
} 

export default Progress;