import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '@/types/resume';

export const generateResumePDF = async (resumeData: ResumeData): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);
  let yPosition = margin;

  // Set fonts
  pdf.setFont('helvetica');

  // Header Section with profile photo
  let headerStartX = margin;
  
  // Add profile photo if available
  if (resumeData.personalDetails.profilePhoto) {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = resumeData.personalDetails.profilePhoto;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        setTimeout(reject, 5000); // 5 second timeout
      });
      
      // Add circular photo (20mm x 20mm)
      pdf.addImage(img, 'JPEG', margin, yPosition, 20, 20);
      headerStartX = margin + 25;
    } catch (error) {
      console.warn('Could not add profile photo to PDF:', error);
    }
  }
  
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text(resumeData.personalDetails.name, headerStartX, yPosition + 8);
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(resumeData.personalDetails.jobTitle, headerStartX, yPosition + 18);
  yPosition += 30;

  // Contact Information
  pdf.setFontSize(10);
  const contactInfo = [
    `Email: ${resumeData.personalDetails.email}`,
    `Phone: ${resumeData.personalDetails.phone}`,
    `LinkedIn: ${resumeData.personalDetails.linkedin}`,
    `GitHub: ${resumeData.personalDetails.github}`
  ].filter(info => !info.includes('undefined') && !info.includes(': '));

  contactInfo.forEach((info, index) => {
    if (index % 2 === 0) {
      pdf.text(info, margin, yPosition);
    } else {
      pdf.text(info, pageWidth / 2 + margin, yPosition);
      yPosition += 5;
    }
  });

  // Add horizontal line separator
  yPosition += 5;
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Executive Summary
  if (resumeData.summary) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EXECUTIVE SUMMARY', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const summaryLines = pdf.splitTextToSize(resumeData.summary, contentWidth);
    pdf.text(summaryLines, margin, yPosition);
    yPosition += summaryLines.length * 5 + 5;
    
    // Add horizontal line separator
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
  }

  // Skills Section
  if (resumeData.skills.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TECHNICAL SKILLS', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const skillsText = resumeData.skills.map(skill => `${skill.name} (${skill.level})`).join(' • ');
    const skillsLines = pdf.splitTextToSize(skillsText, contentWidth);
    pdf.text(skillsLines, margin, yPosition);
    yPosition += skillsLines.length * 5 + 5;
    
    // Add horizontal line separator
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
  }

  // Achievements Section
  if (resumeData.achievements.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('KEY ACHIEVEMENTS', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    resumeData.achievements.forEach((achievement) => {
      pdf.setFont('helvetica', 'bold');
      pdf.text(`• ${achievement.title}`, margin, yPosition);
      yPosition += 5;
      
      pdf.setFont('helvetica', 'normal');
      const descLines = pdf.splitTextToSize(achievement.description, contentWidth - 10);
      pdf.text(descLines, margin + 5, yPosition);
      yPosition += descLines.length * 5 + 5;
    });
    
    // Add horizontal line separator
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
  }

  // Languages Section
  if (resumeData.languages.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('LANGUAGES', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const languagesText = resumeData.languages.map(lang => `${lang.name} (${lang.proficiency})`).join(' • ');
    const languagesLines = pdf.splitTextToSize(languagesText, contentWidth);
    pdf.text(languagesLines, margin, yPosition);
    yPosition += languagesLines.length * 5 + 5;
    
    // Add horizontal line separator
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
  }

  // Education Section
  if (resumeData.education.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EDUCATION', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    resumeData.education.forEach((edu) => {
      pdf.setFont('helvetica', 'bold');
      pdf.text(edu.degree, margin, yPosition);
      yPosition += 5;

      pdf.setFont('helvetica', 'normal');
      pdf.text(`${edu.institution} | ${edu.year}`, margin, yPosition);
      if (edu.gpa) {
        pdf.text(`GPA: ${edu.gpa}`, pageWidth - margin - 30, yPosition);
      }
      yPosition += 8;
    });
  }

  // Save the PDF
  pdf.save(`${resumeData.personalDetails.name}_Resume.pdf`);
};

export const generatePreviewPDF = async (elementId: string): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume preview element not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save('resume.pdf');
};