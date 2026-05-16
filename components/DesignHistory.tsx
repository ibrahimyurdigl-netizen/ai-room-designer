'use client';

interface Design {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: number;
}

interface DesignHistoryProps {
  designs: Design[];
}

export default function DesignHistory({ designs }: DesignHistoryProps) {
  if (designs.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-2xl mb-4">📭</p>
        <h2 className="text-xl font-semibold mb-2">Henüz tasarım yok</h2>
        <p className="text-slate-400">
          İlk tasarımınızı oluşturmaya başlayın!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Tasarım Geçmişi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <div key={design.id} className="card group cursor-pointer hover:border-primary">
            <img
              src={design.imageUrl}
              alt={design.prompt}
              className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity"
            />
            <p className="text-sm text-slate-300 mb-3 line-clamp-2">
              {design.prompt}
            </p>
            <p className="text-xs text-slate-500">
              {new Date(design.timestamp).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href={design.imageUrl}
                download
                className="flex-1 px-3 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all text-center"
              >
                📥 İndir
              </a>
              <button
                onClick={() => {
                  const saved = localStorage.getItem('roomDesigns');
                  if (saved) {
                    const designs = JSON.parse(saved).filter(
                      (d: Design) => d.id !== design.id
                    );
                    localStorage.setItem(
                      'roomDesigns',
                      JSON.stringify(designs)
                    );
                    window.location.reload();
                  }
                }}
                className="px-3 py-2 bg-red-500 bg-opacity-20 text-red-300 rounded-lg text-sm font-semibold hover:bg-opacity-30 transition-all"
              >
                🗑️ Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
