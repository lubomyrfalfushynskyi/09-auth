import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `All Notes | NoteHub`,
    description: `Browse all notes on NoteHub. Keep your ideas organized.`,
    openGraph: {
      title: `All Notes | NoteHub`,
      description: `Browse all notes on NoteHub. Keep your ideas organized.`,
      url: `https://notehub.vercel.app/notes/filter`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          alt: `NoteHub All Notes`,
        },
      ],
    },
  };
}

export default function FilterPage() {
  return (
    <div>
      <h1>Notes</h1>
      {/* Content will be handled by [...slug] route for dynamic filtering */}
    </div>
  );
}
