import Spinner from './components/Spinner';

export default function Fallback() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center" style={{ background: 'transparent' }}>
      <Spinner size={56} />
    </div>
  );
}