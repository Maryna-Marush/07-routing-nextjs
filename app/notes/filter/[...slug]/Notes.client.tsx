'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { Note } from '@/types/note';
import css from './NotesClient.module.css';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { page: 1, search: '', tag }],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  });

  if (isLoading) {
    return <p>Loading notes...</p>;
  }

  if (isError) {
    return <p>Error loading notes.</p>;
  }

  if (!data || data.notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {data.notes.map((note: Note) => (
          <li key={note.id} className={css.item}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <span className={css.tag}>{note.tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}