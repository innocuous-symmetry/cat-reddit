import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByActive, selectSearchResults } from '../posts/postsSlice';
import { selectActive, selectAllSubs } from "../reddit/redditSlice";

export default function SearchBar() {
    const dispatch = useDispatch();

    const selectedSubs = useSelector(selectAllSubs);
    const activeSubs = useSelector(selectActive);
    
    const [term, setTerm] = useState('');
    const [results, setResults] = useState(null);
    const searchData = useSelector(selectSearchResults);

    const handleChange = (e) => {
        e.preventDefault();
        setTerm(e.target.value);
    }

    const handleSubmit = () => {
        if (term && activeSubs) {
            let extracted = [];
            for (let sub in activeSubs) {
                extracted.push(sub);
            }

            console.log(extracted);
            let mapped = extracted.map((sub) => dispatch(searchByActive({sub, term})));
            Promise.all([...mapped]).then((data) => setResults(data));
        }
    }


    useEffect(() => {
        let active = true;

        if (results && active) {
            console.log(results);
        }

        return () => {
            active = false;
        }
    }, [results, activeSubs]);

    return (
        <>
        <input type="text" className="nav-searchbar" placeholder="Search posts" value={term ? term : ''} onChange={handleChange} />
        <input type="submit" onClick={handleSubmit}></input>
        </>
    );
}