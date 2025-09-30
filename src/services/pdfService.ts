import { jsPDF } from 'jspdf';
import type { AppState } from '../types';

export async function exportToPDF(appState: AppState, style: 'plain' | 'styled' = 'plain'): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Colors
  const titleColor = style === 'styled' ? [16, 185, 129] : [0, 0, 0];
  const textColor = style === 'styled' ? [100, 100, 100] : [0, 0, 0];
  const bgColor = style === 'styled' ? [245, 245, 245] : [255, 255, 255];

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper function to add text with word wrap
  const addText = (text: string, fontSize: number, isBold: boolean = false, color: number[] = textColor) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setTextColor(color[0], color[1], color[2]);
    
    const lines = doc.splitTextToSize(text, contentWidth);
    const lineHeight = fontSize * 0.5;
    
    checkNewPage(lines.length * lineHeight);
    
    lines.forEach((line: string) => {
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
  };

  // Title
  doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  addText('JEE Study Tracker - Progress Report', 20, true, titleColor);
  yPosition += 5;
  addText(`Generated: ${new Date().toLocaleString()}`, 10, false, textColor);
  yPosition += 10;

  // Overall Statistics
  const totalChapters = appState.subjects.reduce((sum, s) => sum + s.chapters.length, 0);
  const totalCheckballs = appState.subjects.reduce((sum, s) => 
    sum + s.chapters.length * s.columns.length, 0);
  const totalFilled = appState.subjects.reduce((sum, s) =>
    sum + s.chapters.reduce((cSum, c) =>
      cSum + c.checkballs.reduce((cbSum, cb) => cbSum + cb.level, 0), 0), 0);
  const overallPercentage = totalCheckballs > 0 ? (totalFilled / (totalCheckballs * 10)) * 100 : 0;

  addText('Overall Progress', 16, true, titleColor);
  yPosition += 2;
  addText(`Total Chapters: ${totalChapters}`, 11, false);
  addText(`Overall Completion: ${overallPercentage.toFixed(1)}%`, 11, false);
  yPosition += 8;

  // Subject-wise Progress
  for (const subject of appState.subjects) {
    checkNewPage(40);
    
    // Subject Header
    doc.setDrawColor(titleColor[0], titleColor[1], titleColor[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;
    
    addText(subject.name, 14, true, titleColor);
    yPosition += 2;
    
    const subjectTotalCheckballs = subject.chapters.length * subject.columns.length;
    const subjectTotalFilled = subject.chapters.reduce((sum, c) =>
      sum + c.checkballs.reduce((cbSum, cb) => cbSum + cb.level, 0), 0);
    const subjectPercentage = subjectTotalCheckballs > 0 
      ? (subjectTotalFilled / (subjectTotalCheckballs * 10)) * 100 
      : 0;
    
    addText(`Chapters: ${subject.chapters.length} | Completion: ${subjectPercentage.toFixed(1)}%`, 10, false);
    yPosition += 5;

    // Column Headers
    const colWidth = contentWidth / (subject.columns.length + 1);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    
    doc.text('Chapter', margin, yPosition);
    subject.columns.forEach((col, idx) => {
      const xPos = margin + colWidth + (idx * colWidth);
      doc.text(col.name.substring(0, 8), xPos, yPosition);
    });
    yPosition += 5;

    // Chapter Data
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    
    for (const chapter of subject.chapters) {
      checkNewPage(8);
      
      // Chapter name (truncate if too long)
      const chapterName = chapter.name.length > 35 
        ? chapter.name.substring(0, 32) + '...' 
        : chapter.name;
      doc.text(chapterName, margin, yPosition);
      
      // Checkball levels
      subject.columns.forEach((col, idx) => {
        const checkball = chapter.checkballs.find(cb => cb.columnId === col.id);
        const level = checkball ? checkball.level : 0;
        const xPos = margin + colWidth + (idx * colWidth);
        
        // Draw level indicator
        const percentage = (level / 10) * 100;
        doc.text(`${percentage.toFixed(0)}%`, xPos, yPosition);
      });
      
      yPosition += 6;
    }
    
    yPosition += 8;
  }

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }

  // Save
  const filename = `JEE_Study_Tracker_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}

export function exportToJSON(appState: AppState): void {
  const jsonString = JSON.stringify(appState, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `JEE_Study_Tracker_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}