'use client';
import { useState, useRef } from 'react';

type AboutFormProps = {
  initialData: {
    name: string;
    gender: string;
    birthday: string;
    height: string;
    weight: string;
  };
  onSave: (formData: { name: string; gender: string; birthday: string; height: string; weight: string }, imageFile: File | null) => Promise<void>;
  onCancel: () => void;
};

const AddImageIcon = (props: React.ComponentProps<'svg'>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/><path d="M12 12h.01"/></svg>;
const FormRow = ({ label, children }: { label: string; children: React.ReactNode }) => <div className="flex items-center justify-between py-2"><label className="text-gray-400">{label}</label><div className="w-2/3">{children}</div></div>;

export const AboutForm = ({ initialData, onSave }: AboutFormProps) => {
  const [formData, setFormData] = useState(initialData);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveClick = async () => {
    await onSave(formData, imageFile);
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-4 py-2">
        <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center w-14 h-14 rounded-lg bg-white/10 cursor-pointer overflow-hidden">
          {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <AddImageIcon className="text-gray-400"/>}
        </button>
        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
        <span className="text-gray-300">Add image</span>
      </div>
      <FormRow label="Display name:"><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent text-right outline-none" placeholder="Enter name"/></FormRow>
      <FormRow label="Gender:"><select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-transparent text-right outline-none appearance-none"><option className="bg-gray-800" value="">Select Gender</option><option className="bg-gray-800" value="Male">Male</option><option className="bg-gray-800" value="Female">Female</option></select></FormRow>
      <FormRow label="Birthday:"><input type="date" name="birthday" value={formData.birthday} onChange={handleChange} className="w-full bg-transparent text-right outline-none [color-scheme:dark]"/></FormRow>
      <FormRow label="Height:"><input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full bg-transparent text-right outline-none" placeholder="Add height" /></FormRow>
      <FormRow label="Weight:"><input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full bg-transparent text-right outline-none" placeholder="Add weight" /></FormRow>
      
      <div className="flex justify-end pt-4">
        <button onClick={handleSaveClick} className="text-sm font-bold text-cyan-400">Save & Update</button>
      </div>
    </div>
  );
};