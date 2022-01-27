import React, { useState, useEffect } from "react";

export default function SearchBar() {
    const [term, setTerm] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setTerm(e.target.value);
    }

    useEffect(() => {
        if (term) {
            // dispatch an action which filters content by {term}
        } else {
            return;
        }
    }, [term])

    return (
        <>
        <input type="text" className="searchbar" placeholder="Search posts" value={term ? term : ''} onChange={handleChange} />
        </>
    );
}