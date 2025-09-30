import { useState } from 'react';
import { StudyProvider, useStudy } from './contexts/StudyContext';
import { Header } from './components/Header/Header';
import { SubjectTable } from './components/SubjectTable/SubjectTable';
import { Footer } from './components/Footer/Footer';
import { AddSubjectModal } from './components/Modals/AddSubjectModal';
import './styles/variables.css';
import './styles/globals.css';
import styles from './App.module.css';

function AppContent() {
  const { appState, addSubject } = useStudy();
  const [showAddSubject, setShowAddSubject] = useState(false);
  
  return (
    <div className={`${styles.app} app`}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          {appState.subjects.map(subject => (
            <SubjectTable key={subject.id} subject={subject} />
          ))}
          
          <button
            className={styles.addSubjectButton}
            onClick={() => setShowAddSubject(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Subject
          </button>
        </div>
      </main>
      <Footer />
      
      {showAddSubject && (
        <AddSubjectModal
          onAdd={addSubject}
          onClose={() => setShowAddSubject(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <StudyProvider>
      <AppContent />
    </StudyProvider>
  );
}

export default App;
