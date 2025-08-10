import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '@/types/resume';

export const generateResumePDF = async (resumeData: ResumeData): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  let yPosition = margin;

  // Set fonts
  pdf.setFont('helvetica');

  // Header Section
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text(resumeData.personalDetails.name, margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(resumeData.personalDetails.jobTitle, margin, yPosition);
  yPosition += 15;

  // Contact Information
  pdf.setFontSize(10);
  const contactInfo = [
    `Email: ${resumeData.personalDetails.email}`,
    `Phone: ${resumeData.personalDetails.phone}`,
    `LinkedIn: ${resumeData.personalDetails.linkedin}`,
    `GitHub: ${resumeData.personalDetails.github}`
  ];

  contactInfo.forEach((info, index) => {
    if (index % 2 === 0) {
      pdf.text(info, margin, yPosition);
    } else {
      pdf.text(info, pageWidth / 2 + margin, yPosition);
      yPosition += 5;
    }
  });

  yPosition += 10;

  // Executive Summary
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('EXECUTIVE SUMMARY', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const summaryLines = pdf.splitTextToSize(resumeData.summary, pageWidth - 2 * margin);
  pdf.text(summaryLines, margin, yPosition);
  yPosition += summaryLines.length * 5 + 10;

  // Skills Section
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('SKILLS', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const skillsText = resumeData.skills.map(skill => `${skill.name} (${skill.level})`).join(' • ');
  const skillsLines = pdf.splitTextToSize(skillsText, pageWidth - 2 * margin);
  pdf.text(skillsLines, margin, yPosition);
  yPosition += skillsLines.length * 5 + 10;

  // Achievements Section
  if (resumeData.achievements.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ACHIEVEMENTS', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    resumeData.achievements.forEach((achievement) => {
      pdf.text(`• ${achievement.title}`, margin, yPosition);
      yPosition += 5;
      const descLines = pdf.splitTextToSize(achievement.description, pageWidth - 2 * margin - 10);
      pdf.text(descLines, margin + 5, yPosition);
      yPosition += descLines.length * 5 + 3;
    });
    yPosition += 5;
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
    const languagesLines = pdf.splitTextToSize(languagesText, pageWidth - 2 * margin);
    pdf.text(languagesLines, margin, yPosition);
    yPosition += languagesLines.length * 5 + 10;
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