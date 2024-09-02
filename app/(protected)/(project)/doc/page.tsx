'use server'

import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css'; // Import the GitHub markdown CSS
import MarkdownNavbar from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

export default async function MarkdownPage() {
  const filePath = path.join(process.cwd(),'/docList/example.md')
  console.log(filePath,'--------------------------------------------')
  const content = fs.readFileSync(filePath, 'utf-8');
  return (
    <div style={{ display: 'flex' }}>
    <div style={{ width: '20%', marginRight: '20px' }}>
      {/* <MarkdownNavbar
        className="markdown-navbar"
        // source={content}
        source={content}
      /> */}
    </div>
    <div className="markdown-body" style={{ width: '80%' }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  </div>
  );
}