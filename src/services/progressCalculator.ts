import type { Subject, ProgressStats } from '../types';

export function calculateProgressStats(subjects: Subject[]): ProgressStats {
  let totalCheckballs = 0;
  let totalCheckballLevels = 0;
  let totalChapters = 0;
  let completedChapters = 0;
  
  const subjectProgress = subjects.map(subject => {
    let subjectCheckballs = 0;
    let subjectCheckballLevels = 0;
    const subjectChapters = subject.chapters.length;
    let subjectCompleted = 0;
    
    subject.chapters.forEach(chapter => {
      const chapterCheckballs = chapter.checkballs.length;
      const chapterLevels = chapter.checkballs.reduce((sum, cb) => sum + cb.level, 0);
      
      subjectCheckballs += chapterCheckballs;
      subjectCheckballLevels += chapterLevels;
      
      // Chapter is complete if all checkballs are at level 10
      const isChapterComplete = chapter.checkballs.length > 0 && 
        chapter.checkballs.every(cb => cb.level === 10);
      
      if (isChapterComplete) {
        subjectCompleted++;
        completedChapters++;
      }
    });
    
    totalCheckballs += subjectCheckballs;
    totalCheckballLevels += subjectCheckballLevels;
    totalChapters += subjectChapters;
    
    const maxPossibleLevels = subjectCheckballs * 10;
    const subjectCompletionPercentage = maxPossibleLevels > 0
      ? (subjectCheckballLevels / maxPossibleLevels) * 100
      : 0;
    
    return {
      subjectId: subject.id,
      subjectName: subject.name,
      completedChapters: subjectCompleted,
      totalChapters: subjectChapters,
      completionPercentage: parseFloat(subjectCompletionPercentage.toFixed(1))
    };
  });
  
  const maxPossibleLevels = totalCheckballs * 10;
  const overallCompletionPercentage = maxPossibleLevels > 0
    ? (totalCheckballLevels / maxPossibleLevels) * 100
    : 0;
  
  return {
    totalChapters,
    completedChapters,
    overallCompletionPercentage: parseFloat(overallCompletionPercentage.toFixed(1)),
    subjectProgress
  };
}