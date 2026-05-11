'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Bold, Italic, Underline, ListOrdered, List, Link, Image, Code, AlignLeft, AlignCenter, AlignRight, Undo, Redo, Heading1, Heading2, Quote } from 'lucide-react';

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (editorRef.current) {
      const content = value || '';
      if (editorRef.current.innerHTML !== content) {
        editorRef.current.innerHTML = content;
        if (content.trim()) handleInput();
      }
    }
  }, [value]);

  const execCommand = (command, val = null) => {
    if (command === 'createLink' || command === 'insertImage') {
      const url = prompt(`Enter ${command === 'createLink' ? 'URL' : 'image URL'}:`, 'https://');
      if (url) document.execCommand(command, false, url);
    } else {
      document.execCommand(command, false, val);
    }
    handleInput();
  };

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      const text = editorRef.current.textContent || '';
      setWordCount(text.trim().split(/\s+/).filter(w => w.length > 0).length);
      onChange(content);
    }
  };

  const ToolbarBtn = ({ icon: Icon, cmd, val }) => (
    <button type="button" onClick={() => execCommand(cmd, val)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
      <Icon size={16} />
    </button>
  );

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-black/50 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-white/5">
        <ToolbarBtn icon={Undo} cmd="undo" />
        <ToolbarBtn icon={Redo} cmd="redo" />
        <div className="w-px h-5 bg-white/10 mx-1" />
        <ToolbarBtn icon={Heading1} cmd="formatBlock" val="h1" />
        <ToolbarBtn icon={Heading2} cmd="formatBlock" val="h2" />
        <div className="w-px h-5 bg-white/10 mx-1" />
        <ToolbarBtn icon={Bold} cmd="bold" />
        <ToolbarBtn icon={Italic} cmd="italic" />
        <ToolbarBtn icon={Underline} cmd="underline" />
        <div className="w-px h-5 bg-white/10 mx-1" />
        <ToolbarBtn icon={AlignLeft} cmd="justifyLeft" />
        <ToolbarBtn icon={AlignCenter} cmd="justifyCenter" />
        <ToolbarBtn icon={AlignRight} cmd="justifyRight" />
        <div className="w-px h-5 bg-white/10 mx-1" />
        <ToolbarBtn icon={ListOrdered} cmd="insertOrderedList" />
        <ToolbarBtn icon={List} cmd="insertUnorderedList" />
        <ToolbarBtn icon={Quote} cmd="formatBlock" val="blockquote" />
        <div className="w-px h-5 bg-white/10 mx-1" />
        <ToolbarBtn icon={Link} cmd="createLink" />
        <ToolbarBtn icon={Image} cmd="insertImage" />
        <ToolbarBtn icon={Code} cmd="formatBlock" val="pre" />
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[250px] max-h-[400px] overflow-y-auto p-4 text-white outline-none focus:ring-1 focus:ring-purple-500/50 prose prose-invert max-w-none"
      />
      <div className="px-4 py-2 bg-white/5 border-t border-white/10 text-xs text-gray-500 flex justify-between">
        <span>{wordCount} words</span>
        <button type="button" onClick={() => { if(editorRef.current) { editorRef.current.innerHTML=''; handleInput(); } }} className="text-red-400 hover:text-red-300">Clear</button>
      </div>
    </div>
  );
}
