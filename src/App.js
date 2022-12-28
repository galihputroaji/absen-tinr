import React, { useState, useEffect } from 'react';
import { getData } from './api/api';
import { MdContentCopy } from 'react-icons/md'
import { ImWhatsapp } from 'react-icons/im'

// List MK
const mataKuliah = [
  'Pancasila',
  'Pendidikan Agama Islam',
  'Algoritma dan Pemrograman',
  'Bahasa Inggris',
  'Pengantar Sistem Digital',
  'Fisika',
  'DITI',
  'Bahasa Indonesia',
  'Kalkulus'
];

function App() {
  const [data, setData] = useState(null); // State buat data mahasiswa
  const [pilihTanggal, setPilihTanggal] = useState('***Silahkan Atur Tanggal***'); // State buat pilih tanggal
  const [pilihJam, setPilihJam] = useState('***Silahkan Atur Jam***'); // State buat pilih jam
  const [mk, setMk] = useState('***Silahkan Pilih Mata Kuliah***'); // State buat pilih mata kuliah

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setData(data.map(item => ({ ...item, checked: false })));
    }
    fetchData();
  }, []);

  const handleCheck = index => {
    setData(
      data.map((item, i) => {
        if (i === index) {
          return { ...item, checked: !item.checked };
        }
        return item;
      })
    );
  };

  // Penampungan Data
  const semuaData = data ? data.filter(item => item.checked).map(item => item.nama + " - " + item.npm) : [];
  const semuaDataString = `Absensi Kelas TI Malam\nMata Kuliah: ${mk}\nTanggal: ${pilihTanggal}\nJam: ${pilihJam}\n\nMahasiswa Hadir:\n` +
    semuaData
      .map((item, index) => `${index + 1}. ${item}`)
      .join('\n');

  // Fungsi Copy
  const copyToClipboard = event => {
    event.preventDefault();
    const textarea = document.querySelector('textarea');
    textarea.select();
    document.execCommand('copy');
  };

  return (
    <div data-theme="night">
      <div className='navbar bg-neutral text-neutral-content mb-3'>
        <a href='#!' className='btn btn-ghost btn-sm rounded-btn'>Absensi TINR</a>
      </div>
      <div className='container flex xl:flex-row xl:gap-5 xl:mx-5 xl:items-start xl:justify-start lg:flex-col sm: flex-col md:flex-col justify-center items-center w-full'>
        <div className='top-section'>

          <form>
            <textarea value={semuaDataString} className='textarea textarea-bordered' style={{ overflow: 'auto', resize: 'both' }} cols="35" rows="10">
              {semuaDataString}
            </textarea>
            <br />
            <button className='btn btn-circle btn-warning my-2 normal-case text-lg' onClick={copyToClipboard}><MdContentCopy /></button>
            <ShareButton data={semuaDataString} />
            <br />
            <label className='label'>Pilih Mata Kuliah</label>
            <select className="select w-full max-w-xs select-bordered" value={mk} onChange={event => setMk(event.target.value)}>
              {mataKuliah.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <div className="form-control w-full max-w-xs">
              <label className='label'>
                Pilih Tanggal:
              </label>
              <input className="input input-bordered w-full max-w-xs" type="date" value={pilihTanggal} onChange={event => setPilihTanggal(event.target.value)} />
            </div>
            <br />
            <div className="form-control w-full max-w-xs">
              <label className='label'>
                Pilih Jam:
              </label>
              <input className="input input-bordered w-full max-w-xs" type="time" value={pilihJam} onChange={event => setPilihJam(event.target.value)} />
            </div>
          </form >
        </div>
        <br />
        <ul className='menu menu-compact bg-neutral rounded-box mx-5'>
          {data
            ? data.map((item, index) => (
              <li className='my-0' key={item.id} style={{ display: 'flex', textAlign: "baseline", cursor: 'pointer' }} onClick={() => handleCheck(index)}>
                <div><input type="checkbox" className="checkbox checkbox-sm" checked={item.checked} onChange={() => handleCheck(index)} style={{ marginRight: "10px" }} />
                  {item.npm} - {item.nama}</div>
              </li>
            ))
            : 'Harap Tunggu...'}
        </ul>
        <br />
      </div >
      <footer className="footer mt-5 footer-center items-center p-4 bg-neutral text-neutral-content">
        <div className="items-center grid-flow-col"><p>Galih © 2022 - Absensi TINR</p>
        </div>
      </footer>
    </div>
  );
}

// Komponen Tombol Share *dipisah lupa soalnya* 
const ShareButton = ({ data }) => {
  const shareToWhatsApp = event => {
    event.preventDefault();
    window.open(
      `https://wa.me/?text=${encodeURIComponent(data)}`,
      '_blank'
    );
  };

  return (
    <button class='btn btn-success btn-circle my-auto mx-2 normal-case text-lg' onClick={shareToWhatsApp}>
      <ImWhatsapp />
    </button>
  );
};

export default App;