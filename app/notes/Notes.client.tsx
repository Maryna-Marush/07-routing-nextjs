'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './Notes.module.css';

export default function NotesClient() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes({ search: debouncedSearch, page }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (selectedItem: { selected: number }): void => {
    setPage(selectedItem.selected + 1);
  };

  const toggleModal = (): void => {
    setIsModalOpen((prev) => !prev);
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Something went wrong.</p>;

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.toolbar}>
          <SearchBox
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
          <button className={css.button} onClick={toggleModal} type="button">
            Create note
          </button>
        </div>

        <NoteList notes={notes} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            onPageChange={handlePageChange}
            forcePage={page - 1}
          />
        )}

        {isModalOpen && (
          <Modal onClose={toggleModal}>
            {}
            <NoteForm onClose={toggleModal} />
          </Modal>
        )}
      </div>
    </main>
  );
}
