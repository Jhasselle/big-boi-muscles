import React, { useState } from 'react';

const SessionContext = React.createContext([null, () => {}]);

const SessionProvider = (props) => {
  const [state, setState] = useState(null);
  return (
    <SessionContext.Provider value={[state, setState]}>
      {props.children}
    </SessionContext.Provider>
  );
}

export { SessionContext, SessionProvider };