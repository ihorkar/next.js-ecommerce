import React from 'react';

export function InputText({ id, type, placeholder, onChange, icon }) {
    return <div className='input-field'>
        <input type={type} id={id} placeholder={placeholder} onChange={onChange} required />
        <div className='input-field-icon'><span className="material-symbols-outlined">{icon}</span></div>
    </div>
}

export function InputTextarea({ placeholder, icon, onChange, minHeight = '150px' }) {
    return <div className='input-field'>
        <textarea placeholder={placeholder} style={{ minHeight }} onChange={onChange}></textarea>
        <div className='input-field-icon'><span className="material-symbols-outlined">{icon}</span></div>
    </div>
}