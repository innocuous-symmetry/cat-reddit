import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByActive, selectSearchResults } from '../posts/postsSlice';
import { selectActive, selectAllSubs } from "../reddit/redditSlice";

export default function SearchBar() {
    const dispatch = useDispatch();

    const selectedSubs = useSelector(selectAllSubs);
    console.log(selectedSubs);
    
    const activeSubs = useSelector(selectActive);
    console.log(activeSubs);
    
    const [term, setTerm] = useState('');
    const [toDispatch, setToDispatch] = useState(null);
    const [results, setResults] = useState(null);
    const searchData = useSelector(selectSearchResults);

    const handleChange = (e) => {
        e.preventDefault();
        setTerm(e.target.value);
    }

    const handleSubmit = () => {
        let examples = ['r/cats', 'r/cattaps'];
        let mapped = [];
        if (term) {
            mapped = examples.map((sub) => dispatch(searchByActive({
                sub, term
            })));
        }

        if (activeSubs) {
            console.log(activeSubs);
        }

        if (term) {
            Promise.all([...mapped]).then((results) => setResults(results));
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
    }, [results]);

    return (
        <>
        <input type="text" className="nav-searchbar" placeholder="Search posts" value={term ? term : ''} onChange={handleChange} />
        <input type="submit" onClick={handleSubmit}></input>
        </>
    );
}