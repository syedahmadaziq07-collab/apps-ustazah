import React, { useState, useRef } from 'react';
import { Upload, Copy, Check, Image, Music, X } from 'lucide-react';
import { isStorageAvailable } from '../../services/storageService';
import { uploadFile, validateImageFile, validateAudioFile, formatFileSize } from '../../services/storageService';

type BucketName = 'student-photos' | 'app-images' | 'app-audio';

interface FileUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  bucket: BucketName;
  folder: string;
  accept?: string;
  type: 'image' | 'audio';
  helperText?: string;
  preview?: boolean;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label, value, onChange, bucket, folder, accept, type, helperText, preview = true,
}) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState<'success' | 'error' | ''>('');
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const showMsg = (text: string, kind: 'success' | 'error') => {
    setMessage(text);
    setMsgType(kind);
    setTimeout(() => { setMessage(''); setMsgType(''); }, 4000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'image') {
      const err = validateImageFile(file);
      if (err) { showMsg(err, 'error'); return; }
    } else {
      const err = validateAudioFile(file);
      if (err) { showMsg(err, 'error'); return; }
    }

    setUploading(true);
    setMessage('Memuat naik...');
    setMsgType('');

    const { publicUrl, error } = await uploadFile(bucket, folder, file);

    if (error) {
      showMsg(error, 'error');
    } else if (publicUrl) {
      onChange(publicUrl);
      showMsg('Muat naik berjaya', 'success');
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showMsg('Gagal menyalin URL', 'error');
    }
  };

  const storageAvail = isStorageAvailable();

  return (
    <div className="space-y-2">
      <label className="text-xs font-black text-slate-700 block mb-1">{label}</label>

      {/* URL Input */}
      <div className="flex items-center gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={type === 'image' ? 'URL gambar...' : 'URL audio...'}
          className="flex-1 px-3 py-2 rounded-xl border-2 border-purple-200 bg-purple-50/50 text-sm font-bold text-slate-800 focus:outline-none focus:border-purple-400 focus:bg-white transition-colors"
        />
        {value && (
          <button
            onClick={handleCopy}
            className="p-2.5 rounded-xl border-2 border-purple-200 text-purple-500 hover:bg-purple-50 active:scale-95 transition-all cursor-pointer shrink-0"
            title="Salin URL"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Upload Button */}
      <div className="flex items-center gap-2">
        <label
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            storageAvail && !uploading
              ? 'bg-purple-100 text-purple-700 border-2 border-purple-200 hover:bg-purple-200 active:scale-95'
              : 'bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          {uploading ? 'Memuat naik...' : storageAvail ? 'Muat Naik Fail' : 'Storage Tidak Disambungkan'}
          <input
            ref={inputRef}
            type="file"
            accept={accept || (type === 'image' ? '.jpg,.jpeg,.png,.webp' : '.mp3,.wav,.m4a,.ogg')}
            onChange={handleUpload}
            disabled={!storageAvail || uploading}
            className="hidden"
          />
        </label>
        {!storageAvail && (
          <span className="text-[9px] font-bold text-amber-600 italic">
            Supabase Storage belum disambungkan.
          </span>
        )}
      </div>

      {/* Message */}
      {message && (
        <p className={`text-[10px] font-black px-3 py-1.5 rounded-lg ${
          msgType === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
          msgType === 'error' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
          'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          {message}
        </p>
      )}

      {/* Preview */}
      {preview && value && type === 'image' && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="max-h-28 rounded-xl border-2 border-purple-200 object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      )}

      {preview && value && type === 'audio' && (
        <audio
          src={value}
          controls
          className="w-full h-8"
          onError={(e) => { (e.target as HTMLAudioElement).style.display = 'none'; }}
        >
          Audio tidak dapat dimainkan.
        </audio>
      )}

      {helperText && (
        <p className="text-[9px] font-bold text-slate-400">{helperText}</p>
      )}
    </div>
  );
};
